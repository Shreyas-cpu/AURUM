/**
 * AURUM Global Zustand Store
 * Manages real-time state across all three interfaces.
 * Socket events mutate this store; components subscribe reactively.
 * 
 * Backend: Node.js at localhost:3001
 * Falls back to MOCK_DATA if backend is unavailable.
 */
import { create } from 'zustand';
import { io } from 'socket.io-client';
import {
  MOCK_HOSPITALS,
  MOCK_AMBULANCES,
  MOCK_PATIENTS,
  MOCK_VITALS_HISTORY,
  MOCK_ROUTING_EVENTS,
} from '../data/mockData';

const API_BASE = 'http://localhost:3001/api';
const WS_BASE = 'http://localhost:3001';

export const useStore = create((set, get) => ({
  // ─── Connection State ────────────────────────────────────────────────
  isConnected: false,
  ws: null,

  // ─── Hospital State ───────────────────────────────────────────────────
  hospitals: MOCK_HOSPITALS,
  activeHospitalId: 'hosp-001', // KEM Hospital from mock data
  getActiveHospital: () => get().hospitals.find(h => h.id === get().activeHospitalId),

  fetchHospitals: async () => {
    try {
      const res = await fetch(`${API_BASE}/hospitals`);
      if (res.ok) {
        const data = await res.json();
        // Backend returns simplified hospitals — map to our schema if needed
        if (data.length > 0 && data[0].id && !data[0].total_icu_beds) {
          // Backend format — enrich with mock defaults for presentation
          console.log('[AURUM] Backend hospitals loaded, enriching with UI schema');
          const enriched = data.map(h => ({
            ...h,
            address: h.address || '',
            total_icu_beds: h.beds || 10,
            avail_icu_beds: Math.max(0, (h.beds || 10) - 2),
            total_gen_beds: (h.beds || 10) * 5,
            avail_gen_beds: (h.beds || 10) * 3,
            has_ventilator: (h.ventilators || 0) > 0,
            avail_ventilators: h.ventilators || 0,
            has_trauma_centre: (h.specialties || []).includes('neurosurgery'),
            has_cath_lab: (h.specialties || []).includes('cardiac'),
            has_neurosurgery: (h.specialties || []).includes('neurosurgery'),
            has_cardiac_surgery: (h.specialties || []).includes('cardiac'),
            has_burn_unit: false,
            has_paediatrics: false,
            current_load_pct: Math.round(30 + Math.random() * 50),
            is_active: true,
            last_updated_at: new Date().toISOString(),
            specialists_on_duty: [],
          }));
          set({ hospitals: enriched });
        } else {
          set({ hospitals: data });
        }
      }
    } catch (err) {
      console.log('[AURUM] Backend unavailable, using mock hospital data');
    }
  },

  updateHospitalResources: async (hospitalId, updates) => {
    // Optimistic UI update
    set(state => ({
      hospitals: state.hospitals.map(h =>
        h.id === hospitalId ? { ...h, ...updates, last_updated_at: new Date().toISOString() } : h
      ),
    }));
    // Sync to DB
    try {
      const activeHosp = get().hospitals.find(h => h.id === hospitalId);
      if(!activeHosp) return;
      const payload = {
        avail_icu_beds: updates.avail_icu_beds ?? activeHosp.avail_icu_beds,
        avail_gen_beds: updates.avail_gen_beds ?? activeHosp.avail_gen_beds,
        avail_ventilators: updates.avail_ventilators ?? activeHosp.avail_ventilators,
        current_load_pct: Math.round(((activeHosp.total_gen_beds - (updates.avail_gen_beds ?? activeHosp.avail_gen_beds)) / activeHosp.total_gen_beds) * 100) || activeHosp.current_load_pct
      };
      await fetch(`${API_BASE}/hospitals/${hospitalId}/resources`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (e) {
      console.error('Failed to sync resources to backend', e);
    }
  },

  updateSpecialist: (hospitalId, specialistId, updates) => set(state => ({
    hospitals: state.hospitals.map(h =>
      h.id === hospitalId
        ? { ...h, specialists_on_duty: (h.specialists_on_duty || []).map(s => s.id === specialistId ? { ...s, ...updates } : s) }
        : h
    ),
  })),

  // ─── Ambulance State ─────────────────────────────────────────────────
  ambulances: MOCK_AMBULANCES,
  activeAmbulanceId: 'amb-001',
  setActiveAmbulanceId: (id) => set({ activeAmbulanceId: id }),

  updateAmbulanceLocation: async (ambulanceId, lat, lng) => {
    set(state => ({
      ambulances: state.ambulances.map(a =>
        a.id === ambulanceId ? { ...a, current_lat: lat, current_lng: lng, last_location_update: new Date().toISOString() } : a
      ),
    }));
    // Sync to DB via HTTP
    try {
      if(get().isConnected) {
        // Emit via WS directly
        get().ws.emit('ambulance:location', { ambulance_id: ambulanceId, lat, lng });
      } else {
        // Fallback HTTP
        await fetch(`${API_BASE}/ambulances/${ambulanceId}/location`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lat, lng })
        });
      }
    } catch(e) {}
  },

  updateAmbulanceStatus: (ambulanceId, status) => set(state => ({
    ambulances: state.ambulances.map(a =>
      a.id === ambulanceId ? { ...a, status } : a
    ),
  })),

  // ─── Patient State ────────────────────────────────────────────────────
  patients: MOCK_PATIENTS,
  activePatientId: 'pat-001',
  vitalsHistory: MOCK_VITALS_HISTORY,

  getActivePatient: () => {
    const state = get();
    return state.patients.find(p => p.id === state.activePatientId);
  },

  pushVitals: (vitalsReading) => set(state => ({
    vitalsHistory: [...state.vitalsHistory.slice(-49), vitalsReading],
    patients: state.patients.map(p =>
      p.id === vitalsReading.patient_id
        ? { ...p,
            heart_rate:       vitalsReading.heart_rate,
            systolic_bp:      vitalsReading.systolic_bp,
            diastolic_bp:     vitalsReading.diastolic_bp,
            spo2:             vitalsReading.spo2,
            respiratory_rate: vitalsReading.respiratory_rate,
            temperature:      vitalsReading.temperature,
            gcs_score:        vitalsReading.gcs_score,
          }
        : p
    ),
  })),

  updatePatientRouting: (patientId, hospitalId, survivabilityScore) => set(state => ({
    patients: state.patients.map(p =>
      p.id === patientId ? { ...p, assigned_hospital_id: hospitalId, survivability_score: survivabilityScore } : p
    ),
  })),

  // ─── Routing Events ───────────────────────────────────────────────────
  routingEvents: MOCK_ROUTING_EVENTS,
  addRoutingEvent: (event) => set(state => ({
    routingEvents: [event, ...state.routingEvents],
  })),

  // ─── MCE State ────────────────────────────────────────────────────────
  mceActive: false,
  mceEventId: null,
  mcePatients: [],
  mceAssignments: [],

  triggerMCE: (eventId, patientIds, assignments) => set(state => {
    // Also update all patients matched in assignments to instantly reflect their new routes
    const updatedPatients = state.patients.map(p => {
      const match = (assignments || []).find(a => a.patient_id === p.id);
      if (match) {
        return {
          ...p,
          assigned_hospital_id: match.hospital_id,
          // Arbitrary survivability deduction based on transit
          survivability_score: p.survivability_score || Math.max(0.2, 0.95 - (match.transit_min || 0) * 0.01)
        };
      }
      return p;
    });

    return {
      mceActive: true,
      mceEventId: eventId,
      mcePatients: patientIds,
      mceAssignments: assignments || [],
      patients: updatedPatients
    };
  }),

  resolveMCE: () => set({
    mceActive: false,
    mceEventId: null,
    mcePatients: [],
    mceAssignments: [],
  }),

  // ─── UI State ────────────────────────────────────────────────────────
  notifications: [],
  addNotification: (notification) => set(state => ({
    notifications: [{ ...notification, id: Date.now(), ts: new Date().toISOString() }, ...state.notifications.slice(0, 19)],
  })),
  dismissNotification: (id) => set(state => ({
    notifications: state.notifications.filter(n => n.id !== id),
  })),

  // ─── Real-time Engine Integration ────────────────────────────────────
  isRunningApex: false,
  lastApexResult: null,

  initStore: () => {
    // Try to fetch from backend, but don't fail if unavailable
    get().fetchHospitals();

    // Setup Socket.IO
    if (!get().ws) {
      try {
        const socket = io(WS_BASE);
        socket.on('connect', () => {
          console.log('[AURUM] 🟢 Socket.io connected');
          set({ isConnected: true, ws: socket });
        });
        socket.on('disconnect', () => {
          console.log('[AURUM] 🔴 Socket.io disconnected');
          set({ isConnected: false, ws: null });
        });
        socket.on('hospital:status_update', (hospital) => {
          console.log('[AURUM] 🚨 Hospital Sync Received:', hospital);
          set(state => ({
            hospitals: state.hospitals.map(h => 
              h.id === hospital.id ? { ...h, ...hospital } : h
            )
          }));
        });
        socket.on('vitals:update', (data) => {
          console.log('[AURUM] ❤️ Vitals Stream:', data);
          get().pushVitals(data.vitals);
        });
        socket.on('ambulance:location_broadcast', (data) => {
          console.log('[AURUM] 🚑 Ambulance Location Update:', data);
          get().updateAmbulanceLocation(data.ambulance_id, data.lat, data.lng);
        });
        socket.on('routing:decision', (data) => {
          console.log('[AURUM] 🧠 APEX/NEXUS Routing Decision:', data);
          get().addRoutingEvent(data);
          get().updatePatientRouting(data.patient_id, data.routed_to_hospital_id, data.survivability_score);
          get().addNotification({
            type: 'alert',
            title: 'Incoming Dispatch',
            message: `Patient ${data.patient_code || data.patient_id} routed to ${data.hospital_name || data.routed_to_hospital_id}.`,
          });
        });
        socket.on('mce:triggered', (data) => {
          console.log('[AURUM] ⚡ MCE Batch Routed:', data);
          get().triggerMCE(data.event_id, data.patient_ids, data.assignments);
        });
      } catch (err) {
        console.log('[AURUM] Socket connection failed, offline mode');
      }
    }
  },

  runApexPrediction: async (vitals) => {
    set({ isRunningApex: true });
    try {
      // Try real backend first
      const res = await fetch(`${API_BASE}/dispatch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vitals: {
            heart_rate: vitals.heart_rate,
            systolic_bp: vitals.systolic_bp,
            respiratory_rate: vitals.respiratory_rate,
            gcs: vitals.gcs_score,
            symptoms: vitals.chief_complaint || "Emergency"
          },
          lat: 19.0120, // Mumbai lat
          lng: 72.8360  // Mumbai lng
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.status === 'success') {
          set({
            isRunningApex: false,
            lastApexResult: {
              predicted_severity: data.prediction.severity === 'High' ? 4 : data.prediction.severity === 'Moderate' ? 3 : 2,
              predicted_care_needs: {
                icu: data.prediction.needs_ventilator || data.prediction.needs_neurosurgery,
                ventilator: data.prediction.needs_ventilator,
                specialist: data.prediction.needs_neurosurgery ? 'neurosurgeon' : 'trauma_surgeon',
                cath_lab: false,
              },
              survivability_score: (data.prediction.srs_score || 85) / 100,
              target_hospital: data.routed_to,
              hospital_id: data.hospital_id,
              shap_explanation: {
                gcs_score:           0.30,
                systolic_bp:         0.24,
                spo2:                0.18,
                heart_rate:          0.12,
                age:                 0.08,
                mechanism_of_injury: 0.05,
                respiratory_rate:    0.03,
              },
            },
          });
          return;
        }
      }
      throw new Error('Backend unavailable');
    } catch (err) {
      console.log('[AURUM] Backend APEX unavailable, running local simulation');
      // Fallback: local simulation
      setTimeout(() => {
        const srs = Math.min(0.99, Math.max(0.1,
          0.95
          - (vitals.gcs_score < 12 ? 0.2 : 0)
          - (vitals.systolic_bp < 90 ? 0.15 : 0)
          - (vitals.spo2 < 95 ? 0.1 : 0)
        ));
        set({
          isRunningApex: false,
          lastApexResult: {
            predicted_severity: vitals.gcs_score < 9 ? 5 : vitals.gcs_score < 12 ? 4 : vitals.systolic_bp < 90 ? 3 : 2,
            predicted_care_needs: {
              icu:        vitals.gcs_score < 12 || vitals.systolic_bp < 90,
              ventilator: vitals.spo2 < 92 || vitals.gcs_score < 9,
              specialist: vitals.gcs_score < 9 ? 'neurosurgeon' : 'trauma_surgeon',
              cath_lab:   false,
            },
            survivability_score: parseFloat(srs.toFixed(2)),
            shap_explanation: {
              gcs_score:           0.30,
              systolic_bp:         0.24,
              spo2:                0.18,
              heart_rate:          0.12,
              age:                 0.08,
              mechanism_of_injury: 0.05,
              respiratory_rate:    0.03,
            },
          },
        });
      }, 850);
    }
  },
}));
