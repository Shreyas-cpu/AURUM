import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Activity, AlertTriangle, Power, Wifi, WifiOff, AlertOctagon } from 'lucide-react';
import { useStore } from '../../hooks/useStore';
import { SEVERITY_MAP } from '../../data/mockData';
import { useAmbulanceLocationBroadcast } from '../../hooks/useSocket';

// ─── Login Screen ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [callSign, setCallSign] = useState('AMB-001');
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (pin.length !== 4) return;
    setLoading(true);
    setTimeout(() => { onLogin(callSign); setLoading(false); }, 800);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8 px-8"
      style={{ background: '#080c10', color: '#e8ecef' }}>
      {/* Logo */}
      <div className="flex flex-col items-center gap-3">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{ background: 'rgba(232,69,69,0.15)', border: '2px solid rgba(232,69,69,0.35)' }}>
          <Activity size={32} style={{ color: '#e84545' }} />
        </div>
        <div>
          <div className="text-3xl font-black text-center" style={{ color: '#e8ecef', letterSpacing: '-0.04em' }}>AURUM</div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-center mt-1" style={{ color: '#4a5a6a' }}>Ambulance Field Interface</div>
        </div>
      </div>

      {/* Form */}
      <div className="w-full max-w-sm space-y-4">
        <div>
          <label className="section-label mb-2 block">Ambulance Unit</label>
          <select value={callSign} onChange={e => setCallSign(e.target.value)}
            className="w-full px-4 py-3 rounded-xl font-mono font-bold text-base"
            style={{ background: '#151d26', border: '1px solid #1e2d3d', color: '#e8ecef', outline: 'none' }}>
            <option>AMB-001</option>
            <option>AMB-002</option>
            <option>AMB-003</option>
          </select>
        </div>

        <div>
          <label className="section-label mb-2 block">PIN</label>
          <input
            type="password" maxLength={4} placeholder="••••"
            value={pin} onChange={e => setPin(e.target.value.replace(/\D/g, ''))}
            className="w-full px-4 py-3 rounded-xl font-mono font-bold text-2xl text-center tracking-[0.5em]"
            style={{ background: '#151d26', border: `1px solid ${pin.length === 4 ? 'rgba(16,185,129,0.5)' : '#1e2d3d'}`, color: '#e8ecef', outline: 'none' }}
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={pin.length !== 4 || loading}
          className="w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all disabled:opacity-40"
          style={{ background: 'rgba(232,69,69,0.2)', color: '#e84545', border: '1px solid rgba(232,69,69,0.4)', fontSize: 16 }}>
          {loading ? 'Authenticating…' : '→ Enter System'}
        </button>
      </div>

      <div className="text-[9px] text-center" style={{ color: '#2a3d55' }}>Demo PIN: any 4 digits</div>
    </div>
  );
}

