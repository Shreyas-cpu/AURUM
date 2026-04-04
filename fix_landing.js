const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'frontend', 'src', 'pages', 'Landing.jsx');
let content = fs.readFileSync(file, 'utf-8');

// 1. Imports
if (!content.includes('react-hot-toast')) {
  content = content.replace(
    "import { Activity, Ambulance, Monitor",
    "import axios from 'axios';\nimport { Toaster, toast } from 'react-hot-toast';\nimport { Activity, Ambulance, Monitor, Play,"
  );
}

// 2. Component Logic
if (!content.includes('const [simRunning')) {
  content = content.replace(
    "export default function Landing() {",
    `export default function Landing() {
  const [simRunning, setSimRunning] = useState(false);

  const triggerSimBackend = async () => {
    try {
      await axios.post('http://localhost:3001/api/sim/01/start');
      setSimRunning(true);
      toast.success('Simulation Started across all tabs!');
    } catch(e) {
      toast.error('Simulation Failed to Start');
    }
  };

  const handleSim01 = () => {
    toast((t) => (
      <div className="flex flex-col gap-2">
        <span className="font-bold text-red-500">🚨 SEVERE INCIDENT REPORTED</span>
        <span className="text-sm font-semibold">Suspected Myocardial Infarction</span>
        <button 
          onClick={() => { 
            toast.dismiss(t.id); 
            triggerSimBackend(); 
          }} 
          className="mt-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-bold transition-all"
        >
          Log Incident
        </button>
      </div>
    ), { duration: 15000, style: { background: '#1a1f24', color: '#fff', border: '1px solid #334155' } });
  };
`
  );
}

// 3. Toaster
if (!content.includes('<Toaster position="top-center" />')) {
  content = content.replace(
    'className="min-h-screen flex flex-col"',
    'className="min-h-screen flex flex-col"\n    >\n      <Toaster position="top-center" />'
  );
}

// 4. UI Button
if (!content.includes('Run Sim_01')) {
  content = content.replace(
    '{/* Live indicator */}',
    `{/* Simulation Control */}
          <div className="flex items-center gap-2 bg-[#1a1f24] border border-[#2e3d4d] px-2 py-1 rounded-md">
            <select className="bg-transparent text-xs text-white outline-none cursor-pointer">
              <option value="sim01">Sim 01: Severe Heart Attack</option>
            </select>
            <button 
              onClick={handleSim01} 
              className="bg-red-500/20 text-red-400 hover:bg-red-500/40 px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1 transition-all"
            >
              <Play size={10} /> Run
            </button>
          </div>
          {/* Live indicator */}`
  );
}

fs.writeFileSync(file, content);
console.log('Modified Landing.jsx');

console.log('done')
