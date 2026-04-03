import React, { useState } from 'react';
import { AlertTriangle, Zap, ArrowRight, CheckCircle, Users } from 'lucide-react';
import { useStore } from '../../hooks/useStore';
import { MOCK_HOSPITALS, MOCK_PATIENTS, SEVERITY_MAP } from '../../data/mockData';
import SeverityBadge from '../../components/shared/SeverityBadge';
import SurvivabilityScore from '../../components/shared/SurvivabilityScore';

// MCE scenario: 6 patients → 4 hospitals
const MCE_PATIENTS = [
  { id:'mce-p1', session:'P-MCE-001', severity:5, age:34, sex:'male',   complaint:'Blast injury — multiple shrapnel wounds', srs:0.41, care:{ icu:true,  ventilator:true,  specialist:'trauma_surgeon'   }, assigned:'hosp-001' },
  { id:'mce-p2', session:'P-MCE-002', severity:4, age:56, sex:'male',   complaint:'Crush injury — fractured pelvis/femur',   srs:0.63, care:{ icu:true,  ventilator:false, specialist:'orthopaedic_surgeon'}, assigned:'hosp-005' },
  { id:'mce-p3', session:'P-MCE-003', severity:4, age:22, sex:'female', complaint:'Head trauma — GCS 8, bilateral dilation', srs:0.49, care:{ icu:true,  ventilator:true,  specialist:'neurosurgeon'      }, assigned:'hosp-001' },
  { id:'mce-p4', session:'P-MCE-004', severity:3, age:67, sex:'male',   complaint:'Chest trauma —rib fractures + pneumo', srs:0.74, care:{ icu:false, ventilator:true,  specialist:'trauma_surgeon'   }, assigned:'hosp-003' },
  { id:'mce-p5', session:'P-MCE-005', severity:2, age:41, sex:'female', complaint:'Soft tissue — burns 15% TBSA arm/torso', srs:0.88, care:{ icu:false, ventilator:false, specialist:'general_surgeon'   }, assigned:'hosp-006' },
  { id:'mce-p6', session:'P-MCE-006', severity:1, age:19, sex:'male',   complaint:'Minor lacerations — facial cuts, stable', srs:0.97, care:{ icu:false, ventilator:false, specialist:null             }, assigned:'hosp-007' },
];

const HOSPITAL_COLORS = { 'hosp-001':'#e84545', 'hosp-003':'#f59e0b', 'hosp-005':'#3b82f6', 'hosp-006':'#10b981', 'hosp-007':'#8b5cf6' };

