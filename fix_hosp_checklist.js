const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'frontend', 'src', 'apps', 'hospital-erc', 'HospitalOverview.jsx');
let content = fs.readFileSync(file, 'utf-8');

// I will just replace the static Checklist array with logic based on the patient's vitals or default to Cardiac
content = content.replace(
  /{label: 'Reserve ICU Bed', done: true},[\s\S]*?{label: 'Verify Ventilator Operational', done: false},/g,
  `{ label: patient?.survivability_score < 0.6 ? 'Prepare Cath Lab' : 'Reserve ICU Bed', done: true },
              { label: patient?.survivability_score < 0.6 ? 'Alert Cardiologist' : 'Alert Trauma Surgeon Dr. Menon', done: true },
              { label: patient?.survivability_score < 0.6 ? 'Activate STEMI Protocol' : 'Activate Trauma Bay 2', done: false },
              { label: 'Verify Defibrillator & Stretcher Ready', done: false },`
);

fs.writeFileSync(file, content);
console.log('Fixed Hospital Checklist');
