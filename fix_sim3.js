const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'backend', 'api', 'simEngine.js');
let content = fs.readFileSync(file, 'utf-8');

// A function to interpolate points for the polyline route
const geojsonGen = `
function generateRoute(startLat, startLng, endLat, endLng) {
  // Just a simple 2-point straight line for demo purposes
  return [
    [startLng, startLat],
    [endLng, endLat]
  ];
}

// Simple interpolation for moving the ambulance
function animateAmbulance(io, ambId, routeCoords, steps, durationMs) {
  if (routeCoords.length < 2) return;
  const start = routeCoords[0];
  const end = routeCoords[1];
  
  const stepMs = durationMs / steps;
  const deltaLng = (end[0] - start[0]) / steps;
  const deltaLat = (end[1] - start[1]) / steps;
  
  let currentStep = 0;
  const animInterval = setInterval(() => {
    currentStep++;
    if (currentStep > steps) {
      clearInterval(animInterval);
      return;
    }
    const newLng = start[0] + (deltaLng * currentStep);
    const newLat = start[1] + (deltaLat * currentStep);
    
    io.emit('ambulance:location_broadcast', {
      ambulance_id: ambId,
      lat: newLat,
      lng: newLng
    });
  }, stepMs);
  
  return animInterval;
}
`;

// Replace `export const runSim01...` with a much more robust version that handles the map line and moving the marker
const newRunSim = `${geojsonGen}
export const runSim01 = (io) => {
  console.log("▶️ Initiating Sim_01: Severe Heart Attack (Myocardial Infarction)");
  
  if (ActiveSimulations.has("Sim_01")) {
    console.log("Simulation 01 already running!");
    return { success: false, message: "Simulation active" };
  }
  
  ActiveSimulations.set("Sim_01", true);

  // Initial routing to the scene
  const sceneLat = MOCK_PATIENT.lat;
  const sceneLng = MOCK_PATIENT.lng;
  const h2 = MOCK_HOSPITALS.find(h => h.id === "H-02"); // Jehangir (close, no cath lab)
  const h1 = MOCK_HOSPITALS.find(h => h.id === "H-01"); // Ruby Hall (far, has cath lab)

  setTimeout(() => {
    const routeToScene = generateRoute(MOCK_AMBULANCE.lat, MOCK_AMBULANCE.lng, sceneLat, sceneLng);
    
    io.emit('routing:decision', {
      sim_id: "Sim_01",
      ambulance: { ...MOCK_AMBULANCE, route: routeToScene },
      patient: MOCK_PATIENT,
      assigned_hospital: h2,
    });
    
    // Animate ambulance to scene (takes 10s)
    const anim = animateAmbulance(io, "AMB-002", routeToScene, 20, 10000);
    ActiveSimulations.set("Sim_01_Anim1", anim);
    console.log("📣 Emitted [routing:decision] - Assigned hospital: " + h2.name);
  }, 2000);

  // 2. Patient Loaded & Head to Jehangir (T+15s)
  setTimeout(() => {
    console.log("📣 Patient Loaded. Emitting vitals and heading to Jehangir.");
    io.emit('ambulance:status', { id: "AMB-002", status: "EN_ROUTE" });
    
    const routeToH2 = generateRoute(sceneLat, sceneLng, h2.lat, h2.lng);
    // Update the map's visible route line
    io.emit('ambulance:location_broadcast', {
      ambulance_id: "AMB-002",
      lat: sceneLat,
      lng: sceneLng,
      route: routeToH2 // Custom addition to make the frontend redraw the line
    });

    // Patient Monitor (Frontend Tab C) is now responsible for pushing vitals via REST to the backend.
    // Backend will just broadcast them when received.
    
    // Animate ambulance to Jehangir (takes 15s) - it will be interrupted by the reroute
    const anim = animateAmbulance(io, "AMB-002", routeToH2, 30, 15000);
    ActiveSimulations.set("Sim_01_Anim2", anim);
  }, 15000);

  // 3. Dynamic Rerouting - The Twist (T+25s)
  setTimeout(() => {
    // Stop the previous animation
    if(ActiveSimulations.has("Sim_01_Anim2")) clearInterval(ActiveSimulations.get("Sim_01_Anim2"));
    
    // We don't know exactly where it is, let's just make it head straight to Ruby
    // from roughly halfway to Jehangir.
    const midLat = (sceneLat + h2.lat) / 2;
    const midLng = (sceneLng + h2.lng) / 2;
    const routeToH1 = generateRoute(midLat, midLng, h1.lat, h1.lng);
    
    io.emit('routing:reroute', {
      sim_id: "Sim_01",
      reason: "🚨 CRITICAL VITALS: Patient requires immediate Cardiologist & Cath Lab. Cath Lab at previous destination occupied.",
      new_assigned_hospital: h1,
      patient: MOCK_PATIENT,
      ambulance: { ...MOCK_AMBULANCE, route: routeToH1, lat: midLat, lng: midLng }
    });
    console.log("📣 Emitted [routing:reroute] - Redirected to " + h1.name);
    
    // Animate to Ruby Hall
    const anim = animateAmbulance(io, "AMB-002", routeToH1, 20, 10000);
    ActiveSimulations.set("Sim_01_Anim3", anim);
  }, 25000);

  // 4. Arrived (T+36s)
  setTimeout(() => {
    io.emit('hospital:status_update', { id: "H-01", message: "ARRIVED: Requesting Stretcher and Cardiac Defibrillator." });
    console.log("📣 Arrived at Ruby Hall");
    stopSim01();
  }, 36000);

  return { success: true, session: "Sim_01_Active" };
};`;

content = content.replace(/export const runSim01 = \(\w+\) => \{[\s\S]+?return \{ success: true, session: "Sim_01_Active" \};\s*\};/, newRunSim);

fs.writeFileSync(file, content);
console.log('Fixed simEngine.js sequence mapping and animation.');
