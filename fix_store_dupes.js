const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'frontend', 'src', 'hooks', 'useStore.js');
let content = fs.readFileSync(file, 'utf-8');

// Clean up duplicate 'routing:reroute' handlers
const regex = /socket\.on\('routing:reroute', \(data\) => \{[\s\S]+?console\.log\('\[AURUM\] \?\? ROUTING REROUTE:', data\);[\s\S]+?\}\);/g;

content = content.replace(regex, '');

fs.writeFileSync(file, content);
console.log('Fixed duplications from string replacements in useStore.js');
