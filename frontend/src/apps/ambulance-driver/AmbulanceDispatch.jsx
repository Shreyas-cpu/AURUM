import React, { useState } from 'react';
import { Mic, Send, Loader, CheckCircle, ArrowRight } from 'lucide-react';
import { useStore } from '../../hooks/useStore';
import SeverityBadge from '../../components/shared/SeverityBadge';
import SurvivabilityScore from '../../components/shared/SurvivabilityScore';


const COMPLAINTS = [
  { label: 'Chest Pain',           emoji: '💔', value: 'Chest pain / STEMI' },
  { label: 'Head Trauma',          emoji: '🧠', value: 'Head trauma / TBI' },
  { label: 'Polytrauma',           emoji: '🚗', value: 'Polytrauma / RTA' },
  { label: 'Breathing',            emoji: '🫁', value: 'Respiratory distress' },
  { label: 'Burns',                emoji: '🔥', value: 'Burns' },
  { label: 'Stroke',               emoji: '⚡', value: 'Stroke symptoms' },
  { label: 'Cardiac Arrest',       emoji: '🫀', value: 'Cardiac arrest' },
  { label: 'Other',                emoji: '🩺', value: 'Other' },
];

const MECHANISMS = [
  { label: 'RTA',          emoji: '🚗', value: 'Motor vehicle collision' },
  { label: 'Motorcycle',   emoji: '🏍', value: 'Motorcycle accident' },
  { label: 'Fall',         emoji: '🪜', value: 'Fall' },
  { label: 'Assault',      emoji: '🥊', value: 'Assault / blunt trauma' },
  { label: 'Medical',      emoji: '💊', value: 'Non-traumatic' },
  { label: 'Industrial',   emoji: '🏗', value: 'Industrial accident' },
  { label: 'Blast',        emoji: '💥', value: 'Blast/explosion' },
  { label: 'Other',        emoji: '❓', value: 'Other' },
];

