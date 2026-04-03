import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map from './components/Map';
import DispatchForm from './components/DispatchForm';

function App() {
  const [hospitals, setHospitals] = useState([]);
  const [activeDispatches, setActiveDispatches] = useState([]);

  useEffect(() => {
    // 1. Fetch initial hospital base data
    axios.get("http://localhost:8000/api/hospitals")
      .then((res) => setHospitals(res.data))
      .catch(err => console.error("Could not fetch hospitals:", err));

    // 2. Connect WebSocket to listen for incoming dispatch events across the network
    const ws = new WebSocket("ws://localhost:8000/ws/dispatch");
    
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "NEW_DISPATCH") {
        setActiveDispatches(prev => [...prev, message.data]);
      }
    };

    return () => ws.close(); // Cleanup on unmount
  }, []);

  return (
    <div className="flex h-screen bg-gray-50 flex-col md:flex-row overflow-hidden">
      {/* Dynamic Dispatch Sidebar */}
      <div className="w-full md:w-[420px] h-full bg-white shadow-2xl z-10 flex flex-col items-center py-8 overflow-y-auto border-r border-gray-100">
        <div className="w-full px-8 pb-6 mb-6 border-b border-gray-100">
          <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-amber-500 tracking-tighter">
            AURUM
          </h1>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mt-1">
            Dispatch Command Center
          </p>
        </div>
        
        {/* Form Container */}
        <div className="px-4 w-full flex justify-center">
          <DispatchForm />
        </div>
        
        {/* Real-time Status Feed */}
        <div className="mt-8 w-full px-8">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 border-b pb-2">Active Network</h3>
          <div className="space-y-3">
            {activeDispatches.length === 0 ? (
              <p className="text-sm text-gray-500 italic">No active dispatches. Grid stable.</p>
            ) : (
              activeDispatches.slice().reverse().map((d, i) => (
                <div key={i} className="bg-gray-50 p-3 rounded-lg border-l-4 border-red-500 shadow-sm text-sm">
                  <span className="font-bold text-red-600">{d.prediction.severity}</span> case routed to <span className="font-semibold">{d.routed_to}</span>.
                  <div className="text-xs text-gray-400 mt-1">APEX Survivability Score: {d.prediction.srs_score}%</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Main Map Region */}
      <div className="flex-1 relative bg-gray-200">
        <Map hospitals={hospitals} activeDispatches={activeDispatches} />
      </div>
    </div>
  );
}

export default App;
