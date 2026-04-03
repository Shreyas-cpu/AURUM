import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Ambulance, Monitor, ChevronRight, Zap, Shield } from 'lucide-react';

function PulsingDot({ color = '#10b981' }) {
  return (
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: color }} />
      <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: color }} />
    </span>
  );
}

const INTERFACES = [
  {
    id: 'hospital',
    icon: Activity,
    label: 'Hospital ERC',
    sublabel: 'Emergency Response Centre',
    description: 'Full-screen command dashboard — manage hospital resources, track incoming ambulances in real time, and act on NEXUS routing decisions.',
    features: ['Live ambulance tracking', 'ICU / bed management', 'SHAP explainability', 'MCE batch mode'],
    path: '/app/hospital',
    accentColor: '#e84545',
    glowClass: 'shadow-glow-red',
    device: 'Desktop 1920×1080',
  },
  {
    id: 'ambulance',
    icon: Ambulance,
    label: 'Ambulance Driver',
    sublabel: 'Field Navigation App',
    description: 'Tablet-first interface for drivers and EMTs — patient intake, APEX severity prediction, NEXUS optimal routing, and live turn-by-turn navigation.',
    features: ['Fast patient intake', 'APEX + NEXUS routing', 'Live ETA countdown', 'Rerouting alerts'],
    path: '/app/ambulance',
    accentColor: '#f59e0b',
    glowClass: 'shadow-glow-amber',
    device: 'Tablet / Mobile',
  },
  {
    id: 'monitor',
    icon: Monitor,
    label: 'Patient Monitor',
    sublabel: 'Embedded Device Display',
    description: 'Medical-device-style screen that streams live vitals to AURUM, triggers APEX inference on critical changes, and displays routing results.',
    features: ['Real-time vital signs', 'Auto vitals push (15s)', 'Critical threshold alerts', 'ECG waveform display'],
    path: '/app/monitor',
    accentColor: '#06b6d4',
    glowClass: 'shadow-glow-cyan',
    device: '800×480 Touchscreen',
  },
];

