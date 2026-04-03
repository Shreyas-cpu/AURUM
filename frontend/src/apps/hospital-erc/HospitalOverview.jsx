import React, { useState, useEffect } from 'react';
import {
  Clock, Wind, Brain, Heart, AlertTriangle, CheckCircle, XCircle,
  ChevronRight, Zap, Minus, Plus, ToggleLeft, ToggleRight, MapPin, Activity
} from 'lucide-react';
import { useStore } from '../../hooks/useStore';
import { MOCK_HOSPITALS, MOCK_ROUTING_EVENTS, SEVERITY_MAP, SPECIALIST_LABELS } from '../../data/mockData';
import SeverityBadge from '../../components/shared/SeverityBadge';
import SurvivabilityScore from '../../components/shared/SurvivabilityScore';
import MapEmbed from '../../components/shared/MapEmbed';
import ShapPanel from '../../components/shared/ShapPanel';

// ─── Care icon ───────────────────────────────────────────────────────────────
function CareIcon({ type }) {
  const map = {
    icu:        { icon: '🛏', label: 'ICU Bed'    },
    ventilator: { icon: '💨', label: 'Ventilator' },
    cath_lab:   { icon: '❤️', label: 'Cath Lab'   },
  };
  const item = map[type];
  if (!item) return null;
  return (
    <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold"
      style={{ background: 'rgba(139,92,246,0.15)', color: '#8b5cf6', border: '1px solid rgba(139,92,246,0.25)' }}>
      {item.icon} {item.label}
    </span>
  );
}

