const fs = require('fs');
let file = 'd:/Projects/AURUM/frontend/src/components/shared/MapEmbed.jsx';
let content = fs.readFileSync(file, 'utf-8');

const routeCode = `
        {/* Ambulance Routes */}
        {ambulances.map(a => {
          if (a.assigned_hospital_id) {
            const h = hospitals.find(h => h.id === a.assigned_hospital_id);
            if (h) {
              const data = {
                type: 'Feature',
                geometry: {
                  type: 'LineString',
                  coordinates: [[a.current_lng, a.current_lat], [h.lng, h.lat]]
                }
              };
              return (
                <Source key={'src-'+a.id} id={'src-'+a.id} type="geojson" data={data}>
                  <Layer
                    id={'route-'+a.id}
                    type="line"
                    paint={{
                      'line-color': '#0ea5e9',
                      'line-width': 4,
                      'line-dasharray': [2, 2]
                    }}
                  />
                </Source>
              );
            }
          }
          return null;
        })}
`;

content = content.replace('{/* Ambulances */}', routeCode + '\n        {/* Ambulances */}');

// Add moving animation to the Ambulance marker by wrapping the dot in a bouncing/pulsing element
content = content.replace(
  "backgroundColor: '#ef4444', // red ambulance",
  `backgroundColor: '#ef4444', // red ambulance
                  animation: 'bounce-pulse 1.5s infinite',`
);

fs.writeFileSync(file, content, 'utf-8');
console.log('Added routes to MapEmbed');