// ─── Layout Shell ─────────────────────────────────────────────────────────────
export default function AmbulanceLayout() {
  const navigate           = useNavigate();
  const patients           = useStore(s => s.patients);
  const activePatId        = useStore(s => s.activePatientId);
  const mceActive          = useStore(s => s.mceActive);
  const activePatient      = patients.find(p => p.id === activePatId);
  const [loggedIn, setLoggedIn] = useState(false);
  const callSign           = useStore(s => s.activeAmbulanceId);
  const setCallSign        = useStore(s => s.setActiveAmbulanceId);

  // Automatically broadcast this specific ambulance's location continuously once logged in!
  useAmbulanceLocationBroadcast(loggedIn ? callSign : null);

  const sev     = activePatient?.predicted_severity;
  const sevMeta = sev ? SEVERITY_MAP[sev] : null;

  const notifications = useStore(s => s.notifications);
  const dismissNotification = useStore(s => s.dismissNotification);
  
  // Find critical reroute notifications
  const rerouteNotification = notifications.find(n => n.type === 'critical' && n.title === 'ROUTE CHANGED');

  const RerouteModal = () => (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
      <div className="w-full max-w-md bg-[#1a0505] border-2 border-red-600 rounded-2xl shadow-[0_0_80px_rgba(220,38,38,0.4)] p-8 flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
        <div className="w-20 h-20 bg-red-600/20 rounded-full flex items-center justify-center animate-pulse mb-6">
          <AlertOctagon size={48} className="text-red-500" />
        </div>
        <h1 className="text-4xl font-black text-red-500 mb-2">ROUTE CHANGED</h1>
        <p className="text-lg text-red-200 font-semibold leading-relaxed mb-8">
          {rerouteNotification?.message || "New destination assigned."}
        </p>
        <button 
          onClick={() => dismissNotification(rerouteNotification.id)}
          className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-bold text-xl rounded-xl transition-all shadow-[0_0_20px_rgba(220,38,38,0.5)]"
        >
          ACKNOWLEDGE
        </button>
      </div>
    </div>
  );


  if (!loggedIn) {
    return <LoginScreen onLogin={(cs) => { setCallSign(cs.toLowerCase().replace('amb', 'amb')); setLoggedIn(true); }} />;
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden relative"
      style={{ background: '#080c10', color: '#e8ecef' }}>
      {rerouteNotification && <RerouteModal />}
      
      {/* ── Top Bar ─────────────────────────────────────────────── */}
      <header className="h-14 shrink-0 flex items-center justify-between px-4 border-b"
        style={{ background: '#0d1117', borderColor: '#1e2d3d' }}>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded flex items-center justify-center"
              style={{ background: 'rgba(232,69,69,0.2)', border: '1px solid rgba(232,69,69,0.4)' }}>
              <Activity size={12} style={{ color: '#e84545' }} />
            </div>
            <span className="text-sm font-black tracking-tight" style={{ color: '#e8ecef' }}>AURUM</span>
          </div>
          {activePatient && (
            <div className="flex items-center gap-2 pl-3 border-l" style={{ borderColor: '#1e2d3d' }}>
              <span className="text-[10px] font-mono" style={{ color: '#7a8a9a' }}>{activePatient.session_code}</span>
              {sevMeta && (
                <span className="text-[9px] font-bold px-2 py-0.5 rounded uppercase"
                  style={{ background: `${sevMeta.color}1A`, color: sevMeta.color }}>
                  {sevMeta.label}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          {mceActive && (
            <span className="text-[9px] font-bold px-2 py-1 rounded flex items-center gap-1 animate-pulse"
              style={{ background: 'rgba(232,69,69,0.2)', color: '#e84545', border: '1px solid rgba(232,69,69,0.4)' }}>
              <AlertTriangle size={10} /> MCE ACTIVE
            </span>
          )}
          <div className="flex items-center gap-1.5 text-[9px] font-mono px-2 py-1 rounded"
            style={{ background: '#151d26', color: '#10b981', border: '1px solid #1e2d3d' }}>
            <Wifi size={10} />
            {callSign}
          </div>
          <button onClick={() => setLoggedIn(false)} style={{ color: '#4a5a6a' }}
            onMouseEnter={e => e.currentTarget.style.color = '#e84545'}
            onMouseLeave={e => e.currentTarget.style.color = '#4a5a6a'}>
            <Power size={16} />
          </button>
        </div>
      </header>

      {/* ── Page Content ─────────────────────────────────────────── */}
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>

      {/* ── Bottom Tab Bar ──────────────────────────────────────── */}
      <nav className="h-16 shrink-0 flex border-t" style={{ background: '#0d1117', borderColor: '#1e2d3d' }}>
        {[
          { path: '/app/ambulance',          label: 'Navigate', emoji: '🗺️' },
          { path: '/app/ambulance/dispatch', label: 'Patient',  emoji: '🩺' },
          { path: '/app/ambulance/mce',      label: 'Grid MCE', emoji: '⚡' },
        ].map(({ path, label, emoji }) => {
          const isActive = window.location.pathname === path || (path !== '/app/ambulance' && window.location.pathname.startsWith(path));
          return (
            <button key={path} onClick={() => navigate(path)}
              className="flex-1 flex flex-col items-center justify-center gap-1 transition-colors"
              style={{
                color: isActive ? '#e84545' : '#4a5a6a',
                background: isActive ? 'rgba(232,69,69,0.08)' : 'transparent',
                borderTop: isActive ? '2px solid #e84545' : '2px solid transparent',
              }}>
              <span style={{ fontSize: 18 }}>{emoji}</span>
              <span className="text-[9px] font-semibold">{label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
