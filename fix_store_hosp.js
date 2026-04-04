const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'frontend', 'src', 'hooks', 'useStore.js');
let content = fs.readFileSync(file, 'utf-8');

content = content.replace(
  `        socket.on('hospital:status_update', (hospital) => {
          console.log('[AURUM] 🚨 Hospital Sync Received:', hospital);        
          set(state => ({
            hospitals: state.hospitals.map(h =>
              h.id === hospital.id ? { ...h, ...hospital } : h
            )
          }));
        });`,
  `        socket.on('hospital:status_update', (hospital) => {
          console.log('[AURUM] 🚨 Hospital Sync Received:', hospital);        
          
          if (hospital.message) {
            get().addNotification({
              type: 'critical',
              title: 'AMBULANCE ARRIVED',
              message: hospital.message
            });
          }

          set(state => ({
            hospitals: state.hospitals.map(h =>
              h.id === hospital.id ? { ...h, ...hospital } : h
            )
          }));
        });`
);

fs.writeFileSync(file, content);
console.log('Fixed useStore hospital status event');
