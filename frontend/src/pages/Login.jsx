import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, ArrowRight, Building2, Ambulance, Monitor } from 'lucide-react';

const ROLES = [
  {
    id: 'hospital',
    label: 'Hospital ERC',
    icon: Building2,
    desc: 'Emergency Response Centre staff. Manage incoming patients, resources, and acceptances.',
    route: '/app/hospital',
    color: '#e84545',
    bg: 'rgba(232,69,69,0.08)',
    border: 'rgba(232,69,69,0.25)',
  },
  {
    id: 'ambulance',
    label: 'Ambulance Driver',
    icon: Ambulance,
    desc: 'EMT / driver interface. View optimal hospital routing, patient vitals, and ETA.',
    route: '/app/ambulance',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.25)',
  },
  {
    id: 'monitor',
    label: 'Patient Monitor',
    icon: Monitor,
    desc: 'Embedded device interface. Auto-streams vitals and displays hospital match in real time.',
    route: '/app/monitor',
    color: '#10b981',
    bg: 'rgba(16,185,129,0.08)',
    border: 'rgba(16,185,129,0.25)',
  },
];

export default function Login() {
  const navigate      = useNavigate();
  const [selected, setSelected] = useState(null);
  const [loading, setLoading]   = useState(false);

  const handleLogin = () => {
    if (!selected) return;
    setLoading(true);
    setTimeout(() => navigate(selected.route), 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#080c10' }}>
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
            style={{ background: 'rgba(232,69,69,0.15)', border: '1px solid rgba(232,69,69,0.3)' }}>
            <Activity size={24} style={{ color: '#e84545' }} />
          </div>
          <div className="text-3xl font-black tracking-tight" style={{ color: '#e8ecef' }}>AURUM</div>
          <div className="text-xs font-semibold uppercase tracking-widest mt-1" style={{ color: '#4a5a6a' }}>
            Emergency Triage Intelligence
          </div>
        </div>

        {/* Role Selector */}
        <div className="mb-4">
          <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#4a5a6a' }}>Select Your Role</div>
          <div className="space-y-2.5">
            {ROLES.map(role => {
              const Icon    = role.icon;
              const isActive= selected?.id === role.id;
              return (
                <button key={role.id} onClick={() => setSelected(role)}
                  className="w-full text-left rounded-xl p-4 transition-all duration-150"
                  style={{
                    background: isActive ? role.bg : '#0f151c',
                    border: `1px solid ${isActive ? role.border : '#1e2d3d'}`,
                    transform: isActive ? 'scale(1.01)' : 'scale(1)',
                  }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{
                      background: isActive ? role.bg : '#151d26',
                      border: `1px solid ${isActive ? role.border : '#1e2d3d'}`,
                    }}>
                      <Icon size={18} style={{ color: isActive ? role.color : '#7a8a9a' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold" style={{ color: isActive ? role.color : '#e8ecef' }}>{role.label}</div>
                      <div className="text-xs mt-0.5 leading-relaxed" style={{ color: '#7a8a9a' }}>{role.desc}</div>
                    </div>
                    <div className="w-4 h-4 rounded-full border-2 shrink-0" style={{
                      borderColor: isActive ? role.color : '#2a3d55',
                      background:  isActive ? role.color : 'transparent',
                    }} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Auth Fields (simplified for demo) */}
        <div className="space-y-3 mb-4">
          <input type="text" placeholder="Staff ID / Unit ID"
            defaultValue="ERC-STAFF-001"
            className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors"
            style={{ background: '#0f151c', border: '1px solid #1e2d3d', color: '#e8ecef' }}
            onFocus={e => e.target.style.borderColor = '#e84545'}
            onBlur={e  => e.target.style.borderColor = '#1e2d3d'}
          />
          <input type="password" placeholder="Access Code"
            defaultValue="••••••••"
            className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors"
            style={{ background: '#0f151c', border: '1px solid #1e2d3d', color: '#e8ecef' }}
            onFocus={e => e.target.style.borderColor = '#e84545'}
            onBlur={e  => e.target.style.borderColor = '#1e2d3d'}
          />
        </div>

        {/* Submit */}
        <button onClick={handleLogin} disabled={!selected || loading}
          className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-40"
          style={{
            background: selected ? selected.color : '#1e2d3d',
            color: '#fff',
            boxShadow: selected && !loading ? `0 0 20px ${selected.color}50` : 'none',
          }}>
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Authenticating…
            </span>
          ) : (
            <>Access {selected?.label || 'AURUM'} <ArrowRight size={16} /></>
          )}
        </button>

        <p className="text-center text-[10px] mt-4" style={{ color: '#4a5a6a' }}>
          AURUM v1.0 · HC03 Hackathon Demo · Mumbai Emergency Services
        </p>
      </div>
    </div>
  );
}
