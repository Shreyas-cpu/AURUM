CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE hospitals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    address TEXT,
    lat DECIMAL(10,7) NOT NULL,
    lng DECIMAL(10,7) NOT NULL,
    location GEOGRAPHY(POINT, 4326),
    phone VARCHAR(20),
    total_icu_beds INT DEFAULT 0,
    avail_icu_beds INT DEFAULT 0,
    total_gen_beds INT DEFAULT 0,
    avail_gen_beds INT DEFAULT 0,
    has_ventilator BOOLEAN DEFAULT FALSE,
    avail_ventilators INT DEFAULT 0,
    has_trauma_centre BOOLEAN DEFAULT FALSE,
    has_cath_lab BOOLEAN DEFAULT FALSE,
    has_neurosurgery BOOLEAN DEFAULT FALSE,
    has_cardiac_surgery BOOLEAN DEFAULT FALSE,
    has_burn_unit BOOLEAN DEFAULT FALSE,
    has_paediatrics BOOLEAN DEFAULT FALSE,
    current_load_pct INT DEFAULT 0, -- 0-100
    is_active BOOLEAN DEFAULT TRUE,
    last_updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE specialists_on_duty (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hospital_id UUID REFERENCES hospitals(id) ON DELETE CASCADE,
    specialist_type VARCHAR(100) NOT NULL, -- 'neurosurgeon','cardiologist','trauma_surgeon', etc.
    doctor_name VARCHAR(200),
    on_duty BOOLEAN DEFAULT TRUE,
    shift_ends_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE ambulances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    call_sign VARCHAR(50) UNIQUE NOT NULL, -- e.g. 'AMB-007'
    driver_name VARCHAR(200),
    driver_phone VARCHAR(20),
    current_lat DECIMAL(10,7),
    current_lng DECIMAL(10,7),
    status VARCHAR(30) DEFAULT 'idle', -- 'idle' | 'en_route_to_scene' | 'on_scene' | 'en_route_to_hospital' | 'at_hospital'
    assigned_hospital_id UUID REFERENCES hospitals(id),
    active_patient_id UUID,
    last_location_update TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_code VARCHAR(20) UNIQUE NOT NULL, -- short human-readable code, e.g. 'P-20241031-001'
    ambulance_id UUID REFERENCES ambulances(id),
    age INT,
    sex VARCHAR(10), -- 'male' | 'female' | 'unknown'
    chief_complaint TEXT,
    mechanism_of_injury TEXT,
    
    -- Latest vitals snapshot (updated in real-time from vitals_stream)
    heart_rate INT,
    systolic_bp INT,
    diastolic_bp INT,
    spo2 DECIMAL(5,2),
    respiratory_rate INT,
    temperature DECIMAL(5,2),
    gcs_score INT, -- Glasgow Coma Scale 3-15
    
    -- ML outputs
    predicted_severity INT, -- 1 (minor) to 5 (critical)
    predicted_care_needs JSONB, -- { "icu": true, "ventilator": false, "specialist": "trauma_surgeon" }
    survivability_score DECIMAL(5,2), -- 0.0-1.0
    
    -- Routing
    assigned_hospital_id UUID REFERENCES hospitals(id),
    routing_rationale JSONB,
    status VARCHAR(30) DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    resolved_at TIMESTAMPTZ
);

CREATE TABLE vitals_stream (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    source VARCHAR(30) DEFAULT 'monitor', -- 'monitor' | 'manual'
    heart_rate INT,
    systolic_bp INT,
    diastolic_bp INT,
    spo2 DECIMAL(5,2),
    respiratory_rate INT,
    temperature DECIMAL(5,2),
    gcs_score INT,
    recorded_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_vitals_patient ON vitals_stream(patient_id, recorded_at DESC);

CREATE TABLE routing_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES patients(id),
    hospital_id UUID REFERENCES hospitals(id),
    triggered_at TIMESTAMPTZ DEFAULT NOW(),
    transit_time_min INT,
    survivability_score DECIMAL(5,2),
    shap_explanation JSONB, -- per-feature importance values
    all_hospitals_scored JSONB, -- ranked list of all evaluated hospitals
    override_by_dispatcher BOOLEAN DEFAULT FALSE,
    event_type VARCHAR(20) DEFAULT 'single' -- 'single' | 'mce_batch'
);

CREATE TABLE mce_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    triggered_at TIMESTAMPTZ DEFAULT NOW(),
    patient_ids UUID[],
    batch_assignments JSONB, -- [{ patient_id, hospital_id, score }]
    resolved_at TIMESTAMPTZ,
    notes TEXT
);
