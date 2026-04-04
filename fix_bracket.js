const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'frontend', 'src', 'hooks', 'useStore.js');
let content = fs.readFileSync(file, 'utf-8');

// Clean up hanging bracket 
const regexHanging = /\s+\}\);\s+socket\.on\('mce:triggered', \(data\) => \{/g;
content = content.replace(regexHanging, `
        socket.on('mce:triggered', (data) => {`);

fs.writeFileSync(file, content);
console.log('Fixed hanging brackets in useStore.js');
