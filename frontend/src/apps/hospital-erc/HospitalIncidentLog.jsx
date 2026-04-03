import React, { useState } from 'react';
import { ArrowUpDown, Filter, Download, ChevronRight } from 'lucide-react';
import { useStore } from '../../hooks/useStore';
import { SEVERITY_MAP, SPECIALIST_LABELS } from '../../data/mockData';
import SeverityBadge from '../../components/shared/SeverityBadge';

// Expanded mock log with 12 entries
const generateLog = () => {
  const events = [
    { id:'re-001', session:'P-20241031-001', severity:4, complaint:'Polytrauma — RTA ejection', hospital:'KEM Hospital', transit_min:9,  survivability_score:0.71, shap_top:'GCS Score', apex_reason:'trauma_surgeon on duty + Level 1 centre', override:false, time: '17:22' },
    { id:'re-002', session:'P-20241031-002', severity:3, complaint:'Suspected STEMI — chest pain', hospital:'Lilavati Hospital', transit_min:14, survivability_score:0.83, shap_top:'Systolic BP', apex_reason:'Cath lab available + interventional cardiologist', override:false, time: '17:18' },
    { id:'re-003', session:'P-20241031-003', severity:2, complaint:'Fall from height — orthopaedic', hospital:'Fortis Mulund', transit_min:11, survivability_score:0.90, shap_top:'Mechanism', apex_reason:'Closest facility with orthopaedic coverage', override:false, time: '16:55' },
    { id:'re-004', session:'P-20241030-028', severity:4, complaint:'Intracranial haemorrhage — GCS 8', hospital:'KEM Hospital', transit_min:7,  survivability_score:0.54, shap_top:'GCS Score', apex_reason:'Neurosurgery + ICU — only viable option', override:true,  time: '16:31' },
    { id:'re-005', session:'P-20241030-027', severity:1, complaint:'Laceration — finger amputation', hospital:'Wockhardt Central', transit_min:5,  survivability_score:0.97, shap_top:'Heart Rate', apex_reason:'Minor injury — nearest available facility', override:false, time: '15:47' },
    { id:'re-006', session:'P-20241030-026', severity:3, complaint:'Acute pulmonary oedema', hospital:'Hinduja Hospital', transit_min:12, survivability_score:0.78, shap_top:'SpO₂',   apex_reason:'ICU bed + intensivist on duty',            override:false, time: '15:22' },
    { id:'re-007', session:'P-20241030-025', severity:5, complaint:'Cardiac arrest — CPR in progress', hospital:'KEM Hospital', transit_min:8,  survivability_score:0.31, shap_top:'GCS Score', apex_reason:'Full resus bay + trauma surgeon STAT', override:false, time: '14:58' },
    { id:'re-008', session:'P-20241030-024', severity:2, complaint:'Diabetic emergency — hypoglycaemia', hospital:'Nanavati Max', transit_min:9,  survivability_score:0.93, shap_top:'Age', apex_reason:'General ward available — no specialist needed', override:false, time: '14:30' },
  ];
  return events;
};

export default function HospitalIncidentLog() {
  const [sortField, setSortField] = useState('time');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const log = generateLog();

  const filtered = log.filter(e => filterSeverity === 'all' || e.severity === parseInt(filterSeverity));

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-aurum-text">Incident Log</h1>
          <p className="text-xs text-aurum-text-ter mt-0.5">All routing events with SHAP explanations — <span className="font-mono">GET /route/events</span></p>
        </div>
        <div className="flex items-center gap-3">
          {/* Filter */}
          <select
            value={filterSeverity}
            onChange={e => setFilterSeverity(e.target.value)}
            className="text-xs px-3 py-2 rounded-lg outline-none cursor-pointer"
            style={{ background: '#151d26', border: '1px solid #1e2d3d', color: '#e8ecef' }}>
            <option value="all">All Severities</option>
            <option value="5">Immediate</option>
            <option value="4">Critical</option>
            <option value="3">High</option>
            <option value="2">Moderate</option>
            <option value="1">Minor</option>
          </select>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all"
            style={{ background: '#151d26', border: '1px solid #1e2d3d', color: '#7a8a9a' }}>
            <Download size={12} /> Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden border" style={{ borderColor: '#1e2d3d' }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: '#0d1117' }}>
              {['Time', 'Patient', 'Severity', 'Chief Complaint', 'Routed To', 'Transit', 'SRS', 'SHAP Factor', 'Override'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-aurum-text-ter whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: '#1e2d3d' }}>
            {filtered.map((e, i) => {
              const srs    = Math.round(e.survivability_score * 100);
              const srsClr = srs >= 75 ? '#10b981' : srs >= 50 ? '#f59e0b' : '#e84545';
              return (
                <tr key={e.id} style={{ background: i % 2 === 0 ? '#0f151c' : '#0d1117' }}
                  className="transition-colors"
                  onMouseEnter={e => e.currentTarget.style.background = '#151d26'}
                  onMouseLeave={ev => ev.currentTarget.style.background = i % 2 === 0 ? '#0f151c' : '#0d1117'}>
                  <td className="px-4 py-3 font-mono text-xs text-aurum-text-sec whitespace-nowrap">{e.time}</td>
                  <td className="px-4 py-3 font-mono text-xs font-semibold text-aurum-text whitespace-nowrap">{e.session}</td>
                  <td className="px-4 py-3"><SeverityBadge severity={e.severity} size="xs" /></td>
                  <td className="px-4 py-3 text-xs text-aurum-text-sec max-w-[200px] truncate">{e.complaint}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-aurum-text whitespace-nowrap">{e.hospital}</td>
                  <td className="px-4 py-3 text-xs font-mono text-aurum-text-sec whitespace-nowrap">{e.transit_min}m</td>
                  <td className="px-4 py-3 font-mono text-sm font-bold whitespace-nowrap" style={{ color: srsClr }}>{srs}%</td>
                  <td className="px-4 py-3">
                    <span className="text-[10px] px-2 py-0.5 rounded font-semibold"
                      style={{ background: 'rgba(139,92,246,0.12)', color: '#8b5cf6', border: '1px solid rgba(139,92,246,0.2)' }}>
                      {e.shap_top}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {e.override
                      ? <span className="text-[10px] px-2 py-0.5 rounded font-semibold" style={{ background: 'rgba(245,158,11,0.12)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.25)' }}>Dispatcher</span>
                      : <span className="text-[10px] text-aurum-text-ter">NEXUS Auto</span>
                    }
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
