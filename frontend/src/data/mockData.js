/**
 * AURUM Mock Data — mirrors PostgreSQL schema field names exactly.
 * Field names match DB columns for a seamless swap to real API.
 * Seed: 10 hospitals (Mumbai region), 3 ambulances, 2 active patients.
 */

// ─── HOSPITALS ──────────────────────────────────────────────────────────────
export const MOCK_HOSPITALS = [
  // ── Level 1: Full Trauma + All Specialties ──────────────────────────────
  {
    id: 'hosp-001',
    name: 'KEM Hospital',
    address: 'Acharya Donde Marg, Parel, Mumbai 400012',
    lat: 19.0034, lng: 72.8413,
    phone: '+91-22-2410-7000',
    total_icu_beds: 80,  avail_icu_beds: 12,
    total_gen_beds: 1800, avail_gen_beds: 245,
    has_ventilator: true, avail_ventilators: 18,
    has_trauma_centre: true, has_cath_lab: true,
    has_neurosurgery: true, has_cardiac_surgery: true,
    has_burn_unit: true, has_paediatrics: true,
    current_load_pct: 85, is_active: true,
    last_updated_at: new Date().toISOString(),
    specialists_on_duty: [
      { id: 's001', specialist_type: 'trauma_surgeon',        doctor_name: 'Dr. Suresh Menon',   on_duty: true,  shift_ends_at: '20:00' },
      { id: 's002', specialist_type: 'neurosurgeon',          doctor_name: 'Dr. Anita Bhatia',   on_duty: true,  shift_ends_at: '22:00' },
      { id: 's003', specialist_type: 'interventional_cardiologist', doctor_name: 'Dr. Rajiv Khanna', on_duty: false, shift_ends_at: '14:00' },
      { id: 's004', specialist_type: 'anaesthesiologist',     doctor_name: 'Dr. Priya Nair',     on_duty: true,  shift_ends_at: '20:00' },
    ],
  },
  {
    id: 'hosp-002',
    name: 'Lilavati Hospital',
    address: 'A-791, Bandra Reclamation, Bandra West, Mumbai 400050',
    lat: 19.0505, lng: 72.8259,
    phone: '+91-22-2675-1000',
    total_icu_beds: 40,  avail_icu_beds: 8,
    total_gen_beds: 250,  avail_gen_beds: 62,
    has_ventilator: true, avail_ventilators: 12,
    has_trauma_centre: true, has_cath_lab: true,
    has_neurosurgery: true, has_cardiac_surgery: true,
    has_burn_unit: false, has_paediatrics: true,
    current_load_pct: 72, is_active: true,
    last_updated_at: new Date().toISOString(),
    specialists_on_duty: [
      { id: 's005', specialist_type: 'trauma_surgeon',          doctor_name: 'Dr. Vikram Desai', on_duty: true, shift_ends_at: '22:00' },
      { id: 's006', specialist_type: 'neurosurgeon',            doctor_name: 'Dr. Sunita Rao',   on_duty: true, shift_ends_at: '21:00' },
      { id: 's007', specialist_type: 'interventional_cardiologist', doctor_name: 'Dr. Arun Patel', on_duty: true, shift_ends_at: '20:00' },
      { id: 's008', specialist_type: 'cardiac_surgeon',         doctor_name: 'Dr. Meena Shah',   on_duty: true, shift_ends_at: '18:00' },
    ],
  },

  // ── Level 2: Trauma Centre, Limited Specialists ──────────────────────────
  {
    id: 'hosp-003',
    name: 'Lokmanya Tilak Municipal (Sion)',
    address: 'Dr. Babasaheb Ambedkar Road, Sion, Mumbai 400022',
    lat: 19.0348, lng: 72.8624,
    phone: '+91-22-2407-6381',
    total_icu_beds: 60,  avail_icu_beds: 7,
    total_gen_beds: 1400, avail_gen_beds: 180,
    has_ventilator: true, avail_ventilators: 9,
    has_trauma_centre: true, has_cath_lab: false,
    has_neurosurgery: true, has_cardiac_surgery: false,
    has_burn_unit: false, has_paediatrics: true,
    current_load_pct: 78, is_active: true,
    last_updated_at: new Date().toISOString(),
    specialists_on_duty: [
      { id: 's009', specialist_type: 'trauma_surgeon', doctor_name: 'Dr. Ashok Gaikwad', on_duty: true,  shift_ends_at: '22:00' },
      { id: 's010', specialist_type: 'neurosurgeon',   doctor_name: 'Dr. Kiran Joshi',   on_duty: false, shift_ends_at: '16:00' },
    ],
  },
  {
    id: 'hosp-004',
    name: 'P.D. Hinduja Hospital',
    address: 'Veer Savarkar Marg, Mahim, Mumbai 400016',
    lat: 19.0322, lng: 72.8385,
    phone: '+91-22-2445-2222',
    total_icu_beds: 35,  avail_icu_beds: 5,
    total_gen_beds: 350,  avail_gen_beds: 74,
    has_ventilator: true, avail_ventilators: 7,
    has_trauma_centre: true, has_cath_lab: true,
    has_neurosurgery: false, has_cardiac_surgery: false,
    has_burn_unit: false, has_paediatrics: true,
    current_load_pct: 68, is_active: true,
    last_updated_at: new Date().toISOString(),
    specialists_on_duty: [
      { id: 's011', specialist_type: 'trauma_surgeon',          doctor_name: 'Dr. Nilesh Shetty', on_duty: true, shift_ends_at: '21:00' },
      { id: 's012', specialist_type: 'interventional_cardiologist', doctor_name: 'Dr. Smita Kulkarni', on_duty: true, shift_ends_at: '20:00' },
    ],
  },
  {
    id: 'hosp-005',
    name: 'Fortis Hospital Mulund',
    address: 'Mulund Goregaon Link Rd, Mulund West, Mumbai 400080',
    lat: 19.1726, lng: 72.9567,
    phone: '+91-22-6799-2222',
    total_icu_beds: 30,  avail_icu_beds: 6,
    total_gen_beds: 280,  avail_gen_beds: 89,
    has_ventilator: true, avail_ventilators: 8,
    has_trauma_centre: true, has_cath_lab: true,
    has_neurosurgery: false, has_cardiac_surgery: false,
    has_burn_unit: false, has_paediatrics: true,
    current_load_pct: 61, is_active: true,
    last_updated_at: new Date().toISOString(),
    specialists_on_duty: [
      { id: 's013', specialist_type: 'trauma_surgeon', doctor_name: 'Dr. Ramesh Iyer',   on_duty: true,  shift_ends_at: '23:00' },
      { id: 's014', specialist_type: 'orthopaedic_surgeon', doctor_name: 'Dr. Aditi Jain', on_duty: true, shift_ends_at: '19:00' },
    ],
  },

  // ── Level 3: General — Good Beds, No Specialist Surgery ─────────────────
  {
    id: 'hosp-006',
    name: 'Nanavati Max Super Speciality',
    address: 'SV Road, Vile Parle West, Mumbai 400056',
    lat: 19.1003, lng: 72.8497,
    phone: '+91-22-2626-7500',
    total_icu_beds: 25,  avail_icu_beds: 10,
    total_gen_beds: 350,  avail_gen_beds: 142,
    has_ventilator: true, avail_ventilators: 11,
    has_trauma_centre: false, has_cath_lab: false,
    has_neurosurgery: false, has_cardiac_surgery: false,
    has_burn_unit: false, has_paediatrics: true,
    current_load_pct: 52, is_active: true,
    last_updated_at: new Date().toISOString(),
    specialists_on_duty: [
      { id: 's015', specialist_type: 'general_surgeon', doctor_name: 'Dr. Kavita Mehta',  on_duty: true, shift_ends_at: '20:00' },
      { id: 's016', specialist_type: 'intensivist',     doctor_name: 'Dr. Farhan Qureshi', on_duty: true, shift_ends_at: '22:00' },
    ],
  },
  {
    id: 'hosp-007',
    name: 'Wockhardt Hospital Mumbai Central',
    address: '1877, Dr. Anandrao Nair Rd, Mumbai Central, Mumbai 400011',
    lat: 18.9706, lng: 72.8193,
    phone: '+91-22-6178-4444',
    total_icu_beds: 20,  avail_icu_beds: 9,
    total_gen_beds: 200,  avail_gen_beds: 88,
    has_ventilator: true, avail_ventilators: 6,
    has_trauma_centre: false, has_cath_lab: false,
    has_neurosurgery: false, has_cardiac_surgery: false,
    has_burn_unit: false, has_paediatrics: false,
    current_load_pct: 48, is_active: true,
    last_updated_at: new Date().toISOString(),
    specialists_on_duty: [
      { id: 's017', specialist_type: 'general_surgeon', doctor_name: 'Dr. Santosh Kumar', on_duty: true, shift_ends_at: '21:00' },
    ],
  },
  {
    id: 'hosp-008',
    name: 'Kokilaben Dhirubhai Ambani Hospital',
    address: 'Rao Saheb Achutrao Patwardhan Marg, Andheri West, Mumbai 400053',
    lat: 19.1318, lng: 72.8257,
    phone: '+91-22-3069-9999',
    total_icu_beds: 45,  avail_icu_beds: 14,
    total_gen_beds: 750,  avail_gen_beds: 210,
    has_ventilator: true, avail_ventilators: 16,
    has_trauma_centre: false, has_cath_lab: true,
    has_neurosurgery: false, has_cardiac_surgery: true,
    has_burn_unit: false, has_paediatrics: true,
    current_load_pct: 58, is_active: true,
    last_updated_at: new Date().toISOString(),
    specialists_on_duty: [
      { id: 's018', specialist_type: 'cardiac_surgeon',  doctor_name: 'Dr. Harish Bendre', on_duty: true, shift_ends_at: '20:00' },
      { id: 's019', specialist_type: 'intensivist',      doctor_name: 'Dr. Zoya Ali',       on_duty: true, shift_ends_at: '23:00' },
    ],
  },

  // ── Near-Capacity: Load-Balancing Test Scenarios ─────────────────────────
  {
    id: 'hosp-009',
    name: 'Breach Candy Hospital',
    address: '60-A, Bhulabhai Desai Road, Breach Candy, Mumbai 400026',
    lat: 18.9664, lng: 72.8055,
    phone: '+91-22-2367-1888',
    total_icu_beds: 20,  avail_icu_beds: 1,
    total_gen_beds: 150,  avail_gen_beds: 8,
    has_ventilator: true, avail_ventilators: 2,
    has_trauma_centre: false, has_cath_lab: false,
    has_neurosurgery: false, has_cardiac_surgery: false,
    has_burn_unit: false, has_paediatrics: false,
    current_load_pct: 94, is_active: true,
    last_updated_at: new Date().toISOString(),
    specialists_on_duty: [],
  },
  {
    id: 'hosp-010',
    name: 'Tata Memorial Centre',
    address: 'Dr. E.Borges Road, Parel, Mumbai 400012',
    lat: 19.0035, lng: 72.8465,
    phone: '+91-22-2417-7000',
    total_icu_beds: 50,  avail_icu_beds: 2,
    total_gen_beds: 600,  avail_gen_beds: 14,
    has_ventilator: true, avail_ventilators: 3,
    has_trauma_centre: false, has_cath_lab: false,
    has_neurosurgery: false, has_cardiac_surgery: false,
    has_burn_unit: false, has_paediatrics: true,
    current_load_pct: 97, is_active: true,
    last_updated_at: new Date().toISOString(),
    specialists_on_duty: [
      { id: 's020', specialist_type: 'oncologist', doctor_name: 'Dr. Rajendra Badwe', on_duty: true, shift_ends_at: '18:00' },
    ],
  },
];

