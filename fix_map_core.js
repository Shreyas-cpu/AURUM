const fs = require('fs');
const file = 'd:/Projects/AURUM/frontend/src/components/shared/MapEmbed.jsx';
let content = fs.readFileSync(file, 'utf-8');

content = content.replace(
  "import Map, { Marker, Popup, NavigationControl, FullscreenControl } from 'react-map-gl/maplibre';",
  "import Map, { Marker, Popup, NavigationControl, FullscreenControl, Source, Layer } from 'react-map-gl/maplibre';"
);

content = content.replace(
  '<Map\n        {...viewState}\n        onMove={evt => setViewState(evt.viewState)}',
  '<Map\n        initialViewState={viewState}'
);

content = content.replace(
  "backgroundColor: '#10b981', // green ambulance",
  "backgroundColor: '#ef4444', // red ambulance"
);

fs.writeFileSync(file, content, 'utf-8');
console.log('Fixed MapEmbed.jsx core');
