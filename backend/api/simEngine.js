// Stage 1: Central Mock State for Simulation 01

// Mock Data for Sim 01
export const MOCK_AMBULANCE = {
  id: "AMB-002",
  driver: "Rajesh Kumar",
  lat: 18.5204, // Pune generic coord
  lng: 73.8567,
  status: "AVAILABLE",
  type: "ALS" // Advanced Life Support
};

export const MOCK_HOSPITALS = [
  { id: "H-01", name: "Ruby Hall Clinic", hasCathLab: true, lat: 18.5360, lng: 73.8785 },
  { id: "H-02", name: "Jehangir Hospital", hasCathLab: false, lat: 18.5303, lng: 73.8766 },
  { id: "H-03", name: "KEM Hospital", hasCathLab: true, lat: 18.5222, lng: 73.8718 }
];

export const MOCK_PATIENT = {
  id: "P-SIM-01",
  age: 58,
  sex: "Male",
  chief_complaint: "Severe Chest Pain, Radiating to Left Arm",
  mechanism_of_injury: "Medical (Suspected MI)",
  lat: 18.5085, // Nearby address
  lng: 73.8643
};

// Simulation engine state tracker
const ActiveSimulations = new Map();

export const runSim01 = (io) => {
  console.log("▶️ Initiating Sim_01: Severe Heart Attack (Myocardial Infarction)");
  
  if (ActiveSimulations.has("Sim_01")) {
    console.log("Simulation 01 already running!");
    return { success: false, message: "Simulation active" };
  }
  
  ActiveSimulations.set("Sim_01", true);

  // 1. Dispatch & Initial Routing (T+2s)
  setTimeout(() => {
    // Initial routing intentionally goes to the CLOSEST generic hospital (Jehangir)
    // to setup the Twist later.
    const initialHospital = MOCK_HOSPITALS.find(h => h.id === "H-02");
    
    io.emit('routing:decision', {
      sim_id: "Sim_01",
      ambulance: MOCK_AMBULANCE,
      patient: MOCK_PATIENT,
      assigned_hospital: initialHospital,
      poly_route: "INITIAL_GEOJSON_STRING" // To be fetched dynamically by frontend map
    });
    console.log("📣 Emitted [routing:decision] - Assigned hospital: " + initialHospital.name);
  }, 2000);

  // 2. Patient Loaded & Vitals Stream Starts (T+15s)
  setTimeout(() => {
    console.log("📣 Patient Loaded. Emitting vitals.");
    io.emit('ambulance:status', { id: "AMB-002", status: "EN_ROUTE" });
    
    // Simulate severe dropping vitals
    let hr = 135; let spo2 = 91;
    const vitalsInterval = setInterval(() => {
      hr += Math.floor(Math.random() * 5) - 1; // Creeping up
      spo2 -= (Math.random() * 0.5); // Dropping
      
      const payload = {
        patient_id: "P-SIM-01",
        vitals: { heart_rate: hr, spo2: parseFloat(spo2.toFixed(1)), systolic_bp: 180, diastolic_bp: 110 }
      };
      io.emit('vitals:update', payload);
      
      // Stop interval on simulation end (managed later)
      if (!ActiveSimulations.has("Sim_01")) clearInterval(vitalsInterval);
    }, 3000);
    
    ActiveSimulations.set("Sim_01_Interval", vitalsInterval);
  }, 15000);

  // 3. Dynamic Rerouting - The Twist (T+25s)
  // The system realizes Jehangir Cath Lab is occupied or vitals demand immediate highest tier.
  setTimeout(() => {
    const betterHospital = MOCK_HOSPITALS.find(h => h.id === "H-01"); // Ruby Hall (Has Cath Lab)
    
    io.emit('routing:reroute', {
      sim_id: "Sim_01",
      reason: "🚨 CRITICAL VITALS: Patient requires immediate Cardiologist & Cath Lab. Cath Lab at previous destination occupied.",
      new_assigned_hospital: betterHospital,
      ambulance: MOCK_AMBULANCE
    });
    console.log("📣 Emitted [routing:reroute] - Redirected to " + betterHospital.name);
  }, 25000);

  return { success: true, session: "Sim_01_Active" };
};

export const stopSim01 = () => {
    if (ActiveSimulations.has("Sim_01_Interval")) clearInterval(ActiveSimulations.get("Sim_01_Interval"));
    ActiveSimulations.clear();
    console.log("⏹️ Simulation 01 Halted");
};