// ─── AMBULANCES ──────────────────────────────────────────────────────────────
export const MOCK_AMBULANCES = [
  {
    id: 'amb-001',
    call_sign: 'AMB-001',
    driver_name: 'Rakesh Patil',
    driver_phone: '+91-98765-43210',
    current_lat: 19.0120,
    current_lng: 72.8360,
    status: 'en_route_to_hospital',
    assigned_hospital_id: 'hosp-001',
    active_patient_id: 'pat-001',
    last_location_update: new Date().toISOString(),
  },
  {
    id: 'amb-002',
    call_sign: 'AMB-002',
    driver_name: 'Sunil Sharma',
    driver_phone: '+91-98765-11111',
    current_lat: 19.0450,
    current_lng: 72.8200,
    status: 'on_scene',
    assigned_hospital_id: null,
    active_patient_id: 'pat-002',
    last_location_update: new Date().toISOString(),
  },
  {
    id: 'amb-003',
    call_sign: 'AMB-003',
    driver_name: 'Deepak Verma',
    driver_phone: '+91-98765-22222',
    current_lat: 19.0700,
    current_lng: 72.8600,
    status: 'idle',
    assigned_hospital_id: null,
    active_patient_id: null,
    last_location_update: new Date().toISOString(),
  },
];

// ─── PATIENTS ─────────────────────────────────────────────────────────────────
export const MOCK_PATIENTS = [
  {
    id: 'pat-001',
    session_code: 'P-20241031-001',
    ambulance_id: 'amb-001',
    age: 42,
    sex: 'male',
    chief_complaint: 'Polytrauma — high-speed road traffic accident',
    mechanism_of_injury: 'Blunt-force trauma, ejection from vehicle at ~80 km/h',
    // Vitals
    heart_rate: 118,
    systolic_bp: 85,
    diastolic_bp: 60,
    spo2: 93.2,
    respiratory_rate: 24,
    temperature: 38.1,
    gcs_score: 10,
    // ML Outputs
    predicted_severity: 4,  // 1=Minor → 5=Immediate
    predicted_care_needs: { icu: true, ventilator: true, specialist: 'trauma_surgeon', burn_unit: false, cath_lab: false },
    survivability_score: 0.71,
    // Routing
    assigned_hospital_id: 'hosp-001',
    routing_rationale: {
      primary_reason: 'Trauma surgeon on duty + Level 1 trauma centre',
      eta_advantage_min: 4,
      competing_hospital: 'Lilavati Hospital',
    },
    status: 'active',
    created_at: new Date(Date.now() - 8 * 60000).toISOString(),
    resolved_at: null,
  },
  {
    id: 'pat-002',
    session_code: 'P-20241031-002',
    ambulance_id: 'amb-002',
    age: 67,
    sex: 'female',
    chief_complaint: 'Acute chest pain, diaphoresis, jaw radiation — suspected STEMI',
    mechanism_of_injury: 'Non-traumatic cardiac event',
    heart_rate: 94,
    systolic_bp: 105,
    diastolic_bp: 70,
    spo2: 96.1,
    respiratory_rate: 18,
    temperature: 36.8,
    gcs_score: 14,
    predicted_severity: 3,
    predicted_care_needs: { icu: true, ventilator: false, specialist: 'interventional_cardiologist', burn_unit: false, cath_lab: true },
    survivability_score: 0.83,
    assigned_hospital_id: null,
    routing_rationale: null,
    status: 'active',
    created_at: new Date(Date.now() - 3 * 60000).toISOString(),
    resolved_at: null,
  },
];

