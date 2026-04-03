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

function getDistance(lat1, lon1, lat2, lon2) {
  const p = 0.017453292519943295;
  const c = Math.cos;
  const a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lon2 - lon1) * p))/2;
  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

function getGradientColor(distance, maxDistance) {
  if (maxDistance === 0) return '#10b981'; // Green
  const ratio = Math.min(1, Math.max(0, distance / maxDistance));
  const h = Math.floor((1 - ratio) * 120); // 120 is Green, 0 is Red
  return `hsl(${h}, 90%, 50%)`;
}

export default function MapEmbed({ targetHospitalId, height = '100%', showAllHospitals = true }) {
  const hospitals = useStore(s => s.hospitals);
  const ambulances = useStore(s => s.ambulances);
  const patients = useStore(s => s.patients);
  const center = useMemo(() => ({ lat: 18.5204, lng: 73.8567 }), []);

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

          const maxDistance = Math.max(...hospitals.map(hp => getDistance(center.lat, center.lng, hp.lat, hp.lng)), 1);
          const currentDistance = getDistance(center.lat, center.lng, h.lat, h.lng);

          return (
            <Marker
              key={h.id}
              position={{ lat: h.lat, lng: h.lng }}
              onClick={() => setActiveMarker(h.id)}
              icon={{
                path: 0, // CIRCLE
                fillColor: getGradientColor(currentDistance, maxDistance),
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


        </GoogleMap>
    </div>
  );
}


