const fs = require('fs');
const path = require('path');

// 1. Fix AmbulanceLayout
const ambFile = path.join(__dirname, 'frontend', 'src', 'apps', 'ambulance-driver', 'AmbulanceLayout.jsx');
let ambContent = fs.readFileSync(ambFile, 'utf-8');

ambContent = ambContent.replace(
  /<div className="flex flex-col h-screen overflow-hidden relative" style=\{\{ background: '#080c10', color: '#e8ecef' \}\}>\s*\{rerouteNotification && <RerouteModal \/>\} style=\{\{ background: '#080c10', color: '#e8ecef' \}\}>/g,
  `<div className="flex flex-col h-screen overflow-hidden relative" style={{ background: '#080c10', color: '#e8ecef' }}>\n      {rerouteNotification && <RerouteModal />}`
);

fs.writeFileSync(ambFile, ambContent);

// 2. Fix Landing
const landFile = path.join(__dirname, 'frontend', 'src', 'pages', 'Landing.jsx');
let landContent = fs.readFileSync(landFile, 'utf-8');

const problematicStart = `    <div
      className="min-h-screen flex flex-col"
    >
      <Toaster position="top-center" />
      style={{ background: '#060a0e', color: '#e8ecef', fontFamily: 'Inter, sans-serif' }}
    >`;
    
const replacementStart = `    <div
      className="min-h-screen flex flex-col relative"
      style={{ background: '#060a0e', color: '#e8ecef', fontFamily: 'Inter, sans-serif' }}
    >
      <Toaster position="top-center" />`;

landContent = landContent.replace(problemmaticStart, replacementStart);

// Let's just aggressively fix any weird formatting in the main outer div:
landContent = landContent.replace(
  /<div\s*className="min-h-screen flex flex-col"\s*>\s*<Toaster position="top-center" \/>\s*style=\{\{ background: '#060a0e', color: '#e8ecef', fontFamily: 'Inter, sans-serif' \}\}\s*>/g,
  replacementStart
);


fs.writeFileSync(landFile, landContent);
console.log('Fixed JSX compilation errors.');