// ─── VITALS STREAM (time-series) ─────────────────────────────────────────────
export const MOCK_VITALS_HISTORY = Array.from({ length: 12 }, (_, i) => ({
  id: `vs-${i}`,
  patient_id: 'pat-001',
  source: 'monitor',
  heart_rate:       118 + Math.round((Math.random() - 0.5) * 10),
  systolic_bp:       85  + Math.round((Math.random() - 0.5) * 8),
  diastolic_bp:      60  + Math.round((Math.random() - 0.5) * 6),
  spo2:             parseFloat((93.2 + (Math.random() - 0.5) * 1.5).toFixed(1)),
  respiratory_rate:  24  + Math.round((Math.random() - 0.5) * 4),
  temperature:      parseFloat((38.1 + (Math.random() - 0.5) * 0.4).toFixed(1)),
  gcs_score:        10,
  recorded_at: new Date(Date.now() - (11 - i) * 15000).toISOString(),
}));

// ─── ROUTING EVENTS ───────────────────────────────────────────────────────────
export const MOCK_ROUTING_EVENTS = [
  {
    id: 're-001',
    patient_id: 'pat-001',
    hospital_id: 'hosp-001',
    triggered_at: new Date(Date.now() - 6 * 60000).toISOString(),
    transit_time_min: 9,
    survivability_score: 0.71,
    shap_explanation: {
      gcs_score:           0.32,
      systolic_bp:         0.22,
      spo2:                0.18,
      heart_rate:          0.12,
      age:                 0.08,
      mechanism_of_injury: 0.05,
      respiratory_rate:    0.03,
    },
    all_hospitals_scored: [
      { hospital_id: 'hosp-001', hospital_name: 'KEM Hospital',               score: 0.89, transit_min: 9,  survivability_score: 0.71, rank: 1, rejection_reason: null },
      { hospital_id: 'hosp-002', hospital_name: 'Lilavati Hospital',          score: 0.74, transit_min: 14, survivability_score: 0.58, rank: 2, rejection_reason: null },
      { hospital_id: 'hosp-003', hospital_name: 'Sion Hospital',              score: 0.61, transit_min: 7,  survivability_score: 0.52, rank: 3, rejection_reason: null },
      { hospital_id: 'hosp-004', hospital_name: 'P.D. Hinduja Hospital',      score: 0.44, transit_min: 11, survivability_score: 0.41, rank: 4, rejection_reason: 'No neurosurgery' },
      { hospital_id: 'hosp-009', hospital_name: 'Breach Candy Hospital',      score: 0.08, transit_min: 16, survivability_score: 0.12, rank: 5, rejection_reason: 'At capacity (94%)' },
      { hospital_id: 'hosp-010', hospital_name: 'Tata Memorial Centre',       score: 0.03, transit_min: 10, survivability_score: 0.08, rank: 6, rejection_reason: 'At capacity (97%)' },
    ],
    override_by_dispatcher: false,
    event_type: 'single',
  },
];

