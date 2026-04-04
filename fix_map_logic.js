const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'frontend', 'src', 'components', 'shared', 'MapEmbed.jsx');
let content = fs.readFileSync(file, 'utf-8');

const regex = /const displayHospitals = useMemo\(\(\) => \{[\s\S]+?return visible;\s*\}, \[hospitals, showAllHospitals, targetHospitalId, ambulances\]\);/;

const replacement = `const displayHospitals = useMemo(() => {
    // If showAllHospitals is on, limits don't apply
    if (showAllHospitals) return hospitals;

    // Filter for active ambulances that are routing to a hospital
    const activeRouteHosps = new Set(
      ambulances
        .filter(a => ['en_route_to_hospital', 'en_route'].includes(a.status) && a.assigned_hospital_id)
        .map(a => a.assigned_hospital_id)
    );
    
    if (activeRouteHosps.size > 0 && targetHospitalId) {
      // Focus strictly on the target OR the active routing ones
      return hospitals.filter(h => activeRouteHosps.has(h.id) || h.id === targetHospitalId);
    }
    else if (activeRouteHosps.size > 0) {
      // Focus strictly on the active routing node
      return hospitals.filter(h => activeRouteHosps.has(h.id));
    }
    else if (targetHospitalId) {
      // Focus just on the selected one
      return hospitals.filter(h => h.id === targetHospitalId);
    }

    // Default: Limit to 15 important hospitals if no routing/target is happening
    return hospitals.slice(0, 15);
  }, [hospitals, showAllHospitals, targetHospitalId, ambulances]);`;

content = content.replace(regex, replacement);

fs.writeFileSync(file, content);
console.log('Fixed MapEmbed map logic directly.');