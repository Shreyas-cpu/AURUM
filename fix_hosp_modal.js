const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'frontend', 'src', 'apps', 'hospital-erc', 'HospitalLayout.jsx');
let content = fs.readFileSync(file, 'utf-8');

if (!content.includes('AlertOctagon')) {
  content = content.replace("import { Activity, Bell, AlertTriangle, Monitor, LogOut } from 'lucide-react';", "import { Activity, Bell, AlertTriangle, Monitor, LogOut, AlertOctagon } from 'lucide-react';");
}

const modalInject = `
  const notifications = useStore(s => s.notifications);
  const dismissNotification = useStore(s => s.dismissNotification);
  
  // Find critical arrival notifications
  const arrivalNotification = notifications.find(n => n.type === 'critical' && n.title === 'AMBULANCE ARRIVED');

  const ArrivalModal = () => (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
      <div className="w-full max-w-lg bg-[#051a1a] border-2 border-red-600 rounded-2xl shadow-[0_0_80px_rgba(220,38,38,0.4)] p-8 flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
        <div className="w-20 h-20 bg-red-600/20 rounded-full flex items-center justify-center animate-pulse mb-6">
          <AlertOctagon size={48} className="text-red-500" />
        </div>
        <h1 className="text-4xl font-black text-red-500 mb-2">UBER-CRITICAL ARRIVAL</h1>
        <p className="text-xl text-red-200 font-semibold leading-relaxed mb-8">
          {arrivalNotification?.message || "Patient has arrived at Emergency Bay."}
        </p>
        <button 
          onClick={() => dismissNotification(arrivalNotification.id)}
          className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-bold text-xl rounded-xl transition-all shadow-[0_0_20px_rgba(220,38,38,0.5)]"
        >
          TEAM SCRAMBLE COMPLETE
        </button>
      </div>
    </div>
  );
`;

content = content.replace(/const activeHosp = hospitals\.find\(h => h\.id === hospId\);/, `const activeHosp = hospitals.find(h => h.id === hospId);\n${modalInject}`);

content = content.replace(
  /<div className="min-h-screen flex flex-col"\s*style=\{\{ background: '#080c10', color: '#e8ecef' \}\}>/,
  `<div className="min-h-screen flex flex-col relative" style={{ background: '#080c10', color: '#e8ecef' }}>\n      {arrivalNotification && <ArrivalModal />}`
);

fs.writeFileSync(file, content);
console.log('Injected Modal Visualizer into HospitalLayout.');
