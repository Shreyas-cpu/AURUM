-- 1.2 Seed Data
-- 10 simulated hospitals representing a regional grid (Pune region)

INSERT INTO hospitals (name, lat, lng, total_icu_beds, avail_icu_beds, total_gen_beds, avail_gen_beds, has_ventilator, avail_ventilators, has_trauma_centre, has_cath_lab, has_neurosurgery, has_cardiac_surgery, current_load_pct) VALUES
-- 2 Level 1 Trauma Equivalents
('Ruby Hall Clinic (Trauma Center)', 18.5362, 73.8741, 50, 10, 200, 40, TRUE, 15, TRUE, TRUE, TRUE, TRUE, 75),
('Jehangir Hospital', 18.5312, 73.8767, 45, 8, 180, 45, TRUE, 12, TRUE, TRUE, TRUE, TRUE, 78),

-- 3 Limited Trauma
('KEM Hospital', 18.5201, 73.8727, 30, 5, 150, 30, TRUE, 5, TRUE, FALSE, FALSE, FALSE, 80),
('Sassoon General', 18.5255, 73.8745, 60, 12, 300, 60, TRUE, 10, TRUE, FALSE, TRUE, FALSE, 85),
('Inamdar Hospital', 18.5020, 73.8600, 20, 4, 100, 20, TRUE, 4, TRUE, FALSE, FALSE, FALSE, 80),

-- 3 General Hospitals
('Sanjeevan Hospital', 18.5098, 73.8340, 15, 5, 80, 25, FALSE, 0, FALSE, FALSE, FALSE, FALSE, 65),
('Sahyadri Hospital', 18.5140, 73.8180, 25, 10, 120, 40, TRUE, 2, FALSE, TRUE, FALSE, FALSE, 60),
('Poona Hospital', 18.5130, 73.8430, 30, 8, 140, 35, TRUE, 3, FALSE, FALSE, FALSE, FALSE, 70),

-- 2 Near-capacity / Stress test targets
('Aditya Birla Memorial (Capacity)', 18.6250, 73.7840, 70, 0, 400, 5, TRUE, 1, TRUE, TRUE, TRUE, TRUE, 98),
('Noble Hospital (Capacity)', 18.5100, 73.8900, 40, 1, 200, 8, TRUE, 0, TRUE, TRUE, FALSE, FALSE, 96);

-- Update spatial column
UPDATE hospitals SET location = ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography;

-- Insert 3 Ambulances
INSERT INTO ambulances (call_sign, status, current_lat, current_lng) VALUES
('AMB-001', 'idle', 18.5200, 73.8500),
('AMB-002', 'idle', 18.5400, 73.8600),
('AMB-003', 'idle', 18.5100, 73.8800);

-- Insert 1 Patient & Vitals Stream
DO $$
DECLARE
    amb1_id UUID;
    pat1_id UUID;
BEGIN
    SELECT id INTO amb1_id FROM ambulances WHERE call_sign = 'AMB-001';
    
    INSERT INTO patients (session_code, ambulance_id, age, sex, chief_complaint, mechanism_of_injury, heart_rate, systolic_bp, diastolic_bp, spo2, respiratory_rate, gcs_score)
    VALUES ('P-TEST-001', amb1_id, 45, 'male', 'Severe chest pain + blunt force trauma', 'Motor Vehicle Accident', 115, 95, 60, 93.0, 26, 12)
    RETURNING id INTO pat1_id;

    INSERT INTO vitals_stream (patient_id, source, heart_rate, systolic_bp, diastolic_bp, spo2, respiratory_rate, gcs_score)
    VALUES (pat1_id, 'monitor', 115, 95, 60, 93.0, 26, 12);
END $$;