// ─── ANALYTICS DATA ──────────────────────────────────────────────────────────
export const MOCK_HOURLY_INCIDENTS = [
  { hour: '00:00', count: 8,  critical: 1 },
  { hour: '02:00', count: 5,  critical: 0 },
  { hour: '04:00', count: 4,  critical: 0 },
  { hour: '06:00', count: 9,  critical: 1 },
  { hour: '08:00', count: 18, critical: 2 },
  { hour: '10:00', count: 24, critical: 3 },
  { hour: '12:00', count: 31, critical: 4 },
  { hour: '14:00', count: 28, critical: 3 },
  { hour: '16:00', count: 35, critical: 5 },
  { hour: '18:00', count: 42, critical: 6 },
  { hour: '20:00', count: 38, critical: 5 },
  { hour: '22:00', count: 22, critical: 3 },
];

export const MOCK_SEVERITY_DIST = [
  { name: 'Minor',     value: 87,  color: '#10b981' },
  { name: 'Moderate',  value: 64,  color: '#3b82f6' },
  { name: 'High',      value: 38,  color: '#f59e0b' },
  { name: 'Critical',  value: 21,  color: '#e84545' },
  { name: 'Immediate', value: 6,   color: '#be123c' },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
export const SEVERITY_MAP = {
  1: { label: 'Minor',     colorClass: 'badge-low',      color: '#10b981', textColor: 'text-emerald-400' },
  2: { label: 'Moderate',  colorClass: 'badge-medium',   color: '#3b82f6', textColor: 'text-blue-400'    },
  3: { label: 'High',      colorClass: 'badge-high',     color: '#f59e0b', textColor: 'text-amber-400'   },
  4: { label: 'Critical',  colorClass: 'badge-critical',  color: '#e84545', textColor: 'text-red-400'     },
  5: { label: 'Immediate', colorClass: 'badge-critical',  color: '#be123c', textColor: 'text-red-300'     },
};

export const SPECIALIST_LABELS = {
  trauma_surgeon:               'Trauma Surgery',
  neurosurgeon:                 'Neurosurgery',
  interventional_cardiologist:  'Cath Lab / CardioInt',
  cardiac_surgeon:              'Cardiac Surgery',
  anaesthesiologist:            'Anaesthesiology',
  orthopaedic_surgeon:          'Orthopaedics',
  general_surgeon:              'General Surgery',
  intensivist:                  'Critical Care / ICU',
  oncologist:                   'Oncology',
};

export const API_BASE = 'http://localhost:3001/api';