export default function HospitalMCE() {
  const [mceActive, setMceActive] = useState(false);
  const [overrides, setOverrides] = useState({});
  const addNotification = useStore(s => s.addNotification);

  const handleTrigger = () => {
    setMceActive(true);
    addNotification({ type: 'critical', title: 'MCE ACTIVATED', message: 'NEXUS ILP batch optimizer running — distributing 6 patients across 4 hospitals.' });
  };

  const handleOverride = (patientId, newHospital) => {
    setOverrides(prev => ({ ...prev, [patientId]: newHospital }));
    addNotification({ type: 'warning', title: 'Manual Override', message: `Patient ${patientId.slice(-3)} reassigned — NEXUS reoptimizing remaining assignments.` });
  };

  const hospitalCounts = MOCK_HOSPITALS.reduce((acc, h) => {
    acc[h.id] = MCE_PATIENTS.filter(p => (overrides[p.id] || p.assigned) === h.id).length;
    return acc;
  }, {});

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-aurum-text">Mass Casualty Event Mode</h1>
          <p className="text-xs text-aurum-text-ter mt-0.5">NEXUS ILP batch optimiser — <span className="font-mono">POST /route/mce-batch</span></p>
        </div>

        {!mceActive ? (
          <button onClick={handleTrigger}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all animate-glow-red"
            style={{ background: 'rgba(232,69,69,0.2)', color: '#e84545', border: '1px solid rgba(232,69,69,0.5)' }}>
            <AlertTriangle size={16} /> Simulate MCE Event
          </button>
        ) : (
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold animate-pulse"
            style={{ background: 'rgba(232,69,69,0.2)', color: '#e84545', border: '1px solid rgba(232,69,69,0.4)' }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
            MCE ACTIVE — {MCE_PATIENTS.length} patients
          </div>
        )}
      </div>

      {!mceActive ? (
        // Pre-MCE state
        <div className="flex flex-col items-center justify-center h-64 aurum-card text-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: 'rgba(232,69,69,0.1)', border: '1px solid rgba(232,69,69,0.2)' }}>
            <AlertTriangle size={28} style={{ color: '#e84545' }} />
          </div>
          <div className="text-base font-bold text-aurum-text mb-2">MCE Mode Standby</div>
          <div className="text-sm text-aurum-text-ter max-w-md">
            Click "Simulate MCE Event" to trigger NEXUS batch optimization across all incoming patients.
            NEXUS uses Integer Linear Programming to distribute N patients across M hospitals without exceeding surge capacity.
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

          {/* Left: Patient List */}
          <div className="lg:col-span-3 space-y-3">
            <div className="section-label mb-2">NEXUS Batch Assignment — {MCE_PATIENTS.length} patients</div>
            {MCE_PATIENTS.map(p => {
              const assignedId   = overrides[p.id] || p.assigned;
              const assignedHosp = MOCK_HOSPITALS.find(h => h.id === assignedId);
              const color        = HOSPITAL_COLORS[assignedId] || '#7a8a9a';
              const srsColor     = p.srs >= 0.75 ? '#10b981' : p.srs >= 0.5 ? '#f59e0b' : '#e84545';

              return (
                <div key={p.id} className="rounded-xl border flex items-center overflow-hidden"
                  style={{ background: '#0f151c', borderColor: '#1e2d3d', borderLeft: `3px solid ${color}` }}>
                  <div className="flex-1 px-4 py-3">
                    <div className="flex items-center gap-2 mb-1.5">
                      <SeverityBadge severity={p.severity} size="xs" />
                      <span className="font-mono text-xs text-aurum-text">{p.session}</span>
                      <span className="text-xs text-aurum-text-ter">Age {p.age} {p.sex}</span>
                    </div>
                    <p className="text-xs text-aurum-text-sec">{p.complaint}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs font-mono font-bold" style={{ color: srsColor }}>SRS {Math.round(p.srs * 100)}%</span>
                      {p.care.icu        && <span className="text-[10px] text-aurum-text-ter">ICU</span>}
                      {p.care.ventilator && <span className="text-[10px] text-aurum-text-ter">Vent</span>}
                      {p.care.specialist && <span className="text-[10px] text-aurum-text-ter capitalize">{p.care.specialist.replace('_', ' ')}</span>}
                    </div>
                  </div>

                  {/* Assignment */}
                  <div className="px-4 py-3 text-right shrink-0 border-l" style={{ borderColor: '#1e2d3d' }}>
                    <div className="text-[10px] text-aurum-text-ter mb-1">NEXUS → </div>
                    <div className="text-xs font-bold" style={{ color }}>{assignedHosp?.name?.split(' ').slice(0, 2).join(' ')}</div>
                    {overrides[p.id] && (
                      <div className="text-[9px] mt-1" style={{ color: '#f59e0b' }}>Manual override</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Hospital Load Grid */}
          <div className="lg:col-span-2 space-y-3">
            <div className="section-label mb-2">Hospital Allocation Grid</div>
            {MOCK_HOSPITALS.slice(0, 6).map(h => {
              const count = hospitalCounts[h.id] || 0;
              const color = HOSPITAL_COLORS[h.id] || '#4a5a6a';
              const maxSurge = Math.ceil(h.avail_icu_beds * 1.2) + 2;
              const pct = Math.min(100, (count / Math.max(maxSurge, 1)) * 100);
              return (
                <div key={h.id} className="aurum-card-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs font-semibold text-aurum-text truncate max-w-[140px]">{h.name.split('(')[0].trim()}</div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm" style={{ color: count > 0 ? color : '#4a5a6a' }}>{count}</span>
                      <Users size={12} style={{ color: '#4a5a6a' }} />
                    </div>
                  </div>
                  <div className="load-bar-track">
                    <div className="load-bar-fill" style={{ width: `${pct}%`, background: color, boxShadow: count > 0 ? `0 0 8px ${color}60` : 'none' }} />
                  </div>
                  <div className="flex justify-between mt-1.5 text-[10px] text-aurum-text-ter">
                    <span>Load: {h.current_load_pct}%</span>
                    <span>ICU avail: {h.avail_icu_beds}</span>
                  </div>
                </div>
              );
            })}

            <div className="aurum-card-sm mt-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap size={14} style={{ color: '#8b5cf6' }} />
                <span className="text-xs font-bold text-aurum-text">NEXUS ILP Result</span>
              </div>
              <div className="text-[11px] text-aurum-text-sec leading-relaxed">
                Batch solved in <span className="font-mono text-aurum-apex">1.2s</span> using OR-Tools ILP. No hospital exceeds surge capacity. Load distributed across {Object.values(hospitalCounts).filter(v => v > 0).length} facilities. Ripple-effect recomputation active.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