// ─── ETA Countdown ──────────────────────────────────────────────────────────
function ETACount({ initialMin }) {
  const [sec, setSec] = useState(initialMin * 60);
  useEffect(() => {
    const id = setInterval(() => setSec(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, []);
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return (
    <span className="font-mono font-black tabular-nums" style={{ color: sec < 180 ? '#e84545' : '#f59e0b', fontSize: 18 }}>
      {m}:{s.toString().padStart(2, '0')}
    </span>
  );
}

// ─── Incoming Ambulance Card ─────────────────────────────────────────────────
function IncomingCard({ patient, ambulance, onSelect, isSelected }) {
  const [accepted, setAccepted] = useState(false);
  const [flagged,  setFlagged]  = useState(false);
  const srs = patient.survivability_score;
  const srsColor = srs >= 0.75 ? '#10b981' : srs >= 0.5 ? '#f59e0b' : '#e84545';

  if (accepted) {
    return (
      <div className="aurum-card border-l-2 animate-fade-in" style={{ borderLeftColor: '#10b981' }}>
        <div className="flex items-center gap-2">
          <CheckCircle size={14} style={{ color: '#10b981' }} />
          <span className="text-xs font-semibold text-aurum-text">{patient.session_code} — Accepted</span>
        </div>
        <p className="text-[10px] mt-1" style={{ color: '#7a8a9a' }}>Pre-arrival brief sent. Team on standby.</p>
      </div>
    );
  }

  return (
    <div
      onClick={() => onSelect(patient)}
      className={`rounded-xl border transition-all duration-200 overflow-hidden cursor-pointer ${isSelected ? 'ring-1' : ''} ${flagged ? 'border-amber-500/40' : 'border-aurum-border'}`}
      style={{ background: isSelected ? '#0f1f2e' : '#0d1117', ringColor: '#e84545' }}
    >
      {/* Header */}
      <div className="px-3 py-2.5 flex items-center justify-between border-b" style={{ borderColor: '#1e2d3d' }}>
        <div className="flex items-center gap-2">
          <SeverityBadge severity={patient.predicted_severity} pulse size="xs" />
          <span className="text-[10px] font-mono font-semibold text-aurum-text">{patient.session_code}</span>
        </div>
        <div className="flex items-center gap-1 text-[10px]" style={{ color: '#7a8a9a' }}>
          <Clock size={10} />
          <ETACount initialMin={9} />
        </div>
      </div>

      <div className="px-3 py-2.5">
        <p className="text-[10px] leading-relaxed mb-2 line-clamp-2" style={{ color: '#7a8a9a' }}>{patient.chief_complaint}</p>

        {/* Vitals */}
        <div className="grid grid-cols-4 gap-1.5 mb-2">
          {[
            { label: 'HR',   value: patient.heart_rate,                        danger: patient.heart_rate > 110 },
            { label: 'BP',   value: `${patient.systolic_bp}/${patient.diastolic_bp}`, danger: patient.systolic_bp < 90 },
            { label: 'SpO₂', value: `${patient.spo2}%`,                        danger: patient.spo2 < 94 },
            { label: 'GCS',  value: patient.gcs_score,                         danger: patient.gcs_score < 12 },
          ].map(({ label, value, danger }) => (
            <div key={label} className="rounded px-1.5 py-1 text-center" style={{ background: '#151d26' }}>
              <div className="section-label" style={{ fontSize: 8 }}>{label}</div>
              <div className="font-mono font-bold text-[10px] mt-0.5" style={{ color: danger ? '#e84545' : '#e8ecef' }}>{value}</div>
            </div>
          ))}
        </div>

        {/* Care needs */}
        <div className="flex flex-wrap gap-1 mb-2.5">
          {patient.predicted_care_needs?.icu        && <CareIcon type="icu" />}
          {patient.predicted_care_needs?.ventilator && <CareIcon type="ventilator" />}
          {patient.predicted_care_needs?.specialist && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold"
              style={{ background: 'rgba(232,69,69,0.12)', color: '#e84545', border: '1px solid rgba(232,69,69,0.25)' }}>
              🩺 {SPECIALIST_LABELS[patient.predicted_care_needs.specialist] || patient.predicted_care_needs.specialist}
            </span>
          )}
        </div>

        {/* SRS */}
        <div className="flex items-center justify-between mb-3">
          <div className="text-[9px] text-aurum-text-ter">APEX SRS</div>
          <div className="font-mono font-bold text-xs" style={{ color: srsColor }}>{Math.round(srs * 100)}%</div>
        </div>

        {/* Actions */}
        {!flagged ? (
          <div className="flex gap-1.5">
            <button onClick={e => { e.stopPropagation(); setAccepted(true); }} className="flex-1 btn-accept text-[10px] py-2 rounded-lg">
              <CheckCircle size={11} /> Accept
            </button>
            <button onClick={e => { e.stopPropagation(); setFlagged(true); }} className="flex-1 btn-flag text-[10px] py-2 rounded-lg">
              <XCircle size={11} /> Flag
            </button>
          </div>
        ) : (
          <div className="rounded px-2 py-1.5 text-[10px]" style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.25)' }}>
            ⚠ Re-routing via NEXUS…
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Left Sidebar: Resource Management ──────────────────────────────────────
function ResourceSidebar({ hospital, onUpdate }) {
  const updateHospitalResources = useStore(s => s.updateHospitalResources);
  const updateSpecialist = useStore(s => s.updateSpecialist);

  function Stepper({ label, value, total, colorFn, field }) {
    const color = colorFn(value, total);
    return (
      <div className="flex items-center justify-between py-2 border-b" style={{ borderColor: '#1e2d3d' }}>
        <div>
          <div className="text-[10px] font-semibold" style={{ color: '#e8ecef' }}>{label}</div>
          <div className="text-[9px] font-mono mt-0.5" style={{ color }}>{value} / {total}</div>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => updateHospitalResources(hospital.id, { [field]: Math.max(0, value - 1) })}
            className="w-6 h-6 rounded flex items-center justify-center transition-colors"
            style={{ background: '#151d26', border: '1px solid #1e2d3d', color: '#7a8a9a' }}>
            <Minus size={10} />
          </button>
          <span className="font-mono font-bold text-sm w-6 text-center" style={{ color }}>{value}</span>
          <button onClick={() => updateHospitalResources(hospital.id, { [field]: Math.min(total, value + 1) })}
            className="w-6 h-6 rounded flex items-center justify-center transition-colors"
            style={{ background: '#151d26', border: '1px solid #1e2d3d', color: '#7a8a9a' }}>
            <Plus size={10} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[300px] shrink-0 flex flex-col overflow-hidden border-r" style={{ borderColor: '#1e2d3d', background: '#0d1117' }}>
      {/* Header */}
      <div className="px-4 py-3 border-b shrink-0" style={{ borderColor: '#1e2d3d' }}>
        <div className="text-xs font-bold text-aurum-text">{hospital.name}</div>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: '#1e2d3d' }}>
            <div className="h-full rounded-full transition-all duration-700"
              style={{ width: `${hospital.current_load_pct}%`, background: hospital.current_load_pct >= 90 ? '#e84545' : hospital.current_load_pct >= 70 ? '#f59e0b' : '#10b981' }} />
          </div>
          <span className="text-[10px] font-mono font-bold" style={{ color: hospital.current_load_pct >= 90 ? '#e84545' : '#f59e0b' }}>{hospital.current_load_pct}%</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {/* Bed Management */}
        <div>
          <div className="section-label mb-2">Bed Management</div>
          <Stepper
            label="ICU Beds" value={hospital.avail_icu_beds} total={hospital.total_icu_beds} field="avail_icu_beds"
            colorFn={(v, t) => v / t >= 0.5 ? '#10b981' : v / t >= 0.2 ? '#f59e0b' : '#e84545'}
          />
          <Stepper
            label="General Beds" value={hospital.avail_gen_beds} total={hospital.total_gen_beds} field="avail_gen_beds"
            colorFn={(v, t) => v / t >= 0.5 ? '#10b981' : v / t >= 0.2 ? '#f59e0b' : '#e84545'}
          />
        </div>

        {/* Equipment */}
        <div>
          <div className="section-label mb-2">Equipment</div>
          <Stepper
            label="Ventilators" value={hospital.avail_ventilators} total={hospital.avail_ventilators + 2} field="avail_ventilators"
            colorFn={(v) => v <= 2 ? '#e84545' : v <= 5 ? '#f59e0b' : '#3b82f6'}
          />
          {[
            { label: 'Trauma Centre',   key: 'has_trauma_centre' },
            { label: 'Cath Lab',        key: 'has_cath_lab'      },
            { label: 'Burn Unit',       key: 'has_burn_unit'     },
          ].map(({ label, key }) => (
            <div key={key} className="flex items-center justify-between py-2 border-b" style={{ borderColor: '#1e2d3d' }}>
              <span className="text-[10px] font-semibold" style={{ color: '#e8ecef' }}>{label}</span>
              <div className="flex items-center gap-1.5">
                {hospital[key]
                  ? <><ToggleRight size={18} style={{ color: '#10b981' }} /><span className="text-[9px] font-bold" style={{ color: '#10b981' }}>Available</span></>
                  : <><ToggleLeft size={18} style={{ color: '#4a5a6a' }} /><span className="text-[9px] font-bold" style={{ color: '#4a5a6a' }}>N/A</span></>
                }
              </div>
            </div>
          ))}
        </div>

        {/* Specialists On Duty */}
        <div>
          <div className="section-label mb-2">Specialists On Duty</div>
          {hospital.specialists_on_duty?.map(spec => (
            <div key={spec.id} className="flex items-center justify-between py-2 border-b" style={{ borderColor: '#1e2d3d' }}>
              <div>
                <div className="text-[10px] font-semibold" style={{ color: spec.on_duty ? '#e8ecef' : '#4a5a6a' }}>
                  {SPECIALIST_LABELS[spec.specialist_type] || spec.specialist_type}
                </div>
                <div className="text-[9px] mt-0.5" style={{ color: '#7a8a9a' }}>{spec.doctor_name}</div>
              </div>
              <div className="flex items-center gap-1.5">
                {spec.on_duty
                  ? <><span className="relative flex h-1.5 w-1.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#10b981' }} /><span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: '#10b981' }} /></span><span className="text-[9px] font-bold" style={{ color: '#10b981' }}>On Duty</span></>
                  : <span className="text-[9px] font-bold" style={{ color: '#4a5a6a' }}>Off Duty</span>
                }
              </div>
            </div>
          ))}
          {(!hospital.specialists_on_duty || hospital.specialists_on_duty.length === 0) && (
            <div className="text-[10px] py-3 text-center" style={{ color: '#4a5a6a' }}>No specialists on duty</div>
          )}
        </div>

        {/* Quick Actions */}
        <div>
          <div className="section-label mb-2">Quick Actions</div>
          <button className="w-full py-2.5 rounded-lg text-[10px] font-bold mb-2 transition-all"
            style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981', border: '1px solid rgba(16,185,129,0.3)' }}>
            ✓ Accept Diversion
          </button>
          <button className="w-full py-2.5 rounded-lg text-[10px] font-bold transition-all"
            style={{ background: 'rgba(232,69,69,0.12)', color: '#e84545', border: '1px solid rgba(232,69,69,0.25)' }}>
            ⚠ Declare Capacity
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Right Sidebar: Patient Detail Panel ─────────────────────────────────────
function PatientDetailPanel({ patient, hospital, onClose }) {
  const routing = MOCK_ROUTING_EVENTS.find(r => r.patient_id === patient?.id) || MOCK_ROUTING_EVENTS[0];
  const [showShap, setShowShap] = useState(false);

  if (!patient) {
    return (
      <div className="w-[360px] shrink-0 border-l flex items-center justify-center" style={{ borderColor: '#1e2d3d', background: '#0d1117' }}>
        <div className="text-center px-6">
          <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: '#151d26' }}>
            <Activity size={20} style={{ color: '#2a3d55' }} />
          </div>
          <div className="text-sm font-semibold" style={{ color: '#4a5a6a' }}>No Patient Selected</div>
          <div className="text-[10px] mt-1" style={{ color: '#2a3d55' }}>Click an ambulance card or map marker to view patient detail</div>
        </div>
      </div>
    );
  }

  const srs = patient.survivability_score;
  const srsColor = srs >= 0.75 ? '#10b981' : srs >= 0.5 ? '#f59e0b' : '#e84545';
  const sevMeta = SEVERITY_MAP[patient.predicted_severity] || SEVERITY_MAP[2];

  return (
    <div className="w-[360px] shrink-0 flex flex-col border-l overflow-hidden" style={{ borderColor: '#1e2d3d', background: '#0d1117' }}>
      {/* Header */}
      <div className="px-4 py-3 border-b shrink-0 flex items-center justify-between" style={{ borderColor: '#1e2d3d' }}>
        <div>
          <div className="flex items-center gap-2">
            <SeverityBadge severity={patient.predicted_severity} pulse size="xs" />
            <span className="text-[10px] font-mono font-bold" style={{ color: '#e8ecef' }}>{patient.session_code}</span>
          </div>
          <div className="text-[9px] mt-1" style={{ color: '#7a8a9a' }}>{patient.age}y {patient.sex} · {patient.chief_complaint?.slice(0, 40)}</div>
        </div>
        <ETACount initialMin={9} />
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {/* Vitals Grid */}
        <div>
          <div className="section-label mb-2">Live Vitals</div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'HR',    value: patient.heart_rate,                        unit: 'bpm', danger: patient.heart_rate > 110 },
              { label: 'SBP',   value: patient.systolic_bp,                       unit: 'mmHg', danger: patient.systolic_bp < 90 },
              { label: 'DBP',   value: patient.diastolic_bp,                      unit: 'mmHg', danger: false },
              { label: 'SpO₂',  value: `${patient.spo2}%`,                        unit: '', danger: patient.spo2 < 94 },
              { label: 'Resp',  value: patient.respiratory_rate,                  unit: '/min', danger: patient.respiratory_rate > 25 },
              { label: 'GCS',   value: `${patient.gcs_score}/15`,                 unit: '', danger: patient.gcs_score < 12 },
            ].map(({ label, value, unit, danger }) => (
              <div key={label} className="rounded-lg p-2 text-center" style={{ background: '#151d26', border: `1px solid ${danger ? 'rgba(232,69,69,0.3)' : '#1e2d3d'}` }}>
                <div className="section-label" style={{ fontSize: 8 }}>{label}</div>
                <div className="font-mono font-bold text-sm mt-0.5" style={{ color: danger ? '#e84545' : '#e8ecef' }}>{value}</div>
                {unit && <div className="text-[8px]" style={{ color: '#4a5a6a' }}>{unit}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* APEX Prediction */}
        <div className="rounded-xl p-3" style={{ background: `${sevMeta.color}0d`, border: `1px solid ${sevMeta.color}30` }}>
          <div className="section-label mb-2">APEX Prediction</div>
          <div className="flex items-center gap-3 mb-2">
            <SurvivabilityScore score={srs} size={56} />
            <div className="flex-1">
              <div className="text-base font-black uppercase" style={{ color: sevMeta.color }}>{sevMeta.label}</div>
              <div className="text-[9px] mt-0.5" style={{ color: '#7a8a9a' }}>Level {patient.predicted_severity} of 5</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-1">
            {patient.predicted_care_needs?.icu        && <CareIcon type="icu" />}
            {patient.predicted_care_needs?.ventilator && <CareIcon type="ventilator" />}
            {patient.predicted_care_needs?.specialist && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold"
                style={{ background: 'rgba(232,69,69,0.12)', color: '#e84545', border: '1px solid rgba(232,69,69,0.25)' }}>
                🩺 {SPECIALIST_LABELS[patient.predicted_care_needs.specialist] || patient.predicted_care_needs.specialist}
              </span>
            )}
          </div>
        </div>

        {/* Routing Rationale (SHAP) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="section-label">Routing Rationale</div>
            <button onClick={() => setShowShap(v => !v)} className="text-[9px] font-semibold" style={{ color: '#06b6d4' }}>
              {showShap ? 'Hide' : 'Show'} SHAP
            </button>
          </div>
          <div className="rounded-lg p-3 space-y-1.5" style={{ background: '#151d26', border: '1px solid #1e2d3d' }}>
            <div className="text-[10px] leading-relaxed" style={{ color: '#e8ecef' }}>
              ✓ <span className="font-semibold">Requires ICU</span> — {hospital?.avail_icu_beds} ICU beds available
            </div>
            <div className="text-[10px] leading-relaxed" style={{ color: '#e8ecef' }}>
              ✓ <span className="font-semibold">Trauma surgeon on duty</span> — Dr. Suresh Menon (on shift)
            </div>
            <div className="text-[10px] leading-relaxed" style={{ color: '#e8ecef' }}>
              ✓ <span className="font-semibold">9 min faster</span> than next nearest suitable hospital
            </div>
          </div>
          {showShap && (
            <div className="mt-2">
              <ShapPanel shapExplanation={routing?.shap_explanation} title="" />
            </div>
          )}
        </div>

        {/* Ranked Hospital Table */}
        <div>
          <div className="section-label mb-2">All Hospitals Evaluated</div>
          <div className="rounded-xl overflow-hidden border" style={{ borderColor: '#1e2d3d' }}>
            {routing?.all_hospitals_scored?.slice(0, 5).map((h, i) => (
              <div key={h.hospital_id} className="flex items-center gap-2 px-3 py-2 border-b last:border-b-0"
                style={{ borderColor: '#1e2d3d', background: h.rejection_reason ? 'rgba(232,69,69,0.04)' : i === 0 ? 'rgba(16,185,129,0.06)' : 'transparent' }}>
                <span className="text-[9px] font-mono font-bold w-4 text-center" style={{ color: i === 0 ? '#10b981' : '#4a5a6a' }}>#{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-semibold truncate" style={{ color: h.rejection_reason ? '#4a5a6a' : i === 0 ? '#10b981' : '#e8ecef' }}>{h.hospital_name}</div>
                  {h.rejection_reason && <div className="text-[8px]" style={{ color: '#e84545' }}>{h.rejection_reason}</div>}
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-mono font-bold" style={{ color: i === 0 ? '#10b981' : '#7a8a9a' }}>{Math.round(h.score * 100)}</div>
                  <div className="text-[8px]" style={{ color: '#4a5a6a' }}>{h.transit_min}m</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pre-Arrival Checklist */}
        <div>
          <div className="section-label mb-2">Pre-Arrival Checklist</div>
          {[
            { label: 'Reserve ICU Bed', done: true },
            { label: 'Alert Trauma Surgeon Dr. Menon', done: true },
            { label: 'Activate Trauma Bay 2', done: false },
            { label: 'Verify Ventilator Operational', done: false },
          ].map(({ label, done }) => (
            <div key={label} className="flex items-center gap-2 py-1.5 border-b" style={{ borderColor: '#151d26' }}>
              <div className="w-4 h-4 rounded border flex items-center justify-center shrink-0"
                style={{ borderColor: done ? '#10b981' : '#1e2d3d', background: done ? 'rgba(16,185,129,0.2)' : 'transparent' }}>
                {done && <CheckCircle size={10} style={{ color: '#10b981' }} />}
              </div>
              <span className="text-[10px]" style={{ color: done ? '#10b981' : '#7a8a9a', textDecoration: done ? 'line-through' : 'none' }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Reroute */}
        <button className="w-full py-2.5 rounded-xl font-bold text-[10px] flex items-center justify-center gap-1.5"
          style={{ background: 'rgba(232,69,69,0.12)', color: '#e84545', border: '1px solid rgba(232,69,69,0.3)' }}>
          ⚡ Initiate Dispatcher Override / Reroute
        </button>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function HospitalOverview() {
  const hospitals        = useStore(s => s.hospitals);
  const ambulances       = useStore(s => s.ambulances);
  const patients         = useStore(s => s.patients);
  const activeHospitalId = useStore(s => s.activeHospitalId);
  const h                = hospitals.find(x => x.id === activeHospitalId);
  const addNotification  = useStore(s => s.addNotification);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const incomingAmbs = ambulances.filter(a => a.assigned_hospital_id === activeHospitalId && a.status === 'en_route_to_hospital');
  const incomingPatients = incomingAmbs.map(a => ({
    ambulance: a,
    patient: patients.find(p => p.id === a.active_patient_id),
  })).filter(x => x.patient);

  // Always show at least the demo patient card for presentation
  const displayQueue = incomingPatients.length > 0
    ? incomingPatients
    : patients[0] ? [{ ambulance: ambulances[0], patient: patients[0] }] : [];

  if (!h) return null;

  return (
    <div className="flex h-full overflow-hidden">

      {/* ── LEFT: Resource Management Sidebar ──────────────────── */}
      <ResourceSidebar hospital={h} />

      {/* ── CENTRE: Map + Queue ─────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden border-r" style={{ borderColor: '#1e2d3d' }}>

        {/* Map Header */}
        <div className="px-4 py-2.5 flex items-center justify-between border-b shrink-0"
          style={{ borderColor: '#1e2d3d', background: '#0d1117' }}>
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-semibold text-aurum-text">Regional Grid</span>
            <span className="text-[9px] px-2 py-0.5 rounded font-semibold"
              style={{ background: 'rgba(6,182,212,0.1)', color: '#06b6d4', border: '1px solid rgba(6,182,212,0.2)' }}>
              ORACLE 30-min projection
            </span>
          </div>
          <div className="flex items-center gap-4 text-[9px]" style={{ color: '#4a5a6a' }}>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#10b981' }} />Low</span>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#f59e0b' }} />Med</span>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#e84545' }} />High</span>
          </div>
        </div>

        {/* Map — 55% height */}
        <div style={{ height: '55%', flexShrink: 0 }}>
          <MapEmbed targetHospitalId={activeHospitalId} height="100%" showAllHospitals />
        </div>

        {/* Incoming Ambulance Queue — below map */}
        <div className="flex-1 flex flex-col overflow-hidden border-t" style={{ borderColor: '#1e2d3d' }}>
          <div className="px-4 py-2.5 border-b shrink-0 flex items-center justify-between" style={{ borderColor: '#1e2d3d', background: '#0a0f15' }}>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-aurum-text">Incoming Ambulance Queue</span>
              <span className="text-[9px] px-2 py-0.5 rounded-full font-bold"
                style={{ background: displayQueue.length > 0 ? 'rgba(232,69,69,0.15)' : 'rgba(16,185,129,0.1)', color: displayQueue.length > 0 ? '#e84545' : '#10b981' }}>
                {displayQueue.length > 0 ? `${displayQueue.length} INCOMING` : 'ALL CLEAR'}
              </span>
            </div>
            <div className="flex items-center gap-3 text-[9px]" style={{ color: '#4a5a6a' }}>
              <span>NEXUS-routed · Live ETA</span>
            </div>
          </div>

          <div className="flex-1 overflow-x-auto overflow-y-hidden p-3">
            <div className="flex gap-3 h-full" style={{ minWidth: 'max-content' }}>
              {displayQueue.map(({ patient, ambulance }) => (
                <div key={patient.id} style={{ width: 260, flexShrink: 0 }}>
                  <IncomingCard
                    patient={patient}
                    ambulance={ambulance}
                    onSelect={setSelectedPatient}
                    isSelected={selectedPatient?.id === patient.id}
                  />
                </div>
              ))}
              {displayQueue.length === 0 && (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <CheckCircle size={28} style={{ color: '#10b981', margin: '0 auto 8px' }} />
                    <div className="text-sm font-semibold text-aurum-text">No Incoming Patients</div>
                    <div className="text-[10px] mt-1 text-aurum-text-ter">AURUM Grid stable. Monitoring active.</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT: Patient Detail Sidebar ───────────────────────── */}
      <PatientDetailPanel
        patient={selectedPatient || patients[0]}
        hospital={h}
      />
    </div>
  );
}