export default function AmbulanceDispatch() {
  const runApex    = useStore(s => s.runApexPrediction);
  const isRunning  = useStore(s => s.isRunningApex);
  const apexResult = useStore(s => s.lastApexResult);
  const addNotif   = useStore(s => s.addNotification);
  const hospitals  = useStore(s => s.hospitals);

  const [form, setForm] = useState({
    age: '', sex: 'male',
    chief_complaint: '', mechanism_of_injury: '',
    heart_rate: '', systolic_bp: '', diastolic_bp: '', spo2: '',
    respiratory_rate: '', temperature: '', gcs_score: '',
  });
  const [finding, setFinding] = useState(false);

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = () => {
    setFinding(true);
    const vitals = {
      age:              parseInt(form.age) || 45,
      heart_rate:       parseInt(form.heart_rate) || 110,
      systolic_bp:      parseInt(form.systolic_bp) || 90,
      diastolic_bp:     parseInt(form.diastolic_bp) || 65,
      spo2:             parseFloat(form.spo2) || 94,
      respiratory_rate: parseInt(form.respiratory_rate) || 22,
      temperature:      parseFloat(form.temperature) || 37.5,
      gcs_score:        parseInt(form.gcs_score) || 11,
    };
    runApex(vitals);
    addNotif({ type: 'info', title: 'APEX Running', message: 'Severity prediction + routing initiated.' });
    setTimeout(() => setFinding(false), 1200);
  };

  // ── Finding Best Hospital overlay ──────────────────────────────────────────
  if (finding) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-6 px-8"
        style={{ background: '#080c10' }}>
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-4 border-t-4 animate-spin"
            style={{ borderColor: '#1e2d3d', borderTopColor: '#e84545' }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span style={{ fontSize: 28 }}>⚡</span>
          </div>
        </div>
        <div className="text-center">
          <div className="text-xl font-black" style={{ color: '#e8ecef' }}>FINDING BEST HOSPITAL…</div>
          <div className="text-xs mt-2" style={{ color: '#7a8a9a' }}>APEX predicting severity · NEXUS optimizing route</div>
        </div>
        <div className="flex gap-2">
          {['APEX Running', 'NEXUS Routing', 'ETA Calculating'].map((s, i) => (
            <div key={s} className="flex items-center gap-1.5 text-[9px] px-3 py-1.5 rounded-full font-semibold"
              style={{ background: 'rgba(139,92,246,0.1)', color: '#8b5cf6', border: '1px solid rgba(139,92,246,0.2)' }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#8b5cf6' }} />
              {s}
            </div>
          ))}
        </div>
      </div>
    );
  }

  const inputStyle = {
    background: '#151d26', border: '1px solid #1e2d3d',
    color: '#e8ecef', borderRadius: 10, padding: '12px 14px',
    fontSize: 18, fontFamily: 'JetBrains Mono, monospace',
    width: '100%', outline: 'none',
  };
  const labelStyle = { fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#4a5a6a', marginBottom: 8, display: 'block' };

  return (
    <div className="h-full overflow-y-auto px-4 py-4 space-y-4">

      {/* ── Patient Info ─────────────────────────────────────────── */}
      <div className="aurum-card">
        <div className="section-label mb-3">Patient Information</div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label style={labelStyle}>Age</label>
            <input type="number" placeholder="42" value={form.age}
              onChange={e => update('age', e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Sex</label>
            <div className="flex gap-2">
              {['male', 'female', 'unknown'].map(s => (
                <button key={s} onClick={() => update('sex', s)}
                  className="flex-1 py-3 rounded-lg font-bold text-xs capitalize transition-all"
                  style={{
                    background: form.sex === s ? 'rgba(232,69,69,0.2)' : '#151d26',
                    color: form.sex === s ? '#e84545' : '#7a8a9a',
                    border: `1px solid ${form.sex === s ? 'rgba(232,69,69,0.4)' : '#1e2d3d'}`,
                  }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Chief Complaint (tile buttons) ───────────────────────── */}
      <div className="aurum-card">
        <div className="section-label mb-3">Chief Complaint</div>
        <div className="grid grid-cols-4 gap-2">
          {COMPLAINTS.map(({ label, emoji, value }) => (
            <button key={value} onClick={() => update('chief_complaint', value)}
              className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl font-semibold text-[10px] text-center transition-all"
              style={{
                background: form.chief_complaint === value ? 'rgba(232,69,69,0.2)' : '#151d26',
                color: form.chief_complaint === value ? '#e84545' : '#7a8a9a',
                border: `1px solid ${form.chief_complaint === value ? 'rgba(232,69,69,0.4)' : '#1e2d3d'}`,
              }}>
              <span style={{ fontSize: 22 }}>{emoji}</span>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Mechanism of Injury (tile buttons) ───────────────────── */}
      <div className="aurum-card">
        <div className="section-label mb-3">Mechanism of Injury</div>
        <div className="grid grid-cols-4 gap-2">
          {MECHANISMS.map(({ label, emoji, value }) => (
            <button key={value} onClick={() => update('mechanism_of_injury', value)}
              className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl font-semibold text-[10px] text-center transition-all"
              style={{
                background: form.mechanism_of_injury === value ? 'rgba(245,158,11,0.18)' : '#151d26',
                color: form.mechanism_of_injury === value ? '#f59e0b' : '#7a8a9a',
                border: `1px solid ${form.mechanism_of_injury === value ? 'rgba(245,158,11,0.4)' : '#1e2d3d'}`,
              }}>
              <span style={{ fontSize: 22 }}>{emoji}</span>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Vitals (optional) ───────────────────────────────────── */}
      <div className="aurum-card">
        <div className="flex items-center justify-between mb-3">
          <div className="section-label">Vitals <span className="text-[8px] font-normal ml-1" style={{ color: '#2a3d55' }}>(OPTIONAL — auto-filled if monitor connected)</span></div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-semibold"
            style={{ background: 'rgba(232,69,69,0.1)', color: '#e84545', border: '1px solid rgba(232,69,69,0.3)' }}>
            <Mic size={11} /> Voice Input
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { key: 'heart_rate',       label: 'Heart Rate (bpm)',  ph: '110' },
            { key: 'systolic_bp',      label: 'Systolic BP',       ph: '90'  },
            { key: 'diastolic_bp',     label: 'Diastolic BP',      ph: '65'  },
            { key: 'spo2',             label: 'SpO₂ (%)',          ph: '94'  },
            { key: 'respiratory_rate', label: 'Resp Rate /min',    ph: '22'  },
            { key: 'gcs_score',        label: 'GCS (3-15)',        ph: '11'  },
          ].map(({ key, label, ph }) => (
            <div key={key}>
              <label style={labelStyle}>{label}</label>
              <input type="number" placeholder={ph} value={form[key]}
                onChange={e => update(key, e.target.value)} style={inputStyle} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Get Routing Button ──────────────────────────────────── */}
      <button onClick={handleSubmit} disabled={isRunning}
        className="w-full py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all disabled:opacity-60"
        style={{ background: 'rgba(16,185,129,0.2)', color: '#10b981', border: '2px solid rgba(16,185,129,0.5)', fontSize: 18 }}>
        {isRunning
          ? <><Loader size={22} className="animate-spin" /> Running APEX…</>
          : <><ArrowRight size={22} /> GET ROUTING</>
        }
      </button>

      {/* ── APEX Result ─────────────────────────────────────────── */}
      {apexResult && !isRunning && (
        <div className="aurum-card border animate-slide-up" style={{ borderColor: 'rgba(16,185,129,0.4)' }}>
          <div className="flex items-center gap-2 mb-4">
            <span className="badge-apex">APEX Result</span>
            <SeverityBadge severity={apexResult.predicted_severity} pulse />
          </div>
          <div className="flex items-center gap-5 mb-4">
            <SurvivabilityScore score={apexResult.survivability_score} size={68} />
            <div>
              <div className="text-xs font-bold mb-1" style={{ color: '#4a5a6a' }}>NEXUS Recommendation</div>
                <div className="text-lg font-black" style={{ color: '#e8ecef' }}>{apexResult.target_hospital || hospitals.find(h => h.id === apexResult.hospital_id)?.name || 'KEM Hospital'}</div>
                <div className="text-[10px] mt-1" style={{ color: '#7a8a9a' }}>ETA 9 min · Specialist on duty</div>
              <div className="flex gap-1.5 mt-2">
                {apexResult.predicted_care_needs.icu        && <span className="text-[9px] px-2 py-0.5 rounded" style={{ background: 'rgba(139,92,246,0.15)', color: '#8b5cf6', border: '1px solid rgba(139,92,246,0.25)' }}>ICU</span>}
                {apexResult.predicted_care_needs.ventilator && <span className="text-[9px] px-2 py-0.5 rounded" style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4', border: '1px solid rgba(6,182,212,0.3)' }}>Ventilator</span>}
              </div>
            </div>
          </div>
          <button className="w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
            style={{ background: 'rgba(16,185,129,0.2)', color: '#10b981', border: '1px solid rgba(16,185,129,0.4)' }}>
            <CheckCircle size={18} /> Confirm — Go to Route View
          </button>
        </div>
      )}

      <div style={{ height: 24 }} />
    </div>
  );
}
