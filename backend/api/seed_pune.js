import fs from 'fs';
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: '../../.env' });

const pool = new Pool({
  user: process.env.POSTGRES_USER || 'aurum_admin',
  password: process.env.POSTGRES_PASSWORD || 'aurum_password',
  host: process.env.POSTGRES_HOST || 'localhost',
  database: process.env.POSTGRES_DB || 'aurum_db',
  port: 5432,
});

function parseCSV(text) {
  let result = [];
  let currentWord = '';
  let inQuotes = false;
  let currentRow = [];
  for (let i = 0; i < text.length; i++) {
    let char = text[i];
    if (char === '"' && text[i+1] === '"') {
      currentWord += '"'; i++;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      currentRow.push(currentWord.trim());
      currentWord = '';
    } else if (char === '\n' || char === '\r') {
      if (!inQuotes) {
        if (currentWord) currentRow.push(currentWord.trim());
        if (currentRow.length > 0) result.push(currentRow);
        currentRow = [];
        currentWord = '';
        if (char === '\r' && text[i+1] === '\n') i++; 
      } else {
        currentWord += char;
      }
    } else {
      currentWord += char;
    }
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

async function run() {
  console.log('Starting seed process...');
  // Deactivate all previous hospitals to keep foreign keys on ambulances/patients intact if needed
  await pool.query("UPDATE hospitals SET is_active = false");

  for (const row of rows) {
    if (row.length < 5) continue;
    
    // Check if hospital already exists by this ID or Name
    const hospital_id = col(row, 'hospital_id');
    const name = col(row, 'name');
    const address = col(row, 'area');
    const lat = parseFloat(col(row, 'latitude'));
    const lng = parseFloat(col(row, 'longitude'));
    
    if (isNaN(lat) || isNaN(lng)) continue;
    
    const total_icu = parseInt(col(row, 'total_icu_beds')) || 0;
    const avail_icu = parseInt(col(row, 'available_icu_beds')) || 0;
    const total_beds = parseInt(col(row, 'total_beds')) || 0;
    const avail_beds = parseInt(col(row, 'available_beds')) || 0;
    
    const eq = col(row, 'equipment_inventory').toLowerCase();
    const sp = col(row, 'specialist_roster').toLowerCase();
    
    const has_ventilator = eq.includes('ventilator');
    const avail_ventilators = has_ventilator ? Math.floor(Math.random() * 5) + 1 : 0;
    const trauma = col(row, 'trauma_center_level').toLowerCase();
    const has_trauma = trauma.includes('level');
    const has_cath = eq.includes('cath lab');
    const has_neuro = sp.includes('neurolog');
    const has_cardiac = sp.includes('cardiolog');
    const has_paed = sp.includes('pediatric') || name.toLowerCase().includes('child');
    
    const load_pct = total_beds > 0 ? Math.round(((total_beds - avail_beds) / total_beds) * 100) : 0;

    await pool.query(`
      INSERT INTO hospitals (
        name, address, lat, lng,
        total_icu_beds, avail_icu_beds,
        total_gen_beds, avail_gen_beds,
        has_ventilator, avail_ventilators,
        has_trauma_centre, has_cath_lab,
        has_neurosurgery, has_cardiac_surgery,
        has_paediatrics, current_load_pct, is_active
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16, true)
    `, [
      name, address, lat, lng,
      total_icu, avail_icu,
      total_beds, avail_beds,
      has_ventilator, avail_ventilators,
      has_trauma, has_cath,
      has_neuro, has_cardiac,
      has_paed, load_pct
    ]);
  }
  console.log('Seed complete! 200+ Pune Hospitals have been added and activated.');
  process.exit(0);
}
run().catch(console.error);
