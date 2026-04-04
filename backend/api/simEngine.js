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


// Fake City Route Generator - Creates a zig-zag L-shaped pathway imitating city blocks
function generateRoute(startLat, startLng, endLat, endLng) {
  const steps = 6;
  const path = [];
  
  // Starting point
  path.push([startLng, startLat]);
  
  // Create a zig-zag grid-like approach
  const dLat = (endLat - startLat) / steps;
  const dLng = (endLng - startLng) / steps;
  
  let curLat = startLat;
  let curLng = startLng;
  
  for(let i = 1; i < steps; i++) {
    // Alternate between horizontal and vertical dominant moves
    if (i % 2 === 0) {
      curLng += dLng * 2; // move mostly East/West
    } else {
      curLat += dLat * 2; // move mostly North/South
    }
    
    // Throw in a tiny bit of random displacement so it looks like curved city roads
    const jitterLng = (Math.random() - 0.5) * 0.002;
    const jitterLat = (Math.random() - 0.5) * 0.002;
    
    path.push([curLng + jitterLng, curLat + jitterLat]);
  }
  
  // End point
  path.push([endLng, endLat]);
  return path;
}

// Improved interpolator for moving the ambulance along a multi-point polyline smoothly
function animateAmbulance(io, ambId, routeCoords, stepsPerSegment, totalDurationMs) {
  if (routeCoords.length < 2) return;
  
  // Total segments
  const segments = routeCoords.length - 1;
  const timePerSegment = totalDurationMs / segments;
  const timePerStep = timePerSegment / stepsPerSegment;
  
  let currentSeg = 0;
  let currentStep = 0;
  
  const animInterval = setInterval(() => {
    if (currentSeg >= segments) {
      clearInterval(animInterval);
      return;
    }
    
    const start = routeCoords[currentSeg];
    const end = routeCoords[currentSeg + 1];
    
    const deltaLng = (end[0] - start[0]) / stepsPerSegment;
    const deltaLat = (end[1] - start[1]) / stepsPerSegment;
    
    const newLng = start[0] + (deltaLng * currentStep);
    const newLat = start[1] + (deltaLat * currentStep);
    
    io.emit('ambulance:location_broadcast', {
      ambulance_id: ambId,
      lat: newLat,
      lng: newLng
    });
    
    currentStep++;
    if (currentStep > stepsPerSegment) {
      currentStep = 0;
      currentSeg++;
    }
  }, timePerStep);
  
  return animInterval;
}

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
};

export const stopSim01 = () => {
    if (ActiveSimulations.has("Sim_01_Interval")) clearInterval(ActiveSimulations.get("Sim_01_Interval"));
    ActiveSimulations.clear();
    console.log("⏹️ Simulation 01 Halted");
};

