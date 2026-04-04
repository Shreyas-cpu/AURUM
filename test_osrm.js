const http = require('http');
http.get('http://router.project-osrm.org/route/v1/driving/73.8567,18.5204;73.8785,18.5360?overview=full&geometries=geojson', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log(JSON.parse(data).routes[0].geometry.coordinates.length);
  });
});