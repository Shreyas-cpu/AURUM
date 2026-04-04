import React, { useState, useEffect } from 'react';
import {
  CheckCircle, Navigation, AlertTriangle, ChevronRight,
  MapPin, Clock, Heart, Wind, Thermometer, Activity
} from 'lucide-react';
import { useStore } from '../../hooks/useStore';
import { MOCK_HOSPITALS, MOCK_ROUTING_EVENTS, SEVERITY_MAP } from '../../data/mockData';
import SurvivabilityScore from '../../components/shared/SurvivabilityScore';
import SeverityBadge from '../../components/shared/SeverityBadge';
import ShapPanel from '../../components/shared/ShapPanel';
import MapEmbed from '../../components/shared/MapEmbed';

// ─── ETA Countdown Timer ─────────────────────────────────────────────────────
function ETATimer({ initialMin }) {
  const [sec, setSec] = useState(initialMin * 60);
  useEffect(() => {
    const id = setInterval(() => setSec(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, []);
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return (
    <div className="font-mono font-black tabular-nums" style={{ fontSize: 48, color: sec < 180 ? '#e84545' : '#10b981', letterSpacing: '-2px', lineHeight: 1 }}>
      {m}:{s.toString().padStart(2, '0')}
    </div>
  );
}

// ─── STANDBY SCREEN ──────────────────────────────────────────────────────────
function StandbyScreen({ onPickup }) {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center gap-8 px-8"
      style={{ background: '#060a0e' }}>
      {/* Status indicator */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-32 h-32 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(16,185,129,0.1)', border: '3px solid rgba(16,185,129,0.4)' }}>
            <span className="text-5xl font-black" style={{ color: '#10b981' }}>✓</span>
          </div>
          <span className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: '#10b981' }} />
        </div>
        <div className="text-center">
          <div className="text-4xl font-black uppercase tracking-widest" style={{ color: '#10b981', letterSpacing: '0.1em' }}>READY</div>
          <div className="text-sm font-semibold mt-1" style={{ color: '#4a5a6a' }}>Awaiting Dispatch</div>
        </div>
      </div>

      {/* Clock */}
      <div className="font-mono font-black text-4xl tabular-nums" style={{ color: '#e8ecef', letterSpacing: '-0.02em' }}>
        {time.toLocaleTimeString()}
      </div>

      {/* Info tiles */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
        {[
          { label: 'Unit', value: 'AMB-001', color: '#e84545' },
          { label: 'Driver', value: 'Rakesh Patil', color: '#e8ecef' },
          { label: 'Fuel', value: '92%', color: '#10b981' },
          { label: 'Grid', value: 'CONNECTED', color: '#10b981' },
        ].map(({ label, value, color }) => (
          <div key={label} className="rounded-xl p-3 text-center"
            style={{ background: '#0d1117', border: '1px solid #1e2d3d' }}>
            <div className="text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: '#4a5a6a' }}>{label}</div>
            <div className="text-sm font-bold" style={{ color }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Pick up patient */}
      <button onClick={onPickup}
        className="w-full max-w-sm py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all"
        style={{ background: 'rgba(232,69,69,0.2)', color: '#e84545', border: '2px solid rgba(232,69,69,0.5)', letterSpacing: '-0.02em' }}>
        <span style={{ fontSize: 24 }}>🚑</span>
        PICK UP PATIENT
      </button>
    </div>
  );
}

// ─── HANDOVER SCREEN ──────────────────────────────────────────────────────────
function HandoverScreen({ hospital, onConfirm }) {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div className="h-full flex flex-col items-center justify-center gap-8 px-8"
      style={{ background: '#060a0e' }}>
      <div className="text-center space-y-2">
        <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#4a5a6a' }}>Arrived At</div>
        <div className="text-3xl font-black" style={{ color: '#e8ecef', letterSpacing: '-0.02em' }}>{hospital?.name}</div>
        <div className="text-xs" style={{ color: '#7a8a9a' }}>{hospital?.address}</div>
      </div>

      {!confirmed ? (
        <>
          <div className="text-center p-6 rounded-2xl" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)' }}>
            <div className="text-5xl mb-3">🏥</div>
            <div className="text-sm font-semibold" style={{ color: '#10b981' }}>Ready for patient handover</div>
            <div className="text-[10px] mt-1" style={{ color: '#4a5a6a' }}>ERC team has been notified</div>
          </div>

          <button onClick={() => { setConfirmed(true); onConfirm?.(); }}
            className="w-full max-w-sm py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3"
            style={{ background: 'rgba(16,185,129,0.2)', color: '#10b981', border: '2px solid rgba(16,185,129,0.5)' }}>
            <CheckCircle size={28} />
            CONFIRM HANDOVER
          </button>
        </>
      ) : (
        <div className="text-center space-y-3">
          <CheckCircle size={64} style={{ color: '#10b981', margin: '0 auto' }} />
          <div className="text-xl font-black" style={{ color: '#10b981' }}>Handover Complete</div>
          <div className="text-xs" style={{ color: '#4a5a6a' }}>Patient session resolved. Returning to standby.</div>
        </div>
      )}
    </div>
  );
}

// ─── NAVIGATION SCREEN (Main en-route view) ──────────────────────────────────
function NavigationScreen({ patient, hospital, routing, onArrive }) {
  const [accepted, setAccepted] = useState(false);
  const [showShap, setShowShap] = useState(false);
  const [rerouteAlert, setRerouteAlert] = useState(false);
  const hospitals = useStore(s => s.hospitals);

  const srs = patient?.survivability_score || 0.71;
  const srsColor = srs >= 0.75 ? '#10b981' : srs >= 0.5 ? '#f59e0b' : '#e84545';
  
  const scored = routing?.all_hospitals_scored || [];
  const secondary = hospitals.find(h => h.id === scored[1]?.hospital_id) || hospitals[1] || MOCK_HOSPITALS[1];

  return (
    <div className="flex flex-row-reverse h-full overflow-hidden">

      {/* ── Map (top 60%) ─────────────────────────────────────────── */}
      <div style={{ width: '60%', height: '100%', flexShrink: 0, position: 'relative', borderLeft: '1px solid #1e2d3d' }}>
        <MapEmbed targetHospitalId={hospital?.id} height="100%" showAllHospitals={true} />

        {/* Vitals strip overlay */}
        <div className="absolute bottom-3 left-3 right-3 z-10 flex gap-2">
          {[
            { label: 'HR',   value: `${patient?.heart_rate}`, danger: patient?.heart_rate > 110 },
            { label: 'BP',   value: `${patient?.systolic_bp}/${patient?.diastolic_bp}`, danger: patient?.systolic_bp < 90 },
            { label: 'SpO₂', value: `${patient?.spo2}%`,      danger: patient?.spo2 < 94 },
            { label: 'GCS',  value: patient?.gcs_score,        danger: patient?.gcs_score < 12 },
          ].map(({ label, value, danger }) => (
            <div key={label} className="flex-1 text-center rounded-lg py-2 backdrop-blur-sm"
              style={{ background: 'rgba(13,17,23,0.88)', border: `1px solid ${danger ? '#e84545' : '#1e2d3d'}` }}>
              <div className="section-label" style={{ fontSize: 8 }}>{label}</div>
              <div className="font-mono font-bold text-xs mt-0.5" style={{ color: danger ? '#e84545' : '#e8ecef' }}>{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom Panel (40%) ──────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-y-auto" style={{ borderColor: '#1e2d3d', background: '#0d1117' }}>

        {/* ROW 1: Hospital Destination Card */}
        <div className="px-4 pt-3 pb-3 border-b" style={{ borderColor: '#1e2d3d' }}>
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: '#06b6d4' }}>
                ⚡ NEXUS Recommendation
              </div>
              <div className="text-xl font-black" style={{ color: '#e8ecef', letterSpacing: '-0.02em' }}>{hospital?.name}</div>
              <div className="text-[10px] mt-0.5 flex items-center gap-1" style={{ color: '#7a8a9a' }}>
                <MapPin size={10} /> {hospital?.address?.split(',').slice(-2).join(',')}
              </div>
            </div>
            <div className="text-right">
              <ETATimer initialMin={9} />
              <div className="text-[9px] mt-1" style={{ color: '#7a8a9a' }}>ETA</div>
              <div className="text-[10px] font-mono font-semibold mt-0.5" style={{ color: '#f59e0b' }}>4.2 km</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[9px] font-bold px-2 py-1 rounded-full"
              style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981', border: '1px solid rgba(16,185,129,0.3)' }}>
              ✓ TEAM NOTIFIED
            </span>
            <button className="text-[9px] px-2 py-1 rounded-full"
              style={{ background: '#151d26', color: '#7a8a9a', border: '1px solid #1e2d3d' }}>
              Change Destination
            </button>
          </div>
        </div>

        {/* ROW 2: Patient Summary Strip */}
        <div className="px-4 py-3 border-b" style={{ borderColor: '#1e2d3d' }}>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <SeverityBadge severity={patient?.predicted_severity} pulse size="xs" />
              <span className="text-[10px] font-mono" style={{ color: '#7a8a9a' }}>{patient?.session_code}</span>
            </div>
            <div className="flex-1 flex gap-3 text-[10px]" style={{ color: '#7a8a9a' }}>
              <span>❤️ HR={patient?.heart_rate}</span>
              <span>🩸 BP={patient?.systolic_bp}/{patient?.diastolic_bp}</span>
              <span>🩁 SpO₂={patient?.spo2}%</span>
            </div>
            <SurvivabilityScore score={srs} size={40} />
          </div>
          <div className="flex gap-1.5 mt-2">
            {patient?.predicted_care_needs?.icu        && <span className="text-[9px] px-2 py-0.5 rounded font-semibold" style={{ background: 'rgba(139,92,246,0.15)', color: '#8b5cf6', border: '1px solid rgba(139,92,246,0.25)' }}>🛏 ICU</span>}
            {patient?.predicted_care_needs?.ventilator && <span className="text-[9px] px-2 py-0.5 rounded font-semibold" style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4', border: '1px solid rgba(6,182,212,0.3)' }}>💨 Vent</span>}
            {patient?.predicted_care_needs?.specialist && <span className="text-[9px] px-2 py-0.5 rounded font-semibold" style={{ background: 'rgba(232,69,69,0.12)', color: '#e84545', border: '1px solid rgba(232,69,69,0.25)' }}>🩺 {patient.predicted_care_needs.specialist.replace('_', ' ')}</span>}
          </div>
        </div>

        {/* NEXUS Rationale foldout */}
        <div className="px-4 py-3 border-b" style={{ borderColor: '#1e2d3d' }}>
          <div className="flex items-center justify-between mb-2">
            <div className="section-label">APEX Factors</div>
            <button onClick={() => setShowShap(v => !v)} className="text-[9px]" style={{ color: '#06b6d4' }}>
              {showShap ? 'Hide' : 'Show'} SHAP
            </button>
          </div>
          {showShap ? (
            <ShapPanel shapExplanation={routing?.shap_explanation} title="" />
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {Object.entries(routing?.shap_explanation || {}).slice(0, 3).map(([k, v]) => (
                <span key={k} className="text-[9px] px-2 py-0.5 rounded font-semibold"
                  style={{ background: 'rgba(139,92,246,0.12)', color: '#8b5cf6', border: '1px solid rgba(139,92,246,0.2)' }}>
                  {k.replace('_', ' ')} {Math.round(v * 100)}%
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Accept + Arrive buttons */}
        <div className="px-4 py-3 flex gap-2">
          {!accepted ? (
            <button onClick={() => setAccepted(true)}
              className="flex-1 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
              style={{ background: 'rgba(16,185,129,0.2)', color: '#10b981', border: '1px solid rgba(16,185,129,0.4)' }}>
              <CheckCircle size={18} /> Accept Route
            </button>
          ) : (
            <div className="flex-1 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
              style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.25)' }}>
              <CheckCircle size={16} /> En Route ✓
            </div>
          )}
          <button onClick={onArrive}
            className="px-4 py-3.5 rounded-xl font-bold text-sm"
            style={{ background: '#151d26', color: '#7a8a9a', border: '1px solid #1e2d3d' }}>
            Arrived
          </button>
        </div>
      </div>

      {/* ── Rerouting Alert Modal ─────────────────────────────────── */}
      {rerouteAlert && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.85)' }}>
          <div className="rounded-2xl p-6 w-full max-w-sm"
            style={{ background: '#0d1117', border: '2px solid rgba(232,69,69,0.5)' }}>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={22} style={{ color: '#e84545' }} />
              <span className="font-black text-lg" style={{ color: '#e84545' }}>ROUTE CHANGED</span>
            </div>
            <div className="text-base font-bold mb-1" style={{ color: '#e8ecef' }}>New Destination: Lilavati Hospital</div>
            <div className="text-xs mb-4" style={{ color: '#7a8a9a' }}>KEM reached capacity. Rerouted to Lilavati (2 min longer, better specialist match)</div>
            <div className="flex gap-2">
              <button onClick={() => setRerouteAlert(false)} className="flex-1 py-3 rounded-xl font-bold text-sm"
                style={{ background: 'rgba(16,185,129,0.2)', color: '#10b981', border: '1px solid rgba(16,185,129,0.4)' }}>
                ✓ Accept New Route
              </button>
              <button onClick={() => setRerouteAlert(false)} className="px-4 py-3 rounded-xl font-bold text-sm"
                style={{ background: 'rgba(232,69,69,0.12)', color: '#e84545', border: '1px solid rgba(232,69,69,0.3)' }}>
                Keep
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main: Status-Flow Controller ────────────────────────────────────────────
export default function AmbulanceMain() {
  const hospitals  = useStore(s => s.hospitals);
  const ambulances = useStore(s => s.ambulances);
  const patients   = useStore(s => s.patients);
  const activePatId = useStore(s => s.activePatientId);
  const activeAmbId = useStore(s => s.activeAmbulanceId);
  const updateAmbulanceStatus = useStore(s => s.updateAmbulanceStatus);       

  const patient  = patients.find(p => p.id === activePatId);
  const ambulance = ambulances.find(a => a.id === activeAmbId);
  const routingEvents = useStore(s => s.routingEvents);
  const routing = routingEvents.find(e => e.patient_id === activePatId) || MOCK_ROUTING_EVENTS[0];
  const hospital = hospitals.find(h => h.id === (patient?.assigned_hospital_id || routing.routed_to_hospital_id || 'hosp-001')) || hospitals[0];

  // Status determines which screen is shown
  const status = ambulance?.status || 'idle';
  const setStatus = (st) => updateAmbulanceStatus(activeAmbId, st);
  if (status === 'at_hospital') {
    return <HandoverScreen hospital={hospital} onConfirm={() => setTimeout(() => setStatus('idle'), 2000)} />;
  }

  // en_route_to_hospital (navigation screen)
  return (
    <NavigationScreen
      patient={patient}
      hospital={hospital}
      routing={routing}
      onArrive={() => setStatus('at_hospital')}
    />
  );
}
