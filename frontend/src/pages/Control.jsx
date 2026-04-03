import React, { useState } from 'react';
import { Power, ShieldAlert, Radio, Lock } from 'lucide-react';

export default function Control() {
  const [toggles, setToggles] = useState({
    autoDispatch: true,
    gridLockdown: false,
    radioOverride: false,
    publicAlert: false,
  });

  const handleToggle = (key) => {
    // In a real application, you'd show a confirmation modal for destructive actions
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-8 max-w-5xl mx-auto font-sans">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">System Override Console</h1>
        <p className="text-sm text-slate-500 mt-1">Manual control mechanisms for critical municipal infrastructure components.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Toggle Card 1 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <Power className="h-6 w-6" />
            </div>
            <button 
              onClick={() => handleToggle('autoDispatch')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${toggles.autoDispatch ? 'bg-blue-600' : 'bg-slate-300'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${toggles.autoDispatch ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
          <h3 className="text-lg font-bold text-slate-800">Auto-Dispatch Protocol</h3>
          <p className="text-sm text-slate-500 mt-2">Allows the APEX algorithm to automatically assign units to incidents based on severity without human authorization.</p>
        </div>

        {/* Toggle Card 2 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-rose-200 bg-gradient-to-br from-white to-rose-50">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-rose-100 text-rose-600 rounded-lg">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <button 
              onClick={() => handleToggle('gridLockdown')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${toggles.gridLockdown ? 'bg-rose-600' : 'bg-slate-300'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${toggles.gridLockdown ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
          <h3 className="text-lg font-bold text-rose-900">City Grid Lockdown</h3>
          <p className="text-sm text-rose-700/80 mt-2">Restricts civilian traffic light patterns to establish green corridors for emergency services across all major arteries.</p>
        </div>
        
        {/* Toggle Card 3 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-slate-100 text-slate-600 rounded-lg">
              <Radio className="h-6 w-6" />
            </div>
            <button 
              onClick={() => handleToggle('radioOverride')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${toggles.radioOverride ? 'bg-blue-600' : 'bg-slate-300'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${toggles.radioOverride ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
          <h3 className="text-lg font-bold text-slate-800">Radio Override</h3>
          <p className="text-sm text-slate-500 mt-2">Forces all EMS frequencies into secure encrypted sub-bands during major operations.</p>
        </div>

        {/* Toggle Card 4 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-slate-100 text-slate-600 rounded-lg">
                <Lock className="h-6 w-6" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-slate-800">Flush Protocol</h3>
            <p className="text-sm text-slate-500 mt-2">Wipes localized terminal cache and resets biometric authentication keys for all field units.</p>
          </div>
          <div className="mt-6 flex justify-end">
            <button className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition text-sm font-medium">
              Execute Flush
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
