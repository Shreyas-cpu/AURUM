import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';

const mockMumbaiHospitals = [
  { id: 'm1', name: 'Lilavati Hospital', lat: 19.0505, lng: 72.8259, capacityStatus: 'green', beds: 250, ventilators: 40, specialties: ['Cardiology', 'Neurology'] },
  { id: 'm2', name: 'KEM Hospital', lat: 19.0034, lng: 72.8413, capacityStatus: 'red', beds: 1800, ventilators: 150, specialties: ['Trauma', 'General'] },
  { id: 'm3', name: 'Tata Memorial', lat: 19.0035, lng: 72.8465, capacityStatus: 'yellow', beds: 600, ventilators: 100, specialties: ['Oncology'] },
  { id: 'm4', name: 'Breach Candy', lat: 18.9664, lng: 72.8055, capacityStatus: 'green', beds: 150, ventilators: 30, specialties: ['Surgery', 'Obstetrics'] },
  { id: 'm5', name: 'Lokmanya Tilak (Sion)', lat: 19.0348, lng: 72.8624, capacityStatus: 'red', beds: 1400, ventilators: 120, specialties: ['Pediatrics', 'Trauma'] },
  { id: 'm6', name: 'Hinduja Hospital', lat: 19.0322, lng: 72.8385, capacityStatus: 'yellow', beds: 350, ventilators: 60, specialties: ['Orthopedics', 'Pulmonology'] },
];

const createCustomIcon = (status) => {
  const colors = {
    green: 'bg-emerald-500 shadow-emerald-500/50',
    yellow: 'bg-amber-400 shadow-amber-400/50',
    red: 'bg-rose-500 shadow-rose-500/50',
  };

  const bgClass = colors[status] || colors.green;

  return L.divIcon({
    className: 'custom-icon',
    html: `<div class="relative w-6 h-6 flex items-center justify-center">
             <div class="absolute inset-0 rounded-full ${bgClass} opacity-40 animate-ping"></div>
             <div class="relative w-4 h-4 rounded-full border-2 border-white ${bgClass} shadow-lg"></div>
           </div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

export default function Map({ hospitals = [], activeDispatches = [] }) {
  const mapCenter = [19.0760, 72.8777]; // Mumbai center

  const displayHospitals = hospitals.length > 0 ? hospitals : mockMumbaiHospitals;

  return (
    <MapContainer center={mapCenter} zoom={12} style={{ height: "100%", width: "100%", zIndex: 0 }}>
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />

      {displayHospitals.map(h => {
        // assign mock status if not present
        const status = h.capacityStatus || (h.beds > 500 ? 'red' : h.beds > 200 ? 'yellow' : 'green');

        return (
          <Marker key={h.id} position={[h.lat, h.lng]} icon={createCustomIcon(status)}>
            <Popup className="hospital-popup">
              <div className="font-sans min-w-[200px]">
                <div className="flex items-center justify-between mb-2">
                  <strong className="text-lg text-gray-800 leading-tight">{h.name}</strong>
                  <span className={`flex items-center space-x-1 px-2 py-0.5 rounded-full text-xs font-bold uppercase
                  ${status === 'green' ? 'bg-emerald-100 text-emerald-700' : ''}
                  ${status === 'yellow' ? 'bg-amber-100 text-amber-700' : ''}
                  ${status === 'red' ? 'bg-rose-100 text-rose-700' : ''}
                  `}>
                  <span>{status === 'green' ? 'Low' : status === 'yellow' ? 'Med' : 'High'}</span>
                </span>
              </div>
              <div className="text-sm text-gray-600 mb-1">
                <div className="flex justify-between border-b pb-1"><span>Target Beds:</span> <strong>{h.beds}</strong></div>
                <div className="flex justify-between pt-1"><span>Ventilators:</span> <strong>{h.ventilators}</strong></div>
              </div>
              {h.specialties && (
                <div className="mt-2 text-xs text-blue-600 font-medium">
                  {h.specialties.join(" • ")}
                </div>
              )}
            </div>
          </Popup>
          </Marker>
  );
})}

{
  activeDispatches.map((dispatch, idx) => {
    // If we are using mock data and dispatch refers to a hospital not in displayHospitals, we might not find it
    const hospital = displayHospitals.find(h => h.id === dispatch.hospital_id);
    if (!hospital) return null;

    const positions = [
      [dispatch.ambulance.lat, dispatch.ambulance.lng],
      [hospital.lat, hospital.lng]
    ];

    return (
      <React.Fragment key={idx}>
        <Marker position={[dispatch.ambulance.lat, dispatch.ambulance.lng]}>
          <Popup>
            <div className="font-sans">
              <strong>Ambulance Unit</strong><br />
              Severity: <span className="text-rose-500 font-bold">{dispatch.prediction.severity}</span><br />
              Destination: {hospital.name}
            </div>
          </Popup>
        </Marker>
        <Polyline positions={positions} color="#f43f5e" weight={3} dashArray="5, 8" className="animate-pulse" />
      </React.Fragment>
    );
  })
}
    </MapContainer >
  );
}
