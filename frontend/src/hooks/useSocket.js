/**
 * useSocket — Simulates Socket.io events for demo without a live backend.
 * Event names match the AURUM API spec exactly:
 *   vitals:update | routing:decision | hospital:status_update
 *   ambulance:location_broadcast | mce:triggered | routing:reroute
 *
 * Swap the setInterval blocks for real socket.on() listeners
 * once the Node.js backend is running.
 *
 * Real usage: import { io } from 'socket.io-client';
 *             const socket = io('http://localhost:3001', { auth: { token } });
 */
import { useEffect, useRef } from 'react';
import { useStore } from './useStore';
import { MOCK_PATIENTS } from '../data/mockData';

// Simulated vitals drift — keeps monitor display "live"
function driftVital(base, range) {
  const delta = (Math.random() - 0.5) * range;
  return parseFloat((base + delta).toFixed(1));
}

export function useVitalsStream(patientId, intervalMs = 3000) {
  const store = useStore;

  useEffect(() => {
    if (!patientId) return;
    
    // Use the latest state without adding patients to the dependency array
    const patient = store.getState().patients.find(p => p.id === patientId);
    if (!patient) return;

    const id = setInterval(async () => {
      const reading = {
        patient_id:      patientId,
        source:          'monitor',
        heart_rate:      Math.round(driftVital(patient.heart_rate,      8)),    
        systolic_bp:     Math.round(driftVital(patient.systolic_bp,     6)),    
        diastolic_bp:    Math.round(driftVital(patient.diastolic_bp,    5)),    
        spo2:            parseFloat(driftVital(patient.spo2,            1.2).toFixed(1)),
        respiratory_rate:Math.round(driftVital(patient.respiratory_rate, 4)),   
        temperature:     parseFloat(driftVital(patient.temperature,     0.3).toFixed(1)),
        gcs_score:       patient.gcs_score,
      };

      try {
        if(store.getState().isConnected) {
          // Push via REST - the backend will broadcast via socket
          await fetch(`http://localhost:3001/api/patients/${patientId}/vitals`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reading)
          });
        } else {
          // Fallback to local store mutation
          store.getState().pushVitals({...reading, id: `vs-${Date.now()}`, recorded_at: new Date().toISOString()});
        }
      } catch (e) {
        console.error('[AURUM] Error streaming vitals to backend:', e);
      }
    }, intervalMs);

    return () => clearInterval(id);
}

export function useHospitalStatusUpdates(hospitalId, intervalMs = 8000) {
  const updateHospitalResources = useStore(s => s.updateHospitalResources);
  const hospitals                = useStore(s => s.hospitals);

  useEffect(() => {
    if (!hospitalId) return;

    const id = setInterval(() => {
      const hosp = hospitals.find(h => h.id === hospitalId);
      if (!hosp) return;
      // Simulate: hospital:status_update
      const drift = Math.round((Math.random() - 0.5) * 2);
      updateHospitalResources(hospitalId, {
        current_load_pct: Math.max(10, Math.min(99, hosp.current_load_pct + drift)),
      });
    }, intervalMs);

    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hospitalId]);
}

export function useAmbulanceLocationBroadcast(ambulanceId, intervalMs = 5000) {
  const updateAmbulanceLocation = useStore(s => s.updateAmbulanceLocation);     
  const ambulances               = useStore(s => s.ambulances);

  useEffect(() => {
    if (!ambulanceId) return;
    const id = setInterval(() => {
      const amb = useStore.getState().ambulances.find(a => a.id === ambulanceId);
      if (amb && (amb.status === 'en_route_to_hospital' || amb.status === 'on_scene')) {
        updateAmbulanceLocation(
          amb.id,
          amb.current_lat  + (Math.random() - 0.5) * 0.001,
          amb.current_lng  + (Math.random() - 0.5) * 0.001,
        );
      }
    }, intervalMs);
    return () => clearInterval(id);
  }, [ambulanceId]);
}

// Socket event name constants — match Node.js server exactly
export const SOCKET_EVENTS = {
  VITALS_UPDATE:              'vitals:update',
  ROUTING_DECISION:           'routing:decision',
  HOSPITAL_STATUS_UPDATE:     'hospital:status_update',
  AMBULANCE_LOCATION:         'ambulance:location',
  AMBULANCE_LOCATION_BROADCAST:'ambulance:location_broadcast',
  MCE_TRIGGERED:              'mce:triggered',
  ROUTING_REROUTE:            'routing:reroute',
};

// API endpoints — match Node.js REST API exactly
export const API = {
  HOSPITALS:                (id) => id ? `/hospitals/${id}` : '/hospitals',
  HOSPITAL_RESOURCES:       (id) => `/hospitals/${id}/resources`,
  HOSPITAL_SPECIALISTS:     (id) => `/hospitals/${id}/specialists`,
  HOSPITAL_INCOMING:        (id) => `/hospitals/${id}/incoming`,
  PATIENTS:                 (id) => id ? `/patients/${id}` : '/patients',
  PATIENT_VITALS:           (id) => `/patients/${id}/vitals`,
  PATIENT_VITALS_HISTORY:   (id) => `/patients/${id}/vitals/history`,
  PATIENT_ROUTE:            (id) => `/patients/${id}/route`,
  AMBULANCES:               (id) => id ? `/ambulances/${id}` : '/ambulances',
  AMBULANCE_LOCATION:       (id) => `/ambulances/${id}/location`,
  AMBULANCE_STATUS:         (id) => `/ambulances/${id}/status`,
  ROUTE_SINGLE:             '/route/single',
  ROUTE_MCE_BATCH:          '/route/mce-batch',
  ROUTE_EVENTS:             '/route/events',
};
