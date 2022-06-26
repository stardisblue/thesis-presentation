import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

export const tweaked_bounds: [[number, number], [number, number]] = [
  [41.35846792339617, -19.829641482074102],
  [51.08975448772439, 9.55682784139207],
];

export function franceMap(container: HTMLDivElement) {
  const map = L.map(container, {
    zoomControl: false,
    zoomSnap: 0.01,
    renderer: L.canvas(),
  }).fitBounds(tweaked_bounds, { maxZoom: 5.4 });
  // L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  //   attribution:
  //     "© <a href=https://www.openstreetmap.org/copyright>OpenStreetMap</a> contributors"
  // }).addTo(map);
  L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19,
    }
  ).addTo(map);

  return map;
}
