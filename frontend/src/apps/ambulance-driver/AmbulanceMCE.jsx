import React from 'react';
import { AlertTriangle, CheckCircle, MapPin } from 'lucide-react';
import { useStore } from '../../hooks/useStore';
import { SEVERITY_MAP } from '../../data/mockData';
import SeverityBadge from '../../components/shared/SeverityBadge';

const MCE_ASSIGNMENTS = [
  { patient_id: 'pat-001', patient_code: 'P-001', patient_age: 42, severity: 4, hospital_id: 'hosp-001', hospital_name: 'KEM Hospital', score: 0.89, rationale: 'Trauma centre + surgeon on duty' },
  { patient_id: 'pat-002', patient_code: 'P-002', patient_age: 67, severity: 3, hospital_id: 'hosp-002', hospital_name: 'Lilavati Hospital', score: 0.83, rationale: 'Cath lab + cardiologist on duty' },
  { patient_id: 'pat-003', patient_code: 'P-003', patient_age: 30, severity: 2, hospital_id: 'hosp-006', hospital_name: 'Nanavati Max', score: 0.71, rationale: 'General beds available, low load' },
];

export default function AmbulanceMCE() {
  const mceActive      = useStore(s => s.mceActive);
  const triggerMCE     = useStore(s => s.triggerMCE);
  const resolveMCE     = useStore(s => s.resolveMCE);

  return (
    <div className="h-full overflow-y-auto px-4 py-4 space-y-4">

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className={`flex items-center gap-2 px-3 py-2 rounded-xl font-bold text-sm ${mceActive ? 'animate-pulse' : ''}`}
          style={{ background: mceActive ? 'rgba(232,69,69,0.15)' : '#151d26', color: mceActive ? '#e84545' : '#7a8a9a', border: `1px solid ${mceActive ? 'rgba(232,69,69,0.4)' : '#1e2d3d'}` }}>
          <AlertTriangle size={16} />
          {mceActive ? 'MCE MODE ACTIVE' : 'MCE Mode Standby'}
        </div>
      </div>

      {mceActive ? (
        <>
          {/* MCE Active — show assignments */}
          <div className="rounded-xl p-4" style={{ background: 'rgba(232,69,69,0.08)', border: '1px solid rgba(232,69,69,0.25)' }}>
            <div className="section-label mb-1">NEXUS Batch Routing — Active</div>
            <div className="text-xs" style={{ color: '#7a8a9a' }}>
              {MCE_ASSIGNMENTS.length} patients simultaneously routed via ILP optimizer.
              Surge prevention: max 40% per hospital enforced.
            </div>
          </div>

          {/* My Ambulance Assignment */}
          <div>
            <div className="section-label mb-2">Your Assignment</div>
            <div className="rounded-xl p-4" style={{ background: '#0f151c', border: '1px solid rgba(232,69,69,0.35)' }}>
              <div className="flex items-center gap-2 mb-2">
                <SeverityBadge severity={4} pulse size="xs" />
                <span className="text-xs font-mono font-bold" style={{ color: '#e8ecef' }}>P-20241031-001</span>
              </div>
              <div className="text-base font-black mb-1" style={{ color: '#e8ecef' }}>KEM Hospital</div>
              <div className="text-[10px] flex items-center gap-1" style={{ color: '#7a8a9a' }}>
                <MapPin size={10} /> Acharya Donde Marg, Parel
              </div>
              <div className="mt-2 text-[10px] px-2 py-1 rounded" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>
                ETA 9 min · Trauma team notified
              </div>
            </div>
          </div>

          {/* All Assignments */}
          <div>
            <div className="section-label mb-2">All MCE Assignments</div>
            <div className="space-y-2">
              {MCE_ASSIGNMENTS.map((a, i) => (
                <div key={a.patient_id} className="rounded-xl px-3 py-3 flex items-center gap-3"
                  style={{ background: '#0d1117', border: '1px solid #1e2d3d' }}>
                  <div className="text-[9px] font-mono font-bold w-5 text-center" style={{ color: '#4a5a6a' }}>#{i + 1}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <SeverityBadge severity={a.severity} size="xs" />
                      <span className="text-[10px] font-mono font-semibold" style={{ color: '#e8ecef' }}>{a.patient_code}</span>
                    </div>
                    <div className="text-[10px]" style={{ color: '#7a8a9a' }}>→ {a.hospital_name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-mono font-black" style={{ color: '#10b981' }}>{Math.round(a.score * 100)}</div>
                    <div className="text-[8px]" style={{ color: '#4a5a6a' }}>score</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button onClick={resolveMCE}
            className="w-full py-3 rounded-xl font-bold text-sm"
            style={{ background: '#151d26', color: '#7a8a9a', border: '1px solid #1e2d3d' }}>
            Resolve MCE Event
          </button>
        </>
      ) : (
        <>
          {/* Standby */}
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: '#151d26', border: '1px solid #1e2d3d' }}>
              <AlertTriangle size={28} style={{ color: '#f59e0b' }} />
            </div>
            <div className="text-center">
              <div className="text-sm font-bold" style={{ color: '#e8ecef' }}>MCE Grid Standby</div>
              <div className="text-[10px] mt-1" style={{ color: '#7a8a9a' }}>
                Triggered automatically when 3+ simultaneous unrouted patients exist,
                or manually by ERC dispatcher.
              </div>
            </div>
          </div>

          <button onClick={() => triggerMCE('mce-demo-001', ['pat-001', 'pat-002'], [])}
            className="w-full py-4 rounded-xl font-bold text-sm"
            style={{ background: 'rgba(232,69,69,0.12)', color: '#e84545', border: '1px solid rgba(232,69,69,0.3)' }}>
            ⚡ Simulate MCE Event (Demo)
          </button>
        </>
      )}
    </div>
  );
}
