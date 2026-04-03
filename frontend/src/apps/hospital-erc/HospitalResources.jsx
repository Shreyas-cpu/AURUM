import React, { useState } from 'react';
import { Plus, Minus, ToggleLeft, ToggleRight, Save, Clock, CheckCircle } from 'lucide-react';
import { useStore } from '../../hooks/useStore';
import { SPECIALIST_LABELS } from '../../data/mockData';

function Counter({ value, onInc, onDec, min = 0, max = 999, danger }) {
  return (
    <div className="flex items-center gap-2">
      <button onClick={onDec} disabled={value <= min}
        className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors disabled:opacity-30"
        style={{ background: '#151d26', border: '1px solid #1e2d3d', color: '#7a8a9a' }}
        onMouseEnter={e => { if (value > min) e.currentTarget.style.borderColor = '#e84545'; e.currentTarget.style.color = '#e8ecef'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = '#1e2d3d'; e.currentTarget.style.color = '#7a8a9a'; }}>
        <Minus size={12} />
      </button>
      <span className="font-mono font-bold text-lg w-10 text-center tabular-nums"
        style={{ color: danger && value <= 3 ? '#e84545' : '#e8ecef' }}>{value}</span>
      <button onClick={onInc} disabled={value >= max}
        className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors disabled:opacity-30"
        style={{ background: '#151d26', border: '1px solid #1e2d3d', color: '#7a8a9a' }}
        onMouseEnter={e => { if (value < max) e.currentTarget.style.borderColor = '#10b981'; e.currentTarget.style.color = '#10b981'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = '#1e2d3d'; e.currentTarget.style.color = '#7a8a9a'; }}>
        <Plus size={12} />
      </button>
    </div>
  );
}

