const https = require('https');
const options = {
  hostname: 'client.valhalla.mapzen.com',
  port: 443,
  path: '/route?json={"locations":[{"lat":18.5204,"lon":73.8567},{"lat":18.5360,"lon":73.8785}],"costing":"auto"}&api_key=valhalla-',
  method: 'GET'
};
https.get(options, (res) => {
  console.log(res.statusCode);
});