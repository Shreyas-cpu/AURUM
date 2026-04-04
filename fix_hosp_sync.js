const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'frontend', 'src', 'hooks', 'useStore.js');
let content = fs.readFileSync(file, 'utf-8');

// Update socket.on('routing:decision') to properly mutate the `ambulances` array
content = content.replace(
  `          get().updatePatientRouting(pId, hId, data.survivability_score);
          
          if (data.ambulance) {
            get().setActiveAmbulanceId(data.ambulance.id);
          }`,
  `          get().updatePatientRouting(pId, hId, data.survivability_score);
          
          if (data.ambulance) {
            get().setActiveAmbulanceId(data.ambulance.id);
            set(state => ({
              ambulances: state.ambulances.map(a => 
                a.id === data.ambulance.id ? { 
                  ...a, 
                  assigned_hospital_id: hId,
                  active_patient_id: pId,
                  status: 'en_route_to_hospital', // Ensures HospitalOverview picks it up
                  route: data.ambulance.route
                } : a
              )
            }));
          }`
);

// Update socket.on('routing:reroute') to properly update the ambulance route and assigned_hospital_id
content = content.replace(
  `          if (data.patient && data.new_assigned_hospital) {
            get().updatePatientRouting(data.patient.id, data.new_assigned_hospital.id, null);
          }`,
  `          if (data.patient && data.new_assigned_hospital) {
            get().updatePatientRouting(data.patient.id, data.new_assigned_hospital.id, null);
          }
          
          if (data.ambulance && data.new_assigned_hospital) {
            set(state => ({
              ambulances: state.ambulances.map(a => 
                a.id === data.ambulance.id ? { 
                  ...a, 
                  assigned_hospital_id: data.new_assigned_hospital.id,
                  route: data.ambulance.route
                } : a
              )
            }));
          }`
);

// Update route on location broadcast if it exists
content = content.replace(
  `        socket.on('ambulance:location_broadcast', (data) => {
          console.log('[AURUM] 🚑 Ambulance Location Update:', data);
          get().updateAmbulanceLocation(data.ambulance_id, data.lat, data.lng); 
        });`,
  `        socket.on('ambulance:location_broadcast', (data) => {
          // Keep logging quiet as it's spammy during animation
          get().updateAmbulanceLocation(data.ambulance_id, data.lat, data.lng); 
          if(data.route) {
            set(state => ({
              ambulances: state.ambulances.map(a => 
                a.id === data.ambulance_id ? { ...a, route: data.route } : a
              )
            }));
          }
        });`
);

fs.writeFileSync(file, content);
console.log('Fixed ambulance store sync for HospitalOverview render logic');
