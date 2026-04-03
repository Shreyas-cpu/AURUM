import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map from '../components/Map';
import DispatchForm from '../components/DispatchForm';

export default function Monitor() {
  const [hospitals, setHospitals] = useState([]);
  const [activeDispatches, setActiveDispatches] = useState([]);

  useEffect(() => {
    // 1. Fetch initial hospital base data
    axios.get("http://localhost:8000/api/hospitals")
      .then((res) => setHospitals(res.data))
      .catch(err => console.error("Could not fetch hospitals:", err));

    // 2. Connect WebSocket to listen for incoming dispatch events across the network
    // Wrap in try-catch or assume it might fail if no backend
    try {
      const ws = new WebSocket("ws://localhost:8000/ws/dispatch");
      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === "NEW_DISPATCH") {
          setActiveDispatches(prev => [...prev, message.data]);
        }
      };
      return () => ws.close();
    } catch (e) {
      console.warn("WebSocket connection failed", e);
    }
  }, []);

  return (
    <div className="flex h-full flex-col xl:flex-row overflow-hidden bg-slate-50">
      {/* Dispatch Sidebar for Monitor strictly */}
      <div className="w-full xl:w-[420px] h-full bg-white shadow-lg z-10 flex flex-col py-6 overflow-y-auto border-r border-slate-100">
        
        {/* Form Container */}
        <div className="px-6 w-full flex justify-center mb-6">
          <DispatchForm />
        </div>
        
        {/* Real-time Status Feed */}
        <div className="mt-4 w-full px-6 flex-1 flex flex-col">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 border-b border-slate-100 pb-2">Active Network</h3>
          <div className="space-y-3 overflow-y-auto pr-2">
            {activeDispatches.length === 0 ? (
              <p className="text-sm text-slate-500 italic pb-4">No active dispatches. Grid stable.</p>
            ) : (
              activeDispatches.slice().reverse().map((d, i) => (
                <div key={i} className="bg-white p-3 rounded-lg border border-slate-100 border-l-4 border-l-rose-500 shadow-sm text-sm">
                  <span className="font-bold text-rose-600">{d.prediction.severity}</span> case routed to <span className="font-semibold text-slate-800">{d.routed_to}</span>.
                  <div className="text-xs text-slate-500 mt-1">APEX Survivability Score: {d.prediction.srs_score}%</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Main Map Region */}
      <div className="flex-1 relative bg-slate-200 z-0">
        <Map hospitals={hospitals} activeDispatches={activeDispatches} />
      </div>
    </div>
  );
}
