const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'backend', 'api', 'simEngine.js');
let content = fs.readFileSync(file, 'utf-8');

// Replace the entire block
content = content.replace(/let hr = 135; let spo2 = 91;[\s\S]*?ActiveSimulations\.set\("Sim_01_Interval", vitalsInterval\);/, 
  '// Patient Monitor (Frontend Tab C) is now responsible for pushing vitals via REST to the backend.\n    // Backend will just broadcast them when received.');

fs.writeFileSync(file, content);
console.log('Removed vitals mock from backend');
