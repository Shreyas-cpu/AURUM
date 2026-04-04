import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../../hooks/useStore';
import { useVitalsStream } from '../../hooks/useSocket';
import { SEVERITY_MAP } from '../../data/mockData';

// ─── Animated ECG Waveform ────────────────────────────────────────────────────
function EcgWave({ color = '#10b981', width = 160, height = 36 }) {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setOffset(o => (o + 2) % 200), 30);
    return () => clearInterval(id);
  }, []);
  const path = `M0,18 L20,18 L28,8 L34,28 L38,2 L44,32 L48,18 L80,18 L88,8 L94,28 L98,2 L104,32 L108,18 L140,18 L148,8 L154,28 L158,2 L164,32 L168,18 L200,18`;
  return (
    <svg width={width} height={height} style={{ overflow: 'hidden' }}>
      <defs>
        <clipPath id={`clip-${color.replace('#', '')}`}>
          <rect x={0} y={0} width={width} height={height} />
        </clipPath>
      </defs>
      <g clipPath={`url(#clip-${color.replace('#', '')})`}>
        <path d={path} fill="none" stroke={color} strokeWidth="1.5" opacity="0.7" transform={`translate(${-offset}, 0)`} />
        <path d={path} fill="none" stroke={color} strokeWidth="1.5" opacity="0.7" transform={`translate(${200 - offset}, 0)`} />
      </g>
    </svg>
  );
}

