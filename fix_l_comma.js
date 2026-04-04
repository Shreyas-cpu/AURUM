const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'frontend', 'src', 'pages', 'Landing.jsx');
let content = fs.readFileSync(file, 'utf-8');

content = content.replace("import { Activity, Ambulance, Monitor, Play,, ChevronRight, Zap, Shield, Play } from 'lucide-react';", "import { Activity, Ambulance, Monitor, ChevronRight, Zap, Shield, Play } from 'lucide-react';");

fs.writeFileSync(file, content);
console.log('Fixed double comma and double Play in Landing.jsx');
