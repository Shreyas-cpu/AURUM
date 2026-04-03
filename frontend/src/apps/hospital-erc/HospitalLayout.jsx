import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Settings2, ClipboardList, BarChart3,
  AlertTriangle, Bell, Power, ChevronRight, Activity
} from 'lucide-react';
import { useStore } from '../../hooks/useStore';
import { useHospitalStatusUpdates, useAmbulanceLocationBroadcast } from '../../hooks/useSocket';

const NAV_ITEMS = [
  { label: 'Overview',      path: '/app/hospital',              icon: LayoutDashboard  },
  { label: 'Resources',     path: '/app/hospital/resources',    icon: Settings2        },
  { label: 'Incident Log',  path: '/app/hospital/incidents',    icon: ClipboardList    },
  { label: 'Analytics',     path: '/app/hospital/analytics',    icon: BarChart3        },
  { label: 'MCE Mode',      path: '/app/hospital/mce',          icon: AlertTriangle    },
];

export default function HospitalLayout() {
  const navigate                 = useNavigate();
  const hospitals                = useStore(s => s.hospitals);
  const activeHospitalId         = useStore(s => s.activeHospitalId);
  const mceActive                = useStore(s => s.mceActive);
  const notifications            = useStore(s => s.notifications);
  const h                        = hospitals.find(x => x.id === activeHospitalId);
  const [notifOpen, setNotifOpen]= useState(false);

  // Simulate live backend updates
  useHospitalStatusUpdates(activeHospitalId);
  useAmbulanceLocationBroadcast();

  const incomingCount = useStore(s =>
    s.ambulances.filter(a => a.assigned_hospital_id === activeHospitalId && a.status === 'en_route_to_hospital').length
  );

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#080c10', color: '#e8ecef' }}>

      {/* ── Sidebar ────────────────────────────────────────────────── */}
      <aside className="w-60 flex flex-col shrink-0 border-r" style={{ background: '#0d1117', borderColor: '#1e2d3d' }}>

        {/* Logo */}
        <div className="h-16 flex items-center px-5 border-b shrink-0" style={{ borderColor: '#1e2d3d' }}>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: 'rgba(232,69,69,0.2)', border: '1px solid rgba(232,69,69,0.4)' }}>
              <Activity size={14} style={{ color: '#e84545' }} />
            </div>
            <div>
              <div className="text-sm font-black tracking-tight" style={{ color: '#e8ecef' }}>AURUM</div>
              <div className="text-[9px] font-semibold uppercase tracking-widest" style={{ color: '#4a5a6a' }}>Hospital ERC</div>
            </div>
          </div>
        </div>

        {/* Hospital Identity */}
        {h && (
          <div className="px-4 py-3 border-b mx-3 my-2 rounded-lg" style={{ background: '#151d26', borderColor: '#1e2d3d', border: '1px solid #1e2d3d' }}>
            <div className="text-xs font-bold text-aurum-text leading-tight mb-1 truncate">{h.name}</div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: '#1e2d3d' }}>
                <div className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${h.current_load_pct}%`, background: h.current_load_pct >= 90 ? '#e84545' : h.current_load_pct >= 70 ? '#f59e0b' : '#10b981' }} />
              </div>
              <span className="text-[10px] font-mono font-bold" style={{ color: h.current_load_pct >= 90 ? '#e84545' : '#f59e0b' }}>{h.current_load_pct}%</span>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
          <div className="section-label px-2 py-2">Navigation</div>
          {NAV_ITEMS.map(({ label, path, icon: Icon }) => (
            <NavLink key={path} to={path} end={path === '/app/hospital'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer group ${
                  isActive
                    ? 'text-red-400'
                    : 'hover:text-aurum-text'
                }`
              }
              style={({ isActive }) => isActive
                ? { background: 'rgba(232,69,69,0.1)', color: '#e84545', borderLeft: '2px solid #e84545', marginLeft: '-2px' }
                : { color: '#7a8a9a' }
              }
            >
              <Icon size={16} />
              <span>{label}</span>
              {label === 'MCE Mode' && mceActive && (
                <span className="ml-auto px-1.5 py-0.5 rounded text-[9px] font-bold uppercase" style={{ background: '#e84545', color: '#fff' }}>LIVE</span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Stats */}
        {h && (
          <div className="px-3 pb-4 space-y-1">
            <div className="section-label px-2 pb-1">Live Stats</div>
            {[
              { label: 'ICU Beds',    value: `${h.avail_icu_beds}/${h.total_icu_beds}`, color: h.avail_icu_beds <= 3 ? '#e84545' : '#10b981' },
              { label: 'Ventilators', value: h.avail_ventilators, color: h.avail_ventilators <= 3 ? '#e84545' : '#3b82f6' },
              { label: 'Incoming',    value: incomingCount, color: incomingCount > 0 ? '#f59e0b' : '#4a5a6a' },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex justify-between items-center px-2 py-1.5 rounded" style={{ background: '#151d26' }}>
                <span className="text-[11px] text-aurum-text-sec">{label}</span>
                <span className="text-xs font-mono font-bold" style={{ color }}>{value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Sign Out */}
        <div className="px-3 pb-4 border-t" style={{ borderColor: '#1e2d3d' }}>
          <button onClick={() => navigate('/login')}
            className="w-full flex items-center gap-2 px-3 py-2.5 mt-3 rounded-lg text-xs font-semibold transition-all"
            style={{ color: '#7a8a9a' }}
            onMouseEnter={e => e.currentTarget.style.color = '#e84545'}
            onMouseLeave={e => e.currentTarget.style.color = '#7a8a9a'}
          >
            <Power size={14} /> Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main Content ────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top Bar */}
        <header className="h-16 shrink-0 flex items-center justify-between px-6 border-b" style={{ background: '#0d1117', borderColor: '#1e2d3d' }}>
          <div className="flex items-center gap-3">
            <div className="text-sm font-semibold" style={{ color: '#e8ecef' }}>Hospital Emergency Response Centre</div>
            {mceActive && (
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase animate-pulse"
                style={{ background: 'rgba(232,69,69,0.2)', color: '#e84545', border: '1px solid rgba(232,69,69,0.4)' }}>
                <AlertTriangle size={12} /> MCE ACTIVE
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            {/* Live indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)' }}>
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              AURUM Grid Live
            </div>

            {/* Notifications */}
            <div className="relative">
              <button onClick={() => setNotifOpen(o => !o)}
                className="relative p-1.5 rounded-lg transition-colors"
                style={{ color: '#7a8a9a' }}
                onMouseEnter={e => e.currentTarget.style.color = '#e8ecef'}
                onMouseLeave={e => e.currentTarget.style.color = '#7a8a9a'}
              >
                <Bell size={18} />
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 w-2 h-2 rounded-full" style={{ background: '#e84545' }} />
                )}
              </button>
            </div>

            {/* Avatar */}
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ background: 'rgba(139,92,246,0.2)', color: '#8b5cf6', border: '1px solid rgba(139,92,246,0.3)' }}>
              ERC
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto" style={{ background: '#080c10' }}>
          <Outlet />
        </main>

      </div>
    </div>
  );
}
