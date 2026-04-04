const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'frontend', 'src', 'components', 'shared', 'MapEmbed.jsx');
let content = fs.readFileSync(file, 'utf-8');

// The `MapEmbed` currently overrides route points with a hardcoded [[a.lng, a.lat], [h.lng, h.lat]]
// We want it to use `a.route` directly if available.
content = content.replace(
  /coordinates: \[\[a\.current_lng, a\.current_lat\], \[h\.lng, h\.lat\]\]/g,
  `coordinates: a.route ? a.route : [[a.current_lng, a.current_lat], [h.lng, h.lat]]`
);

// Only show the active hospital of an ambulance if there's an active one, OR max 15.
// Let's modify displayHospitals calculation in useMemo
const memoblockRegex = /const displayHospitals = useMemo\(\(\) => \{[\s\S]+?return visible;[\n\r\s]+}, \[targetHospitalId, showAllHospitals, hospitals\]\);/;

const newMemoBlock = `const displayHospitals = useMemo(() => {
    // If there is an active ambulance that has a designated hospital, ONLY show that hospital for focus.
    const activeRouteHosps = new Set(ambulances.filter(a => ['en_route_to_hospital', 'en_route'].includes(a.status) && a.assigned_hospital_id).map(a => a.assigned_hospital_id));
    
    if (activeRouteHosps.size > 0 && targetHospitalId) {
      return hospitals.filter(h => activeRouteHosps.has(h.id) || h.id === targetHospitalId);
    }
    
    if (activeRouteHosps.size > 0) {
      return hospitals.filter(h => activeRouteHosps.has(h.id));
    }

    if (targetHospitalId) {
      return hospitals.filter(h => h.id === targetHospitalId);
    }

    // Default: Limit to 15 important hospitals
    return hospitals.slice(0, 15);
  }, [targetHospitalId, showAllHospitals, hospitals, ambulances]);`;

content = content.replace(memoblockRegex, newMemoBlock);

fs.writeFileSync(file, content);
console.log('Fixed MapEmbed route and hospital filtering logic.');