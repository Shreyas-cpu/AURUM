import React, { useState } from 'react';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useStore } from '../../hooks/useStore';
import { MOCK_HOURLY_INCIDENTS, MOCK_SEVERITY_DIST } from '../../data/mockData';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl px-3 py-2 text-xs" style={{ background: '#151d26', border: '1px solid #1e2d3d' }}>
      <div className="font-mono font-semibold text-aurum-text mb-1">{label}</div>
      {payload.map(p => (
        <div key={p.name} className="flex items-center gap-2">
          <span style={{ color: p.color }}>{p.name}:</span>
          <span className="font-bold text-aurum-text">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function HospitalAnalytics() {
  const hospitals = useStore(s => s.hospitals);
  const activeId  = useStore(s => s.activeHospitalId);
  const h         = hospitals.find(x => x.id === activeId);

  const stats = [
    { label: 'Patients Today',   value: '47',  delta: '+12%', up: false },
    { label: 'Avg Response ETA', value: '7.2m', delta: '-0.4m', up: true },
    { label: 'APEX Accuracy',    value: '94.1%', delta: '+1.2%', up: true },
    { label: 'NEXUS Reroutes',   value: '3',   delta: 'today', up: null },
  ];

  // Bed occupancy over time (mock)
  const bedOccupancy = MOCK_HOURLY_INCIDENTS.map(d => ({
    hour: d.hour,
    occupancy: Math.max(20, Math.min(99, (h?.current_load_pct || 70) + Math.round((Math.random() - 0.5) * 20))),
  }));

  const srsHistory = MOCK_HOURLY_INCIDENTS.map((d, i) => ({
    hour: d.hour,
    avg_srs: parseFloat((0.65 + Math.random() * 0.25).toFixed(2)),
  }));

  return (
    <div className="p-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-aurum-text">Analytics</h1>
        <p className="text-xs text-aurum-text-ter mt-0.5">HELIX post-incident analytics — powered by federated outcome data</p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map(({ label, value, delta, up }) => (
          <div key={label} className="aurum-card">
            <div className="section-label mb-2">{label}</div>
            <div className="text-3xl font-black font-mono text-aurum-text leading-none">{value}</div>
            <div className="text-xs mt-2" style={{ color: up === null ? '#7a8a9a' : up ? '#10b981' : '#e84545' }}>
              {up === null ? '─' : up ? '↑' : '↓'}{' '}{delta}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        {/* Incident Volume */}
        <div className="lg:col-span-2 aurum-card">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm font-semibold text-aurum-text">Incident Volume — 24h</div>
            <span className="badge-apex text-[10px]">HELIX Analytics</span>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_HOURLY_INCIDENTS} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="incidentGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#e84545" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#e84545" stopOpacity={0}    />
                  </linearGradient>
                  <linearGradient id="critGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}   />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e2d3d" vertical={false} />
                <XAxis dataKey="hour" tick={{ fill: '#4a5a6a', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#4a5a6a', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="count"    name="Total"    stroke="#e84545" strokeWidth={2} fill="url(#incidentGrad)" />
                <Area type="monotone" dataKey="critical" name="Critical" stroke="#8b5cf6" strokeWidth={2} fill="url(#critGrad)"    />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Severity Distribution */}
        <div className="aurum-card">
          <div className="text-sm font-semibold text-aurum-text mb-4">Severity Distribution</div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_SEVERITY_DIST} layout="vertical" margin={{ top: 0, right: 4, left: 0, bottom: 0 }}>
                <XAxis type="number" tick={{ fill: '#4a5a6a', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fill: '#7a8a9a', fontSize: 10 }} axisLine={false} tickLine={false} width={60} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
                <Bar dataKey="value" name="Patients" radius={[0, 3, 3, 0]}
                  fill="#e84545"
                  background={{ fill: '#1e2d3d', radius: 3 }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Bed Occupancy */}
        <div className="aurum-card">
          <div className="text-sm font-semibold text-aurum-text mb-4">Bed Occupancy — 24h</div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={bedOccupancy} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="bedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e2d3d" vertical={false} />
                <XAxis dataKey="hour" tick={{ fill: '#4a5a6a', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#4a5a6a', fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="occupancy" name="Occupancy %" stroke="#3b82f6" strokeWidth={2} fill="url(#bedGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Avg SRS over time */}
        <div className="aurum-card">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm font-semibold text-aurum-text">APEX Survivability Score — Avg</div>
            <span className="badge-apex text-[10px]">APEX</span>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={srsHistory} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e2d3d" vertical={false} />
                <XAxis dataKey="hour" tick={{ fill: '#4a5a6a', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#4a5a6a', fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 1]} tickFormatter={v => `${Math.round(v * 100)}%`} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="avg_srs" name="Avg SRS" stroke="#10b981" strokeWidth={2.5}
                  dot={false} activeDot={{ r: 4, fill: '#10b981', stroke: '#080c10' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
