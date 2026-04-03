(Get-Content -Path 'd:\Projects\AURUM\frontend\src\components\shared\MapEmbed.jsx' -Raw) -replace '(?s)\{\/\* Hospitals \*\/.*?\)\}\)', '{/* Hospitals */}
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
                strokeColor: ''#ffffff'',
                scale: isTarget ? 10 : 5
              }}
            >
              {activeMarker === h.id && (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                  <div style={{ fontFamily: ''Inter, sans-serif'', minWidth: 200, color: ''#1f2937'' }}>
                    <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 6 }}>{h.name}</div>
                    <div style={{ fontSize: 11, lineHeight: 1.6 }}>
                      <div>Dist: <b>{currentDistance.toFixed(1)} km</b></div>
                      <div>ICU: <b>{h.avail_icu_beds}/{h.total_icu_beds}</b></div>
                      <div>Load: <b style={{ color: h.current_load_pct >= 90 ? ''#e84545'' : h.current_load_pct >= 70 ? ''#f59e0b'' : ''#10b981'' }}>{h.current_load_pct}%</b></div>
                      {pat.length > 0 && <div className="text-rose-600 mt-1">⚡ {pat.length} incoming</div>}
                    </div>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          );
        })}' | Set-Content -Path 'd:\Projects\AURUM\frontend\src\components\shared\MapEmbed.jsx'
