const fs = require('fs');
const path = require('path');

const landFile = path.join(__dirname, 'frontend', 'src', 'pages', 'Landing.jsx');
let landContent = fs.readFileSync(landFile, 'utf-8');

landContent = landContent.replace(
  /<div\n\s*className="min-h-screen flex flex-col"\n\s*>\n\s*<Toaster position="top-center" \/>\n\s*style=\{\{ background: '#060a0e', color: '#e8ecef', fontFamily: 'Inter, sans-serif' \}\}\n\s*>/g,
  `    <div\n      className="min-h-screen flex flex-col relative"\n      style={{ background: '#060a0e', color: '#e8ecef', fontFamily: 'Inter, sans-serif' }}\n    >\n      <Toaster position="top-center" />`
);

fs.writeFileSync(landFile, landContent);
console.log('Fixed Landing.jsx');
