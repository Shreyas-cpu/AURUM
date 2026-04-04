import React, { useState, useCallback, useMemo } from 'react';
import Map, { Marker, Popup, NavigationControl, FullscreenControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useStore } from '../../hooks/useStore';

const STADIA_API_KEY = 'b95e9c8a-9839-4bcf-8836-83bad4afe0b2';
const MAP_STYLE = `https://tiles.stadiamaps.com/styles/alidade_smooth.json?api_key=${STADIA_API_KEY}`;

function getDistance(lat1, lon1, lat2, lon2) {
  const p = 0.017453292519943295;
  const c = Math.cos;
  const a = 0.5 - c((lat2 - lat1) * p) / 2 +
    c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p)) / 2;
  return 12742 * Math.asin(Math.sqrt(a)); 
}

export default function MapEmbed({ targetHospitalId, height = '100%', showAllHospitals = true }) {
  const hospitals = useStore(s => s.hospitals);
  const ambulances = useStore(s => s.ambulances);
  const patients = useStore(s => s.patients);
  const center = useMemo(() => ({ lat: 18.5204, lng: 73.8567 }), []);

  const [popupInfo, setPopupInfo] = useState(null);

  const [viewState, setViewState] = useState({
    longitude: center.lng,
    latitude: center.lat,
    zoom: 12,
    pitch: 45, // 2.5D building view
    bearing: -17.6,
  });

  const displayHospitals = useMemo(() => {
    let visible = showAllHospitals ? hospitals : hospitals.filter(h => h.id === targetHospitalId);
    
    // Filter to only hospitals within 15 km of any ambulance
    if (ambulances && ambulances.length > 0) {
      visible = visible.filter(h => {
        return ambulances.some(a => {
          const dist = getDistance(a.current_lat, a.current_lng, h.lat, h.lng);
          return dist <= 15;
        });
      });
    }

    return visible;
  }, [hospitals, showAllHospitals, targetHospitalId, ambulances]);

  const handleMapLoad = useCallback((evt) => {
    const map = evt.target;
    // Add 3D buildings layer for Stadia Maps
    if (!map.getLayer('3d-buildings')) {
      map.addLayer(
        {
          id: '3d-buildings',
          source: 'openmaptiles',
          'source-layer': 'building',
          type: 'fill-extrusion',
          minzoom: 15,
          paint: {
            'fill-extrusion-color': '#e4e0df',
            'fill-extrusion-height': [
              'interpolate', ['linear'], ['zoom'],
              15, 0,
              15.05, ['get', 'render_height']
            ],
            'fill-extrusion-base': [
              'interpolate', ['linear'], ['zoom'],
              15, 0,
              15.05, ['get', 'render_min_height']
            ],
            'fill-extrusion-opacity': 0.8,
          },
        }
      );
    }
  }, []);

  return (
    <div style={{ height, width: '100%', position: 'relative' }}>
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        style={{ width: '100%', height: '100%' }}
        mapStyle={MAP_STYLE}
        onLoad={handleMapLoad}
      >
        <NavigationControl position="top-right" />
        <FullscreenControl position="top-right" />

        {/* Hospitals */}
        {displayHospitals.map(h => {
          const isTarget = h.id === targetHospitalId;
          const pts = patients.filter(p => p.assigned_hospital_id === h.id);

          return (
            <Marker
              key={h.id}
              longitude={h.lng}
              latitude={h.lat}
              anchor="center"
              onClick={e => {
                e.originalEvent.stopPropagation();
                setPopupInfo({ type: 'hospital', data: h, patients: pts });
              }}
            >
              <div
                style={{
                  width: isTarget ? '24px' : '16px',
                  height: isTarget ? '24px' : '16px',
                  borderRadius: '50%',
                  backgroundColor: '#ef4444', // red dot
                  border: isTarget ? '3px solid white' : '2px solid white',
                  cursor: 'pointer',
                  boxShadow: '0 0 10px rgba(0,0,0,0.3)',
                }}
              />
            </Marker>
          );
        })}

        {/* Ambulances */}
        {ambulances.map(a => (
          <Marker
            key={a.id}
            longitude={a.current_lng}
            latitude={a.current_lat}
            anchor="center"
            onClick={e => {
              e.originalEvent.stopPropagation();
              setPopupInfo({ type: 'ambulance', data: a });
            }}
          >
            <div
              style={{
                width: '18px',
                height: '18px',
                backgroundColor: '#10b981', // green ambulance
                borderRadius: '50%',
                border: '2px solid white',
                cursor: 'pointer',
                boxShadow: '0 0 8px rgba(0,0,0,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px'
              }}
              title={a.call_sign}
            >
              🚑
            </div>
          </Marker>
        ))}

        {popupInfo && (
          <Popup
            longitude={popupInfo.type === 'hospital' ? popupInfo.data.lng : popupInfo.data.current_lng}
            latitude={popupInfo.type === 'hospital' ? popupInfo.data.lat : popupInfo.data.current_lat}
            anchor="bottom"
            onClose={() => setPopupInfo(null)}
            closeOnClick={false}
          >
            {popupInfo.type === 'hospital' ? (
              <div style={{ fontFamily: 'Inter, sans-serif', color: '#1f2937' }}>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 6 }}>{popupInfo.data.name}</div>
                <div style={{ fontSize: 11, lineHeight: 1.6 }}>
                  <div>ICU: <b>{popupInfo.data.avail_icu_beds}/{popupInfo.data.total_icu_beds}</b></div>
                  <div>Load: <b style={{ color: popupInfo.data.current_load_pct >= 90 ? '#e84545' : popupInfo.data.current_load_pct >= 70 ? '#f59e0b' : '#10b981' }}>{popupInfo.data.current_load_pct}%</b></div>
                  {popupInfo.patients?.length > 0 && <div className="text-rose-600 mt-1">⚡ {popupInfo.patients.length} incoming</div>}
                </div>
              </div>
            ) : (
              <div style={{ fontFamily: 'Inter, sans-serif', color: '#1f2937' }}>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 6 }}>{popupInfo.data.call_sign}</div>
                <div style={{ fontSize: 11, lineHeight: 1.6 }}>
                  <div>Driver: <b>{popupInfo.data.driver_name}</b></div>
                  <div>Status: <b className="capitalize">{popupInfo.data.status.replace(/_/g, ' ')}</b></div>
                </div>
              </div>
            )}
          </Popup>
        )}
      </Map>
    </div>
  );
}


