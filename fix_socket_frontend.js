const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'frontend', 'src', 'hooks', 'useSocket.js');
let content = fs.readFileSync(file, 'utf-8');

// Update useVitalsStream to handle the "severe" condition explicitly for the simulation
const newVitalsStream = `export function useVitalsStream(patientId, intervalMs = 15000) {
  const store = useStore;
  const severeTracker = useRef({ hr: 130, spo2: 94 });

  useEffect(() => {
    if (!patientId) return;

    // Use the latest state without adding patients to the dependency array
    const patient = store.getState().patients.find(p => p.id === patientId);
    if (!patient) return;

    const id = setInterval(async () => {
      let isSim = (patientId === 'P-SIM-01');
      
      // If it's the severe heart attack simulation, gradually worsen the vitals
      if (isSim) {
        severeTracker.current.hr = Math.min(185, severeTracker.current.hr + Math.floor(Math.random() * 5));
        severeTracker.current.spo2 = Math.max(82, severeTracker.current.spo2 - (Math.random() * 1.5));
      }

      const reading = {
        patient_id:      patientId,
        source:          'monitor',
        heart_rate:      isSim ? Math.round(severeTracker.current.hr) : Math.round(driftVital(patient.heart_rate, 8)),
        systolic_bp:     isSim ? 175 : Math.round(driftVital(patient.systolic_bp, 6)),
        diastolic_bp:    isSim ? 105 : Math.round(driftVital(patient.diastolic_bp, 5)),
        spo2:            isSim ? parseFloat(severeTracker.current.spo2.toFixed(1)) : parseFloat(driftVital(patient.spo2, 1.2).toFixed(1)),
        respiratory_rate: Math.round(driftVital(patient.respiratory_rate, 4)),
        temperature:     parseFloat(driftVital(patient.temperature, 0.3).toFixed(1)),
        gcs_score:       patient.gcs_score,
      };

      try {
        if(store.getState().isConnected) {
          // Push via REST - the backend will broadcast via socket to Hospital & Ambulance tabs
          await fetch(\`http://localhost:3001/api/patients/\${patientId}/vitals\`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reading)
          });
        }
      } catch (e) {
        console.error('[AURUM] Error streaming vitals to backend:', e);
      }
    }, intervalMs);

    return () => clearInterval(id);
  }, [patientId, intervalMs]);
}`;

const oldVitalsStreamRegex = /export function useVitalsStream[\s\S]*?return \(\) => clearInterval\(id\);\s*\}, \[patientId, intervalMs\]\);\s*\}/;

content = content.replace(oldVitalsStreamRegex, newVitalsStream);
fs.writeFileSync(file, content);
console.log('Updated useVitalsStream');
