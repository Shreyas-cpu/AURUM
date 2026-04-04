const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'frontend', 'src', 'apps', 'ambulance-driver', 'AmbulanceLayout.jsx');
let content = fs.readFileSync(file, 'utf-8');

// Ensure lucide icon check
if (!content.includes('AlertOctagon')) {
  content = content.replace("import { Activity, AlertTriangle, Power, Wifi, WifiOff } from 'lucide-react';", "import { Activity, AlertTriangle, Power, Wifi, WifiOff, AlertOctagon } from 'lucide-react';");
}

const modalInject = `
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
`;

content = content.replace(/const sevMeta = sev \? SEVERITY_MAP\[sev\] : null;/, `const sevMeta = sev ? SEVERITY_MAP[sev] : null;\n${modalInject}`);

content = content.replace(
  /<div className="flex flex-col h-screen overflow-hidden"/,
  `<div className="flex flex-col h-screen overflow-hidden relative"\n      style={{ background: '#080c10', color: '#e8ecef' }}>\n      {rerouteNotification && <RerouteModal />}`
);

// We need to also clean up the first replace that might duplicate the style if we are not careful
// The original was: <div className="flex flex-col h-screen overflow-hidden" style={{ background: '#080c10', color: '#e8ecef' }}>
content = content.replace(
  /<div className="flex flex-col h-screen overflow-hidden" style=\{\{\s*background:\s*'#080c10',\s*color:\s*'#e8ecef'\s*\}\}>/,
  `<div className="flex flex-col h-screen overflow-hidden relative" style={{ background: '#080c10', color: '#e8ecef' }}>\n      {rerouteNotification && <RerouteModal />}`
);

fs.writeFileSync(file, content);
console.log('Injected Modal Twist Visualizer into AmbulanceLayout.');