// ─── SpO2 Ring Gauge ──────────────────────────────────────────────────────────
function SpO2Gauge({ value }) {
  const pct  = Math.max(0, Math.min(100, value));
  const color= pct >= 95 ? '#10b981' : pct >= 90 ? '#f59e0b' : '#e84545';
  const r    = 36;
  const circ = 2 * Math.PI * r;
  const off  = circ - (pct / 100) * circ;
  return (
    <div className="relative flex items-center justify-center" style={{ width: 88, height: 88 }}>
      <svg width={88} height={88} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={44} cy={44} r={r} fill="none" stroke="#1e2d3d" strokeWidth={6} />
        <circle cx={44} cy={44} r={r} fill="none" stroke={color} strokeWidth={6}
          strokeDasharray={circ} strokeDashoffset={off} strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 6px ${color}80)`, transition: 'stroke-dashoffset 0.6s ease' }} />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-mono font-black text-lg leading-none" style={{ color }}>{pct}</span>
        <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: '#4a5a6a' }}>%</span>
      </div>
    </div>
  );
}

// ─── Status Ticker ────────────────────────────────────────────────────────────
const STATUS_STEPS = [
  'Vitals acquired — transmitting to AURUM…',
  'APEX inference running…',
  'Severity: CRITICAL — care needs identified',
  'NEXUS optimizing hospital selection…',
  'Hospital KEM notified ✓',
  'Pre-arrival brief sent — team on standby ✓',
];

function StatusTicker() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (step >= STATUS_STEPS.length - 1) return;
    const id = setTimeout(() => setStep(s => s + 1), 2200);
    return () => clearTimeout(id);
  }, [step]);
  const done = step >= STATUS_STEPS.length - 1;
  return (
    <div className="flex items-start gap-2 px-4 py-3 rounded-lg"
      style={{ background: done ? 'rgba(16,185,129,0.08)' : 'rgba(139,92,246,0.08)', border: `1px solid ${done ? 'rgba(16,185,129,0.25)' : 'rgba(139,92,246,0.2)'}` }}>
      <div className="relative flex h-2 w-2 mt-0.5 shrink-0">
        <span className={`${done ? '' : 'animate-ping'} absolute inline-flex h-full w-full rounded-full opacity-75`} style={{ background: done ? '#10b981' : '#8b5cf6' }} />
        <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: done ? '#10b981' : '#8b5cf6' }} />
      </div>
      <span className="text-xs font-medium leading-relaxed" style={{ color: done ? '#10b981' : '#c4b5fd' }}>
        {STATUS_STEPS[step]}
      </span>
    </div>
  );
}

// ─── Setup Screen ─────────────────────────────────────────────────────────────
function SetupScreen({ onConnect }) {
  const [mode, setMode] = useState(null); // 'connect' | 'new'
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConnect = () => {
    setLoading(true);
    setTimeout(() => { onConnect(); setLoading(false); }, 1000);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center gap-8 px-10"
      style={{ background: '#000000', color: '#e8ecef' }}>
      {/* Header */}
      <div className="text-center">
        <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: '#4a5a6a' }}>AURUM Patient Monitor</div>
        <div className="text-2xl font-black" style={{ color: '#e8ecef', letterSpacing: '-0.04em' }}>Device Setup</div>
        <div className="relative flex h-2 w-2 mx-auto mt-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#e84545' }} />
          <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#e84545' }} />
        </div>
      </div>

      {/* Mode selection */}
      {!mode && (
        <div className="flex gap-4 w-full max-w-md">
          <button onClick={() => setMode('connect')}
            className="flex-1 flex flex-col items-center gap-3 py-8 rounded-2xl font-bold transition-all"
            style={{ background: 'rgba(232,69,69,0.1)', color: '#e84545', border: '2px solid rgba(232,69,69,0.4)' }}>
            <span style={{ fontSize: 36 }}>🔗</span>
            <div>Connect to Session</div>
            <div className="text-[10px] font-normal" style={{ color: '#7a8a9a' }}>Enter patient session code</div>
          </button>
          <button onClick={() => { setMode('new'); setTimeout(onConnect, 800); }}
            className="flex-1 flex flex-col items-center gap-3 py-8 rounded-2xl font-bold transition-all"
            style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '2px solid rgba(16,185,129,0.4)' }}>
            <span style={{ fontSize: 36 }}>➕</span>
            <div>Start New Session</div>
            <div className="text-[10px] font-normal" style={{ color: '#7a8a9a' }}>Auto-generate session ID</div>
          </button>
        </div>
      )}

      {/* Connect to existing session */}
      {mode === 'connect' && (
        <div className="w-full max-w-sm space-y-4">
          <div>
            <label className="section-label mb-2 block">Patient Session Code</label>
            <input
              type="text" placeholder="P-20241031-001"
              value={code} onChange={e => setCode(e.target.value.toUpperCase())}
              className="w-full px-4 py-3 rounded-xl font-mono font-bold text-base text-center"
              style={{ background: '#0d1117', border: `1px solid ${code.length > 3 ? 'rgba(16,185,129,0.5)' : '#1e2d3d'}`, color: '#e8ecef', outline: 'none', letterSpacing: '0.1em' }}
            />
          </div>
          <button onClick={handleConnect} disabled={!code || loading}
            className="w-full py-4 rounded-xl font-bold text-base transition-all disabled:opacity-40"
            style={{ background: 'rgba(16,185,129,0.2)', color: '#10b981', border: '1px solid rgba(16,185,129,0.4)' }}>
            {loading ? 'Connecting…' : '→ Connect'}
          </button>
          <button onClick={() => setMode(null)} className="w-full text-center text-[10px]" style={{ color: '#4a5a6a' }}>← Back</button>
        </div>
      )}

      <div className="text-[9px] text-center" style={{ color: '#1e2d3d' }}>
        AURUM Patient Monitor v1.0 · Vitals streaming every 15s
      </div>
    </div>
  );
}

// ─── Main Monitor Display ─────────────────────────────────────────────────────
export default function PatientMonitor() {
  const patients   = useStore(s => s.patients);
  const hospitals  = useStore(s => s.hospitals);
  const activePatId = useStore(s => s.activePatientId);
  const vitalsHist = useStore(s => s.vitalsHistory);
  const [sessionActive, setSessionActive] = useState(false);

  useEffect(() => {
    if (activePatId) {
      setSessionActive(true);
    }
  }, [activePatId]);
  const [lastSync, setLastSync] = useState(new Date());

  // Start live vitals stream once session is active
  useVitalsStream(sessionActive ? activePatId : null, 3000);

  useEffect(() => {
    if (sessionActive) {
      const id = setInterval(() => setLastSync(new Date()), 15000);
      return () => clearInterval(id);
    }
  }, [sessionActive]);

  if (!sessionActive) {
    return <SetupScreen onConnect={() => setSessionActive(true)} />;
  }

  const patient = patients.find(p => p.id === activePatId);
  const hospital = hospitals.find(h => h.id === patient?.assigned_hospital_id);
  if (!patient) return null;

  const srs    = patient.survivability_score;
  const srsClr = srs >= 0.75 ? '#10b981' : srs >= 0.5 ? '#f59e0b' : '#e84545';
  const sevMeta = SEVERITY_MAP[patient.predicted_severity] || SEVERITY_MAP[2];

  return (
    <div className="flex h-full overflow-hidden" style={{ background: '#000000', color: '#e8ecef', fontFamily: 'Inter, sans-serif' }}>

      {/* ── LEFT: Vital Signs ──────────────────────────────────────── */}
      <div className="flex flex-col w-1/2 border-r p-5 gap-3" style={{ borderColor: '#0f1f2e' }}>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: '#4a5a6a' }}>AURUM Patient Monitor</span>
            </div>
            <div className="font-mono text-base font-black mt-0.5" style={{ color: '#e8ecef' }}>{patient.session_code}</div>
          </div>
          <div className="text-right">
            <div className="text-[9px] font-mono" style={{ color: '#4a5a6a' }}>AMB-001</div>
            <div className="text-[8px] font-mono mt-0.5" style={{ color: '#2a3d55' }}>Last sync: {lastSync.toLocaleTimeString()}</div>
          </div>
        </div>

        {/* HR */}
        <div className="rounded-2xl p-4" style={{ background: '#040a0d', border: '1px solid #0d1f2e' }}>
          <div className="flex items-start justify-between mb-1">
            <div className="vital-label" style={{ color: '#10b981', fontSize: 9 }}>HEART RATE</div>
            <span className="text-[9px] font-mono" style={{ color: '#4a5a6a' }}>bpm</span>
          </div>
          <div className="flex items-end gap-3">
            <span className="font-mono font-black tabular-nums leading-none"
              style={{ fontSize: 58, color: patient.heart_rate > 120 ? '#e84545' : '#10b981', textShadow: `0 0 20px ${patient.heart_rate > 120 ? '#e8454560' : '#10b98160'}` }}>
              {patient.heart_rate}
            </span>
            <div className="pb-1 flex-1">
              <EcgWave color={patient.heart_rate > 120 ? '#e84545' : '#10b981'} width={150} height={32} />
            </div>
          </div>
        </div>

        {/* BP */}
        <div className="rounded-2xl p-4" style={{ background: '#040a0d', border: '1px solid #0d1f2e' }}>
          <div className="flex items-center justify-between mb-1">
            <div className="vital-label" style={{ color: '#3b82f6', fontSize: 9 }}>BLOOD PRESSURE</div>
            <span className="text-[9px] font-mono" style={{ color: '#4a5a6a' }}>mmHg</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-mono font-black tabular-nums"
              style={{ fontSize: 44, color: patient.systolic_bp < 90 ? '#e84545' : '#3b82f6', textShadow: `0 0 16px ${patient.systolic_bp < 90 ? '#e8454550' : '#3b82f650'}` }}>
              {patient.systolic_bp}
            </span>
            <span className="font-mono font-bold text-xl" style={{ color: '#4a5a6a' }}>/</span>
            <span className="font-mono font-bold tabular-nums" style={{ fontSize: 32, color: '#3b82f680' }}>{patient.diastolic_bp}</span>
          </div>
          <div className="text-[10px] mt-1 font-medium" style={{ color: patient.systolic_bp < 90 ? '#e84545' : '#7a8a9a' }}>
            {patient.systolic_bp < 90 ? '⚠ Hypotensive — critical' : 'Normal range'}
          </div>
        </div>

        {/* SpO2 + Secondary vitals */}
        <div className="grid grid-cols-2 gap-3 flex-1">
          <div className="rounded-2xl p-3 flex flex-col items-center justify-center" style={{ background: '#040a0d', border: '1px solid #0d1f2e' }}>
            <div className="vital-label mb-2" style={{ color: '#f59e0b', fontSize: 9 }}>SpO₂</div>
            <SpO2Gauge value={patient.spo2} />
          </div>
          <div className="space-y-2">
            {[
              { label: 'RESP',  value: patient.respiratory_rate, unit: '/min', color: '#8b5cf6', danger: patient.respiratory_rate > 25 },
              { label: 'GCS',   value: patient.gcs_score,        unit: '/15',  color: '#06b6d4', danger: patient.gcs_score < 12 },
              { label: 'TEMP',  value: patient.temperature,      unit: '°C',   color: '#f59e0b', danger: patient.temperature > 38.5 },
            ].map(({ label, value, unit, color, danger }) => (
              <div key={label} className="rounded-xl px-3 py-2.5" style={{ background: '#040a0d', border: `1px solid ${danger ? color + '4D' : '#0d1f2e'}` }}>
                <div className="vital-label text-[8px]" style={{ color: '#4a5a6a' }}>{label}</div>
                <div className="font-mono font-bold text-2xl leading-none mt-0.5" style={{ color: danger ? '#e84545' : color }}>
                  {value}<span className="text-xs font-normal" style={{ color: '#4a5a6a' }}>{unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT: APEX + Status ───────────────────────────────────── */}
      <div className="w-1/2 flex flex-col p-5 gap-3" style={{ background: '#020608' }}>

        {/* APEX Header */}
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: '#4a5a6a' }}>APEX Intelligence Output</span>
          <span className="text-[9px] font-mono" style={{ color: '#8b5cf6' }}>XGBoost v2.1 · SHAP</span>
        </div>

        {/* Severity */}
        <div className="rounded-2xl p-4 text-center" style={{ background: `${sevMeta.color}12`, border: `1px solid ${sevMeta.color}33` }}>
          <div className="section-label mb-2" style={{ fontSize: 9 }}>Predicted Severity</div>
          <div className="text-4xl font-black uppercase leading-none mb-1" style={{ color: sevMeta.color, textShadow: `0 0 30px ${sevMeta.color}80` }}>
            {sevMeta.label}
          </div>
          <div className="text-[10px]" style={{ color: sevMeta.color + '99' }}>Level {patient.predicted_severity} of 5</div>
        </div>

        {/* Care Needs */}
        <div className="rounded-2xl p-4" style={{ background: '#040a0d', border: '1px solid #0d1f2e' }}>
          <div className="section-label mb-2" style={{ fontSize: 9 }}>Predicted Care Requirements</div>
          <div className="flex flex-wrap gap-1.5">
            {patient.predicted_care_needs?.icu        && <span className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-bold" style={{ background: 'rgba(139,92,246,0.15)', color: '#8b5cf6', border: '1px solid rgba(139,92,246,0.3)' }}>🛏 ICU Bed</span>}
            {patient.predicted_care_needs?.ventilator && <span className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-bold" style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4', border: '1px solid rgba(6,182,212,0.3)' }}>💨 Ventilator</span>}
            {patient.predicted_care_needs?.specialist && <span className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-bold" style={{ background: 'rgba(232,69,69,0.12)', color: '#e84545', border: '1px solid rgba(232,69,69,0.25)' }}>🩺 {patient.predicted_care_needs.specialist.replace('_', ' ')}</span>}
          </div>
        </div>

        {/* SRS + Hospital */}
        <div className="rounded-2xl p-4" style={{ background: '#040a0d', border: `1px solid ${srsClr}30` }}>
          <div className="section-label mb-2" style={{ fontSize: 9 }}>Survivability-by-Routing Score</div>
          <div className="flex items-center gap-4">
            <div className="font-mono font-black" style={{ fontSize: 52, color: srsClr, textShadow: `0 0 24px ${srsClr}80`, lineHeight: 1 }}>
              {Math.round(srs * 100)}%
            </div>
            <div>
              <div className="text-sm font-bold" style={{ color: '#e8ecef' }}>{hospital?.name || 'KEM Hospital'}</div>
              <div className="text-[10px] mt-1 flex items-center gap-1" style={{ color: '#7a8a9a' }}>
                ETA: <span className="font-mono font-bold" style={{ color: '#e8ecef' }}>9m</span>
              </div>
              <div className="text-[10px] mt-1" style={{ color: srsClr }}>
                {srs >= 0.75 ? '✓ Favorable outcome predicted' : srs >= 0.5 ? '⚠ Guarded prognosis' : '⚡ Critical — immediate intervention'}
              </div>
            </div>
          </div>
        </div>

        {/* Status Ticker */}
        <div>
          <div className="section-label mb-2" style={{ fontSize: 9 }}>AURUM System Status</div>
          <StatusTicker />
        </div>

        {/* Device Status */}
        <div className="mt-auto rounded-xl p-3 flex items-center justify-between" style={{ background: '#040a0d', border: '1px solid #0d1f2e' }}>
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#10b981' }} />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: '#10b981' }} />
            </span>
            <span className="text-[9px] font-semibold" style={{ color: '#10b981' }}>CONNECTED to AURUM</span>
          </div>
          <button onClick={() => setSessionActive(false)} className="text-[9px] px-2 py-1 rounded" style={{ background: '#151d26', color: '#4a5a6a', border: '1px solid #1e2d3d' }}>
            Change Session
          </button>
        </div>

        {/* Footer */}
        <div className="text-[8px] font-mono text-center" style={{ color: '#1e2d3d' }}>
          AURUM Monitor v1.0 · Vitals streaming every 15s · POST /patients/{patient.id}/vitals
        </div>
      </div>
    </div>
  );
}

