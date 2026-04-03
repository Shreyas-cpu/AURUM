import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, MapPin, Loader } from 'lucide-react';
import { useStore } from '../../hooks/useStore';
import { SEVERITY_MAP } from '../../data/mockData';
import SeverityBadge from '../../components/shared/SeverityBadge';

export default function AmbulanceMCE() {
  const mceActive      = useStore(s => s.mceActive);
  const mceEventId     = useStore(s => s.mceEventId);
  const patients       = useStore(s => s.patients);
  const hospitals      = useStore(s => s.hospitals);
  const triggerMCE     = useStore(s => s.triggerMCE);
  const resolveMCE     = useStore(s => s.resolveMCE);
  const [isRouting, setIsRouting] = useState(false);

  // Derive active assignments dynamically from Zustand
  // Instead of mock data, we find patients assigned during this MCE event
  // Or we find all patients with an assigned hospital, simulating MCE active routing
  const activeAssignments = patients.filter(p => p.assigned_hospital_id != null);

  const myAssignment = activeAssignments.slice(-1)[0]; // Just picking the latest for the ambulance's UI

  const handleTriggerMCE = async () => {
    setIsRouting(true);
    try {
      // Pick top 5 unrouted patients to simulate an MCE batch
      const unrouted = patients.filter(p => !p.assigned_hospital_id).slice(0, 5);
      if (unrouted.length === 0) {
        alert("No unrouted patients to trigger MCE batch.");
        setIsRouting(false);
        return;
      }

      // Format payload for FastAPI
      const payload = {
        req: {
          event_id: `MCE-${Date.now()}`,
          patients: unrouted.map(p => ({
            patient_id: p.id,
            patient_lat: p.lat || 19.0400,
            patient_lng: p.lng || 72.8500,
            patient_code: p.session_code || p.id,
            apex_output: {
              needs_icu: p.heart_rate > 120 || p.spo2 < 90,
              needs_ventilator: p.respiratory_rate > 30 || p.spo2 < 85,
              specialist_required: 'General',
              predicted_severity: p.predicted_severity || 4,
              survivability_score: p.survivability_score || 0.85
            }
          }))
        },
        global_hospitals: hospitals.map(h => ({
          ...h,
          current_load_pct: h.current_load_pct || 50,
          avail_icu_beds: h.avail_icu_beds || 5,
          avail_gen_beds: h.avail_gen_beds || 20,
          avail_ventilators: h.avail_ventilators || 3
        }))
      };

      // Hit FastAPI ML Engine for MCE Integer Linear Programming Routing
      const res = await fetch('http://localhost:8000/ml/mce-route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      console.log("[MCE ROUTED PAYLOAD]", data);
      // Wait for webhook to broadcast the UI update naturally, or directly trigger if offline Mode
      if (!useStore.getState().isConnected) {
         triggerMCE(data.event_id || 'MCE-LOCAL', unrouted.map(p=>p.id), data.allocations);
      }
      
    } catch (e) {
      console.error("MCE Trigger Failed:", e);
    } finally {
      setIsRouting(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto px-4 py-4 space-y-4">

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className={`flex items-center gap-2 px-3 py-2 rounded-xl font-bold text-sm ${mceActive ? 'animate-pulse' : ''}`}
          style={{ background: mceActive ? 'rgba(232,69,69,0.15)' : '#151d26', color: mceActive ? '#e84545' : '#7a8a9a', border: `1px solid ${mceActive ? 'rgba(232,69,69,0.4)' : '#1e2d3d'}` }}>
          <AlertTriangle size={16} />
          {mceActive ? `MCE EVENT: ${mceEventId || 'ACTIVE'}` : 'MCE Mode Standby'}
        </div>
      </div>

      {mceActive ? (
        <>
          {/* MCE Active — show assignments */}
          <div className="rounded-xl p-4" style={{ background: 'rgba(232,69,69,0.08)', border: '1px solid rgba(232,69,69,0.25)' }}>
            <div className="section-label mb-1">NEXUS Batch Routing — Active</div>
            <div className="text-xs" style={{ color: '#7a8a9a' }}>
              {activeAssignments.length} patients routed via ILP optimizer.     
              Surge prevention: max 40% per hospital enforced.
            </div>
          </div>

          {/* My Ambulance Assignment */}
          {myAssignment && (
          <div>
            <div className="section-label mb-2">Live Network Top Assignment</div>
            <div className="rounded-xl p-4" style={{ background: '#0f151c', border: '1px solid rgba(232,69,69,0.35)' }}>
              <div className="flex items-center gap-2 mb-2">
                <SeverityBadge severity={myAssignment.predicted_severity || 4} pulse size="xs" />
                <span className="text-xs font-mono font-bold" style={{ color: '#e8ecef' }}>{myAssignment.session_code || myAssignment.id}</span>
              </div>
              <div className="text-base font-black mb-1" style={{ color: '#e8ecef' }}>{hospitals.find(h => h.id === myAssignment.assigned_hospital_id)?.name || 'Routing...'}</div>
              <div className="mt-2 text-[10px] px-2 py-1 rounded" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>
                ETA Optimization Running · Network Grid Aware
              </div>
            </div>
          </div>
          )}

          {/* All Assignments */}
          <div>
            <div className="section-label mb-2">Network Routing Overview</div>
            <div className="space-y-2">
              {activeAssignments.map((a, i) => (
                <div key={a.id} className="rounded-xl px-3 py-3 flex items-center gap-3"
                  style={{ background: '#0d1117', border: '1px solid #1e2d3d' }}>
                  <div className="text-[9px] font-mono font-bold w-5 text-center" style={{ color: '#4a5a6a' }}>#{i + 1}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <SeverityBadge severity={a.predicted_severity || 3} size="xs" />
                      <span className="text-[10px] font-mono font-semibold" style={{ color: '#e8ecef' }}>{a.session_code || a.id}</span>
                    </div>
                    <div className="text-[10px]" style={{ color: '#7a8a9a' }}>→ {hospitals.find(h => h.id === a.assigned_hospital_id)?.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[8px]" style={{ color: '#4a5a6a' }}>survivability</div>     
                    <div className="text-sm font-mono font-black" style={{ color: '#10b981' }}>{a.survivability_score ? Math.round(a.survivability_score * 100) : '--'}%</div>
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

          <button onClick={handleTriggerMCE} disabled={isRouting}
            className="w-full py-4 rounded-xl font-bold text-sm flex justify-center items-center gap-2"
            style={{ background: 'rgba(232,69,69,0.12)', color: '#e84545', border: '1px solid rgba(232,69,69,0.3)', opacity: isRouting ? 0.5 : 1 }}>
            {isRouting ? <Loader size={16} className="animate-spin"/> : '⚡'} 
            {isRouting ? 'Routing MCE Matrix...' : 'Engage NEXUS MCE Matrix'}
          </button>
        </>
      )}
    </div>
  );
}
