import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useStore } from '../../hooks/useStore';
import { SEVERITY_MAP } from '../../data/mockData';
import { GoogleMap, useJsApiLoader, Marker, Polyline, InfoWindow, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = { width: '100%', height: '100%' };

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''; // Needs actual key

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: [
    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#38414e' }]
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#212a37' }]
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#9ca5b3' }]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#17263c' }]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#515c6d' }]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#17263c' }]
    }
  ],
};

function getHospitalMarkerColor(loadPct) {
  return loadPct >= 90 ? '#e84545' : loadPct >= 70 ? '#f59e0b' : '#10b981';
}

export default function MapEmbed({ targetHospitalId, height = '100%', showAllHospitals = true }) {
  const hospitals = useStore(s => s.hospitals);
  const ambulances = useStore(s => s.ambulances);
  const patients = useStore(s => s.patients);
  const center = useMemo(() => ({ lat: 19.0400, lng: 72.8500 }), []);

  const [activeMarker, setActiveMarker] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries
  });

  const activeAmbulances = ambulances.filter(a => a.status === 'en_route_to_hospital' || a.status === 'on_scene');
  const targetHospital = hospitals.find(h => h.id === targetHospitalId);

  // Directions callback
  const directionsCallback = useCallback((res) => {
    if (res !== null && res.status === 'OK') {
      setDirectionsResponse(res);
    }
  }, []);

  if (loadError) return <div className="p-4 text-red-500 bg-red-50 rounded">Map cannot be loaded right now. Ensure VITE_GOOGLE_MAPS_API_KEY is placed in your .env file.</div>;
  if (!isLoaded) return <div className="p-4 text-gray-500 animate-pulse">Loading Google Maps...</div>;

  return (
    <div style={{ height, width: '100%', position: 'relative' }}>
      {/* Missing API Key Warning */}
      {!GOOGLE_MAPS_API_KEY && (
        <div className="absolute top-2 left-2 z-10 bg-rose-50 border border-rose-200 text-rose-800 text-xs px-3 py-1.5 rounded-md shadow-md backdrop-blur-sm opacity-90 max-w-sm">
          <strong>Notice:</strong> Google Maps loaded in development mode. Add <code className="bg-rose-100 px-1 rounded">VITE_GOOGLE_MAPS_API_KEY</code> to `.env` to enable Directions and remove watermarks.
        </div>
      )}

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={12}
        options={mapOptions}
      >
        {/* Hospitals */}
        {(showAllHospitals ? hospitals : hospitals.filter(h => h.id === targetHospitalId)).map(h => {
          const isTarget = h.id === targetHospitalId;
          const pat = patients.filter(p => p.assigned_hospital_id === h.id);
          
          return (
            <Marker
              key={h.id}
              position={{ lat: h.lat, lng: h.lng }}
              onClick={() => setActiveMarker(h.id)}
              icon={{
                path: 0, // CIRCLE
                fillColor: getHospitalMarkerColor(h.current_load_pct),
                fillOpacity: 1,
                strokeWeight: isTarget ? 3 : 1,
                strokeColor: '#ffffff',
                scale: isTarget ? 10 : 6
              }}
            >
              {activeMarker === h.id && (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                  <div style={{ fontFamily: 'Inter, sans-serif', minWidth: 200, color: '#1f2937' }}>
                    <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 6 }}>{h.name}</div>
                    <div style={{ fontSize: 11, lineHeight: 1.6 }}>
                      <div>ICU: <b>{h.avail_icu_beds}/{h.total_icu_beds}</b></div>
                      <div>Load: <b style={{ color: h.current_load_pct >= 90 ? '#e84545' : h.current_load_pct >= 70 ? '#f59e0b' : '#10b981' }}>{h.current_load_pct}%</b></div>
                      {pat.length > 0 && <div className="text-rose-600 mt-1">⚡ {pat.length} incoming</div>}
                    </div>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          );
        })}

        {/* Ambulances */}
        {activeAmbulances.map(amb => {
          const patient = patients.find(p => p.id === amb.active_patient_id);
          const severity = patient?.predicted_severity || 2;
          const meta = SEVERITY_MAP[severity];
          
          return (
            <Marker
              key={amb.id}
              position={{ lat: amb.current_lat, lng: amb.current_lng }}
              onClick={() => setActiveMarker(amb.id)}
              label={{ text: "🚑", fontSize: "14px" }}
              icon={{
                path: 'M -1,0 A 1,1 0 0 0 -3,0 1,1 0 0 0 -1,0 M 1,0 A 1,1 0 0 0 3,0 1,1 0 0 0 1,0 M -3,3 Q 0,5 3,3', // Fallback shape
                fillColor: meta?.color || '#3b82f6',
                fillOpacity: 1,
                strokeWeight: 2,
                strokeColor: '#ffffff',
                scale: 5
              }}
            >
              {activeMarker === amb.id && (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                  <div style={{ fontFamily: 'Inter, sans-serif', minWidth: 150, color: '#1f2937' }}>
                    <div style={{ fontWeight: 700, fontSize: 13 }}>{amb.call_sign}</div>
                    {patient && (
                      <div style={{ fontSize: 11, marginTop: 4, lineHeight: 1.6 }}>
                        <div>Patient: <b>{patient.session_code}</b></div>
                        <div>SRS: <b style={{ color: '#8b5cf6' }}>{Math.round(patient.survivability_score * 100)}%</b></div>
                      </div>
                    )}
                  </div>
                </InfoWindow>
              )}
            </Marker>
          );
        })}

        {/* Dynamic Directions or Polylines */}
        {activeAmbulances.map(amb => {
          const hospital = hospitals.find(h => h.id === amb.assigned_hospital_id);
          const isSelectedTarget = targetHospitalId === hospital?.id || showAllHospitals;
          
          if (!hospital || !isSelectedTarget) return null;
          
          const origin = { lat: amb.current_lat, lng: amb.current_lng };
          const destination = { lat: hospital.lat, lng: hospital.lng };

          // If we have an API key, we can try using the routing service.
          // But to avoid quota explosions on every render/tick, we'll draw straight polylines as base, 
          // and only calculate Directions if explicitly requested, or we just draw Polylines for speed.
          // Here we use styled polylines for performance in real-time tracking:
          return (
            <Polyline
              key={`poly-${amb.id}`}
              path={[origin, destination]}
              options={{
                strokeColor: SEVERITY_MAP[patients.find(p => p.id === amb.active_patient_id)?.predicted_severity || 2]?.color || '#3b82f6',
                strokeOpacity: 0.8,
                strokeWeight: 3,
                icons: [{
                  icon: { path: 1, scale: 3, strokeOpacity: 1 }, // 1 is circle
                  offset: '0',
                  repeat: '20px'
                }]
              }}
            />
          );
        })}
      </GoogleMap>
    </div>
  );
}