export default function HospitalResources() {
  const hospitals              = useStore(s => s.hospitals);
  const activeHospitalId       = useStore(s => s.activeHospitalId);
  const updateHospitalResources= useStore(s => s.updateHospitalResources);
  const updateSpecialist       = useStore(s => s.updateSpecialist);
  const addNotification        = useStore(s => s.addNotification);
  const h                      = hospitals.find(x => x.id === activeHospitalId);
  const [saved, setSaved]      = useState(false);

  if (!h) return null;

  const handleSave = () => {
    // Would POST to PUT /hospitals/:id/resources
    setSaved(true);
    addNotification({ type: 'success', title: 'Resources Updated', message: 'Hospital capacity synced to AURUM grid.' });
    setTimeout(() => setSaved(false), 3000);
  };

  const res = {
    avail_icu_beds:    h.avail_icu_beds,
    total_icu_beds:    h.total_icu_beds,
    avail_gen_beds:    h.avail_gen_beds,
    avail_ventilators: h.avail_ventilators,
    current_load_pct:  h.current_load_pct,
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-aurum-text">Resource Management</h1>
          <p className="text-xs text-aurum-text-ter mt-0.5">
            Updates sync to NEXUS in real-time via <span className="font-mono text-aurum-text-sec">PUT /hospitals/{'{id}'}/resources</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-[11px] text-aurum-text-ter flex items-center gap-1">
            <Clock size={11} /> Last updated: {new Date(h.last_updated_at).toLocaleTimeString()}
          </div>
          <button onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
            style={{
              background: saved ? 'rgba(16,185,129,0.2)' : 'rgba(232,69,69,0.15)',
              color:      saved ? '#10b981' : '#e84545',
              border:     `1px solid ${saved ? 'rgba(16,185,129,0.4)' : 'rgba(232,69,69,0.3)'}`,
            }}>
            {saved ? <CheckCircle size={14} /> : <Save size={14} />}
            {saved ? 'Saved' : 'Sync to AURUM'}
          </button>
        </div>
      </div>

      {/* Beds */}
      <div className="aurum-card mb-4">
        <div className="section-label mb-4">Bed Availability</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: 'ICU Beds',         avail: 'avail_icu_beds', total: h.total_icu_beds,  danger: true },
            { label: 'General Beds',     avail: 'avail_gen_beds', total: h.total_gen_beds,  danger: false },
          ].map(({ label, avail, total, danger }) => (
            <div key={avail}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-sm font-semibold text-aurum-text">{label}</div>
                  <div className="text-xs text-aurum-text-ter mt-0.5">
                    {h[avail]} available of {total} total
                  </div>
                </div>
                <Counter
                  value={h[avail]}
                  min={0} max={total}
                  danger={danger}
                  onInc={() => updateHospitalResources(activeHospitalId, { [avail]: h[avail] + 1 })}
                  onDec={() => updateHospitalResources(activeHospitalId, { [avail]: h[avail] - 1 })}
                />
              </div>
              <div className="load-bar-track">
                <div className="load-bar-fill" style={{
                  width: `${((h[avail] / total) * 100)}%`,
                  background: h[avail] / total < 0.2 ? '#e84545' : h[avail] / total < 0.5 ? '#f59e0b' : '#10b981',
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Equipment */}
      <div className="aurum-card mb-4">
        <div className="section-label mb-4">Equipment</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Ventilators */}
          <div>
            <div className="text-sm font-semibold text-aurum-text mb-1">Ventilators</div>
            <div className="text-xs text-aurum-text-ter mb-3">{h.avail_ventilators} available</div>
            <Counter
              value={h.avail_ventilators} min={0} max={99} danger
              onInc={() => updateHospitalResources(activeHospitalId, { avail_ventilators: h.avail_ventilators + 1 })}
              onDec={() => updateHospitalResources(activeHospitalId, { avail_ventilators: h.avail_ventilators - 1 })}
            />
          </div>

          {/* Capability toggles */}
          {[
            { key: 'has_trauma_centre', label: 'Trauma Centre' },
            { key: 'has_cath_lab',      label: 'Cath Lab' },
            { key: 'has_neurosurgery',  label: 'Neurosurgery Unit' },
            { key: 'has_cardiac_surgery', label: 'Cardiac Surgery' },
            { key: 'has_burn_unit',     label: 'Burn Unit' },
          ].slice(0, 2).map(({ key, label }) => (
            <div key={key}>
              <div className="text-sm font-semibold text-aurum-text mb-1">{label}</div>
              <div className="text-xs text-aurum-text-ter mb-3">Facility capability flag</div>
              <button onClick={() => updateHospitalResources(activeHospitalId, { [key]: !h[key] })}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all"
                style={{
                  background: h[key] ? 'rgba(16,185,129,0.15)' : 'rgba(232,69,69,0.1)',
                  color:      h[key] ? '#10b981' : '#7a8a9a',
                  border:     `1px solid ${h[key] ? 'rgba(16,185,129,0.3)' : '#1e2d3d'}`,
                }}>
                {h[key] ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
                {h[key] ? 'Online' : 'Offline'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Specialists */}
      <div className="aurum-card">
        <div className="flex items-center justify-between mb-4">
          <div className="section-label">Specialists On Duty</div>
          <span className="text-[10px] text-aurum-text-ter font-mono">PUT /hospitals/{'{id}'}/specialists</span>
        </div>
        <div className="space-y-3">
          {h.specialists_on_duty.map(s => (
            <div key={s.id} className="flex items-center justify-between py-3 border-b" style={{ borderColor: '#1e2d3d' }}>
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${s.on_duty ? 'bg-emerald-500' : 'bg-aurum-text-ter'}`}
                  style={s.on_duty ? { boxShadow: '0 0 6px rgba(16,185,129,0.6)' } : {}} />
                <div>
                  <div className="text-sm font-semibold text-aurum-text">{s.doctor_name}</div>
                  <div className="text-xs text-aurum-text-ter">{SPECIALIST_LABELS[s.specialist_type] || s.specialist_type}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-aurum-text-ter">Shift ends {s.shift_ends_at}</span>
                <button
                  onClick={() => updateSpecialist(activeHospitalId, s.id, { on_duty: !s.on_duty })}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                  style={{
                    background: s.on_duty ? 'rgba(16,185,129,0.15)' : 'rgba(232,69,69,0.1)',
                    color:      s.on_duty ? '#10b981' : '#7a8a9a',
                    border:     `1px solid ${s.on_duty ? 'rgba(16,185,129,0.3)' : '#1e2d3d'}`,
                  }}>
                  {s.on_duty ? <ToggleRight size={12} /> : <ToggleLeft size={12} />}
                  {s.on_duty ? 'On Duty' : 'Off Duty'}
                </button>
              </div>
            </div>
          ))}

          {h.specialists_on_duty.length === 0 && (
            <div className="text-center py-8 text-aurum-text-ter text-sm">No specialists configured for this hospital.</div>
          )}
        </div>
      </div>
    </div>
  );
}
