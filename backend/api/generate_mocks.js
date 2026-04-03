import fs from 'fs';

function parseCSV(text) {
  let result = [], currentWord = '', inQuotes = false, currentRow = [];
  for (let i = 0; i < text.length; i++) {
    let char = text[i];
    if (char === '"' && text[i+1] === '"') { currentWord += '"'; i++; }
    else if (char === '"') inQuotes = !inQuotes;
    else if (char === ',' && !inQuotes) { currentRow.push(currentWord.trim()); currentWord = ''; }
    else if (char === '\n' || char === '\r') {
      if (!inQuotes) {
        if (currentWord) currentRow.push(currentWord.trim());
        if (currentRow.length > 0) result.push(currentRow);
        currentRow = []; currentWord = '';
        if (char === '\r' && text[i+1] === '\n') i++; 
      } else currentWord += char;
    } else currentWord += char;
  }
  if (currentWord) currentRow.push(currentWord.trim());
  if (currentRow.length > 0) result.push(currentRow);
  return result;
}

const csvPath = 'c:\\Users\\Asus\\Downloads\\Ignisia\\pune_hospitals.csv';
const csvContent = fs.readFileSync(csvPath, 'utf8');
const rows = parseCSV(csvContent);
const header = rows.shift();
const col = (r, name) => r[header.indexOf(name)] || '';

const mockHospitals = [];

for (const row of rows) {
  if (row.length < 5) continue;
  const lat = parseFloat(col(row, 'latitude'));
  const lng = parseFloat(col(row, 'longitude'));
  if (isNaN(lat) || isNaN(lng)) continue;

  const total_beds = parseInt(col(row, 'total_beds')) || 0;
  const avail_beds = parseInt(col(row, 'available_beds')) || 0;
  const eq = col(row, 'equipment_inventory').toLowerCase();
  const sp = col(row, 'specialist_roster').toLowerCase();

  mockHospitals.push({
    id: col(row, 'hospital_id'),
    name: col(row, 'name'),
    address: col(row, 'area'),
    lat, lng,
    phone: '+91-20-0000-0000',
    total_icu_beds: parseInt(col(row, 'total_icu_beds')) || 0,
    avail_icu_beds: parseInt(col(row, 'available_icu_beds')) || 0,
    total_gen_beds: total_beds,
    avail_gen_beds: avail_beds,
    has_ventilator: eq.includes('ventilator'),
    avail_ventilators: eq.includes('ventilator') ? Math.floor(Math.random() * 5) + 1 : 0,
    has_trauma_centre: col(row, 'trauma_center_level').toLowerCase().includes('level'),
    has_cath_lab: eq.includes('cath lab'),
    has_neurosurgery: sp.includes('neurolog'),
    has_cardiac_surgery: sp.includes('cardiolog'),
    has_burn_unit: sp.includes('burn'),
    has_paediatrics: sp.includes('pediatric') || col(row, 'name').toLowerCase().includes('child'),
    current_load_pct: total_beds > 0 ? Math.round(((total_beds - avail_beds) / total_beds) * 100) : 0,
    is_active: true,
    last_updated_at: new Date().toISOString(),
    specialists_on_duty: [
      { id: 's001', specialist_type: 'trauma_surgeon', doctor_name: 'Dr. A. Sharma', on_duty: true, shift_ends_at: '20:00' },
      { id: 's002', specialist_type: 'neurosurgeon', doctor_name: 'Dr. B. Patil', on_duty: true, shift_ends_at: '22:00' },
    ],
  });
}

const mockDataPath = '../../frontend/src/data/mockData.js';
let mockDataContent = fs.readFileSync(mockDataPath, 'utf8');

// The replacement needs to handle the exact line spacing.
// Let's use a simpler regex to extract MOCK_HOSPITALS array
const regex = /export const MOCK_HOSPITALS = \[[\s\S]*?\];/;
mockDataContent = mockDataContent.replace(
  regex,
  `export const MOCK_HOSPITALS = ${JSON.stringify(mockHospitals, null, 2)};`
);

fs.writeFileSync(mockDataPath, mockDataContent);
console.log('Successfully upgraded mockData.js with ' + mockHospitals.length + ' Pune Hospitals!');
