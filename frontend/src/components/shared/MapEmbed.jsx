import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useStore } from '../../hooks/useStore';
import { SEVERITY_MAP } from '../../data/mockData';

// Fix leaflet default icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function hospitalIcon(loadPct, isTarget = false) {
  const color = loadPct >= 90 ? '#e84545' : loadPct >= 70 ? '#f59e0b' : '#10b981';
  const size  = isTarget ? 20 : 14;
  const ring  = isTarget ? 28 : 20;
  return L.divIcon({
    className: '',
    html: `<div style="position:relative;width:${ring}px;height:${ring}px;display:flex;align-items:center;justify-content:center;">
      <div style="position:absolute;inset:0;border-radius:50%;background:${color}22;${isTarget ? `animation:ping 2s infinite;` : ''}"></div>
      <div style="width:${size}px;height:${size}px;border-radius:50%;background:${color};border:2px solid ${isTarget ? '#fff' : color + '88'};box-shadow:0 0 ${isTarget ? 10 : 6}px ${color}88;"></div>
    </div>`,
    iconSize:   [ring, ring],
    iconAnchor: [ring / 2, ring / 2],
  });
}

function ambulanceIcon(severity) {
  const meta  = SEVERITY_MAP[severity] || SEVERITY_MAP[2];
  return L.divIcon({
    className: '',
    html: `<div style="position:relative;width:24px;height:24px;display:flex;align-items:center;justify-content:center;">
      <div style="position:absolute;inset:0;border-radius:50%;background:${meta.color}33;animation:ping 1.5s infinite;"></div>
      <div style="width:16px;height:16px;border-radius:4px;background:${meta.color};border:2px solid #fff;box-shadow:0 0 8px ${meta.color}99;font-size:8px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;">🚑</div>
    </div>`,
    iconSize:   [24, 24],
    iconAnchor: [12, 12],
  });
}

export default function MapEmbed({ targetHospitalId, height = '100%', showAllHospitals = true }) {
  const hospitals  = useStore(s => s.hospitals);
  const ambulances = useStore(s => s.ambulances);
  const patients   = useStore(s => s.patients);
  const center     = [19.0400, 72.8500];

  const activeAmbulances = ambulances.filter(a => a.status === 'en_route_to_hospital' || a.status === 'on_scene');

  return (
    <MapContainer center={center} zoom={12} style={{ height, width: '100%', zIndex: 0 }} preferCanvas={true}>
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        maxZoom={19}
      />

      {/* Hospitals */}
      {(showAllHospitals ? hospitals : hospitals.filter(h => h.id === targetHospitalId)).map(h => {
        const isTarget = h.id === targetHospitalId;
        const pat = patients.filter(p => p.assigned_hospital_id === h.id);
        return (
          <Marker key={h.id} position={[h.lat, h.lng]} icon={hospitalIcon(h.current_load_pct, isTarget)}>
            <Popup>
              <div style={{ fontFamily: 'Inter, sans-serif', minWidth: 200 }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: '#e8ecef', marginBottom: 6 }}>{h.name}</div>
                <div style={{ fontSize: 11, color: '#7a8a9a', lineHeight: 1.6 }}>
                  <div>ICU: <b style={{ color: '#e8ecef' }}>{h.avail_icu_beds}/{h.total_icu_beds}</b></div>
                  <div>Load: <b style={{ color: h.current_load_pct >= 90 ? '#e84545' : h.current_load_pct >= 70 ? '#f59e0b' : '#10b981' }}>{h.current_load_pct}%</b></div>
                  {h.has_trauma_centre && <div style={{ color: '#10b981', marginTop: 4 }}>✓ Trauma Centre</div>}
                  {h.has_neurosurgery  && <div style={{ color: '#10b981' }}>✓ Neurosurgery</div>}
                  {pat.length > 0      && <div style={{ color: '#e84545', marginTop: 4 }}>⚡ {pat.length} incoming</div>}
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}

      {/* Ambulances + Route Lines */}
      {activeAmbulances.map(amb => {
        const patient  = patients.find(p => p.id === amb.active_patient_id);
        const hospital = hospitals.find(h => h.id === amb.assigned_hospital_id);
        const severity = patient?.predicted_severity || 2;
        return (
          <React.Fragment key={amb.id}>
            <Marker position={[amb.current_lat, amb.current_lng]} icon={ambulanceIcon(severity)}>
              <Popup>
                <div style={{ fontFamily: 'Inter, sans-serif', minWidth: 180 }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: '#e8ecef' }}>{amb.call_sign}</div>
                  {patient && (
                    <div style={{ fontSize: 11, color: '#7a8a9a', marginTop: 4, lineHeight: 1.6 }}>
                      <div>Patient: <b style={{ color: '#e8ecef' }}>{patient.session_code}</b></div>
                      <div>SRS: <b style={{ color: '#8b5cf6' }}>{Math.round(patient.survivability_score * 100)}%</b></div>
                      <div style={{ marginTop: 4 }}>En route to: <b style={{ color: '#e8ecef' }}>{hospital?.name}</b></div>
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
            {hospital && (
              <Polyline
                positions={[[amb.current_lat, amb.current_lng], [hospital.lat, hospital.lng]]}
                color={SEVERITY_MAP[severity]?.color || '#3b82f6'}
                weight={2.5}
                dashArray="6 8"
                opacity={0.75}
              />
            )}
          </React.Fragment>
        );
      })}
    </MapContainer>
  );
}
