import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function Map({ hospitals, activeDispatches }) {
  const mapCenter = [18.5204, 73.8567]; // Hardcoded default city center (Pune)

  return (
    <MapContainer center={mapCenter} zoom={13} style={{ height: "100%", width: "100%", zIndex: 0 }}>
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      
      {hospitals.map(h => (
        <Marker key={h.id} position={[h.lat, h.lng]}>
          <Popup>
            <div className="font-sans">
              <strong className="text-lg text-gray-800">{h.name}</strong><br/>
              <span className="text-gray-600">Beds: {h.beds} | Ventilators: {h.ventilators}</span><br/>
              <span className="text-xs uppercase font-bold text-teal-600 mt-1 block">{h.specialties.join(", ")}</span>
            </div>
          </Popup>
        </Marker>
      ))}

      {activeDispatches.map((dispatch, idx) => {
        const hospital = hospitals.find(h => h.id === dispatch.hospital_id);
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
                  <strong>Ambulance Unit</strong><br/>
                  Severity: <span className="text-red-500 font-bold">{dispatch.prediction.severity}</span><br/>
                  Destination: {hospital.name}
                </div>
              </Popup>
            </Marker>
            <Polyline positions={positions} color="#D12B2B" weight={4} dashArray="6, 8" className="animate-pulse" />
          </React.Fragment>
        );
      })}
    </MapContainer>
  );
}
