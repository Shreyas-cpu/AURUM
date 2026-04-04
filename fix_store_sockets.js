const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'frontend', 'src', 'hooks', 'useStore.js');
let content = fs.readFileSync(file, 'utf-8');

content = content.replace(
  "        socket.on('routing:decision', (data) => {\n          console.log('[AURUM] 🧠 APEX/NEXUS Routing Decision:', data);\n          get().addRoutingEvent(data);\n          get().updatePatientRouting(data.patient_id, data.routed_to_hospital_id, data.survivability_score);\n          get().addNotification({\n            type: 'alert',\n            title: 'Incoming Dispatch',\n            message: `Patient ${data.patient_code || data.patient_id} routed to ${data.hospital_name || data.routed_to_hospital_id}.`,\n          });\n        });",
  `        socket.on('routing:decision', (data) => {
          console.log('[AURUM] 🧠 APEX/NEXUS Routing Decision:', data);
          get().addRoutingEvent(data);
          
          let pId = data.patient ? data.patient.id : data.patient_id;
          let hId = data.assigned_hospital ? data.assigned_hospital.id : data.routed_to_hospital_id;
          
          if (data.patient) {
            set(state => {
              const existing = state.patients.find(p => p.id === pId);
              if (!existing) {
                return { 
                  patients: [...state.patients, { ...data.patient, assigned_hospital_id: hId }],
                  activePatientId: state.activePatientId || pId
                };
              }
              return { activePatientId: state.activePatientId || pId };
            });
          }
          
          get().updatePatientRouting(pId, hId, data.survivability_score);
          
          if (data.ambulance) {
            get().setActiveAmbulanceId(data.ambulance.id);
          }

          get().addNotification({
            type: 'alert',
            title: 'Incoming Dispatch',
            message: \`Patient \${pId} routed to \${hId}.\`,
          });
        });`
);

content = content.replace(
  "        socket.on('routing:reroute', (data) => {",
  `        socket.on('routing:reroute', (data) => {
          console.log('[AURUM] 🔄 ROUTING REROUTE:', data);
          get().addRoutingEvent(data);
          
          if (data.patient && data.new_assigned_hospital) {
            get().updatePatientRouting(data.patient.id, data.new_assigned_hospital.id, null);
          }
          
          get().addNotification({
            type: 'critical',
            title: 'ROUTE CHANGED',
            message: typeof data.reason === 'string' ? data.reason : 'New destination assigned.',
          });
        });`
);

// We need to also clear out dummy data so we rely completely on the real data
fs.writeFileSync(file, content);
console.log('Fixed useStore socket listeners.');