export default function Landing() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: '#060a0e', color: '#e8ecef', fontFamily: 'Inter, sans-serif' }}
    >
      {/* ── Top Header ─────────────────────────────────────────────── */}
      <header className="px-8 py-5 flex items-center justify-between border-b" style={{ borderColor: '#1e2d3d', background: '#080c10' }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(232,69,69,0.15)', border: '1px solid rgba(232,69,69,0.35)' }}>
            <Activity size={18} style={{ color: '#e84545' }} />
          </div>
          <div>
            <div className="text-lg font-black tracking-tight" style={{ color: '#e8ecef', letterSpacing: '-0.02em' }}>AURUM</div>
            <div className="text-[9px] font-bold uppercase tracking-widest" style={{ color: '#4a5a6a' }}>Adaptive Unified Routing for Urgent Medicine</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Hackathon badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider" style={{ background: 'rgba(139,92,246,0.1)', color: '#8b5cf6', border: '1px solid rgba(139,92,246,0.25)' }}>
            <Zap size={10} />
            IGNISIA · HC03 · Healthcare Track
          </div>
          {/* Live indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: 'rgba(16,185,129,0.08)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)' }}>
            <PulsingDot />
            System Live
          </div>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <div className="flex flex-col items-center text-center pt-16 pb-12 px-6">
        {/* Glow backdrop */}
        <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[600px] h-48 rounded-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(ellipse, #e84545 0%, transparent 70%)', filter: 'blur(40px)' }} />

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6" style={{ background: 'rgba(232,69,69,0.1)', color: '#e84545', border: '1px solid rgba(232,69,69,0.25)' }}>
          <Shield size={10} />
          Golden Hour Emergency Triage &amp; Constraint-Based Hospital Routing
        </div>

        <h1 className="text-5xl md:text-6xl font-black leading-tight mb-4" style={{ letterSpacing: '-0.03em' }}>
          Select Your{' '}
          <span style={{ background: 'linear-gradient(135deg, #e84545, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Interface
          </span>
        </h1>
        <p className="text-base max-w-xl leading-relaxed" style={{ color: '#7a8a9a' }}>
          AURUM operates three simultaneous interfaces sharing one real-time backend.
          Choose your role to enter the system.
        </p>
      </div>

      {/* ── Interface Cards ────────────────────────────────────────── */}
      <div className="flex-1 flex items-start justify-center px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
          {INTERFACES.map(({ id, icon: Icon, label, sublabel, description, features, path, accentColor, device }) => (
            <button
              key={id}
              onClick={() => navigate(path)}
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
              className="text-left rounded-2xl flex flex-col overflow-hidden transition-all duration-300 group"
              style={{
                background: hovered === id ? '#0f151c' : '#0a0f15',
                border: `1px solid ${hovered === id ? accentColor + '50' : '#1e2d3d'}`,
                transform: hovered === id ? 'translateY(-4px)' : 'translateY(0)',
                boxShadow: hovered === id ? `0 12px 40px ${accentColor}25, 0 0 0 1px ${accentColor}20` : '0 2px 8px rgba(0,0,0,0.4)',
              }}
            >
              {/* Card header */}
              <div className="p-6 border-b" style={{ borderColor: '#1e2d3d' }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300" style={{ background: `${accentColor}18`, border: `1px solid ${accentColor}35` }}>
                    <Icon size={22} style={{ color: accentColor }} />
                  </div>
                  <div className="text-[9px] px-2.5 py-1 rounded-full font-semibold uppercase tracking-wider" style={{ background: '#151d26', color: '#4a5a6a', border: '1px solid #1e2d3d' }}>
                    {device}
                  </div>
                </div>

                <div className="text-xl font-black" style={{ color: '#e8ecef', letterSpacing: '-0.02em' }}>{label}</div>
                <div className="text-xs font-semibold mt-0.5" style={{ color: accentColor }}>{sublabel}</div>
                <p className="text-sm mt-3 leading-relaxed" style={{ color: '#7a8a9a' }}>{description}</p>
              </div>

              {/* Features */}
              <div className="p-6 flex-1">
                <div className="text-[9px] font-bold uppercase tracking-widest mb-3" style={{ color: '#4a5a6a' }}>Key Capabilities</div>
                <ul className="space-y-2">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs font-medium" style={{ color: '#7a8a9a' }}>
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: accentColor }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Enter button */}
              <div className="px-6 pb-6">
                <div
                  className="w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200"
                  style={{
                    background: hovered === id ? `${accentColor}25` : `${accentColor}12`,
                    color: accentColor,
                    border: `1px solid ${accentColor}${hovered === id ? '60' : '30'}`,
                  }}
                >
                  Enter {label}
                  <ChevronRight size={15} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── System Stats Footer ────────────────────────────────────── */}
      <footer className="border-t px-8 py-4 flex items-center justify-between" style={{ borderColor: '#1e2d3d', background: '#080c10' }}>
        <div className="flex items-center gap-6">
          {[
            { label: 'APEX Engine', value: 'XGBoost v2.1', color: '#8b5cf6' },
            { label: 'NEXUS Router', value: 'ILP Optimizer', color: '#06b6d4' },
            { label: 'Hospitals in Grid', value: '10 Seeded', color: '#10b981' },
            { label: 'Region', value: 'Mumbai Metro', color: '#f59e0b' },
          ].map(({ label, value, color }) => (
            <div key={label} className="flex items-center gap-2">
              <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: '#4a5a6a' }}>{label}:</span>
              <span className="text-[10px] font-mono font-semibold" style={{ color }}>{value}</span>
            </div>
          ))}
        </div>
        <div className="text-[9px] font-semibold uppercase tracking-widest" style={{ color: '#2a3d55' }}>
          AURUM v1.0 · Hackathon Build · IGNISIA 2024
        </div>
      </footer>
    </div>
  );
}
