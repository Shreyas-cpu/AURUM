const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'backend', 'api', 'simEngine.js');
let content = fs.readFileSync(file, 'utf-8');

// Replace `generateRoute` to create city-grid Manhattan routes
const advancedRoute = `// Fake City Route Generator - Creates a zig-zag L-shaped pathway imitating city blocks
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
}`;

const oldRouteRegex = /function generateRoute[\s\S]+?return animInterval;\s*\}/;

content = content.replace(oldRouteRegex, advancedRoute);

fs.writeFileSync(file, content);
console.log('Fixed routing geometry mapping.')
