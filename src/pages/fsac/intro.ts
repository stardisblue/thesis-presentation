import { html } from 'htl';
import { PageData, PageObject } from '../../pages';
import data from './intro/siprojuris.json';
import L from 'leaflet';
import { density2d } from 'fast-kde';
import { range } from '@observablehq/inputs';
import _ from 'lodash';
import movieUrl from './intro/FSAC.mp4';
import md from '../../md';
import { franceMap } from './intro/franceMap';
import { heatmapGradient } from './intro/heatmapGradient';
import { fsac } from 'fsac';
import { mergeFactory } from './intro/fsac';

const points = data.map((v) => ({
  id: v.id,
  loc_id: v.localisation.id,
  lat: v.localisation.lat,
  lng: v.localisation.lng,
}));

const sortedPlaces = _(points)
  .groupBy('loc_id')
  .orderBy((v) => v.length, 'desc')
  .map((v) => v[0])
  .value();

export const topdata: PageObject = {
  title: `Données Spatiales`,
  content: () => html.fragment`<p>
      Top 20 des lieux ayant le plus<br />
      d'évènements dans Siprojuris
    </p>
    <p>Marqueur = donnée spatiale</p>`,
  background: (_o: PageData, $background: HTMLDivElement) => {
    const map = franceMap($background);
    L.layerGroup(sortedPlaces.slice(0, 20).map((m) => L.marker(m))).addTo(map);
  },
};

export const fulldata: PageObject = {
  title: `Exemple d’encombrement`,
  content: html` <p>Tous les lieux du jeux de données Siprojuris</p>
    <p>Données masquées</p>
    <p>Differences de densité difficile à distinguer</p>`,
  background: (_o: PageData, $background: HTMLDivElement) => {
    const markers = _.uniqBy(points, 'loc_id');

    const map = franceMap($background);
    L.layerGroup(markers.map((m) => L.marker(m))).addTo(map);
  },
};

export const heatmapdata = () => {
  return {
    title: `Carte de chaleur`,
    content: html`<p>Densité des évènements de Siprojuris</p>
      <p>Couleur pour représenter la densité</p>
      <p>Densités faibles difficilement visibles</p>
      <p>Points individuelles non visibles</p>
      <p>Fast KDE (Heer et al. 2021)</p>`,
    background: (_o: PageData, $background: HTMLDivElement) => {
      const map = franceMap($background);

      const $bandwidth = range([0, 50], {
        label: 'bandwidth',
        step: 1,
        value: 25,
      });
      $bandwidth.classList.add('inputs');
      $background.parentNode!.append(
        html`<div class="absolute" style="right: 2em; top: 2em;">
          ${$bandwidth}
        </div>`
      );

      $bandwidth.addEventListener('input', () => {
        zoomend();
      });

      $bandwidth.addEventListener('pointerup', (e) => e.stopPropagation());

      let canvas: HTMLCanvasElement;
      function zoomend() {
        if (canvas) map.getPanes().overlayPane.removeChild(canvas);
        const size = map.getSize();
        canvas = density2d(
          points.map((point) => map.latLngToLayerPoint(point)),
          {
            x: 'x',
            y: (d: L.Point) => size.y - d.y,
            bandwidth: $bandwidth.value === 0 ? undefined : $bandwidth.value,
            extent: [
              [0, size.x],
              [0, size.y],
            ],
            bins: [size.x, size.y],
          }
        ).heatmap({ color: heatmapGradient });
        (<any>map)._panes.overlayPane.appendChild(canvas);
      }

      map.on('zoomend', zoomend);
      zoomend();
    },
  };
};

export const echantillonage = () => {
  const $bandwidth = range([1, sortedPlaces.length], {
    label: 'Top',
    step: 1,
    value: 20,
  });

  const $nombre = html`<span>20</span>`;

  return {
    title: `Echantillonage`,
    content: html`<p>
        Top ${$nombre} des lieux ayant le plus<br />
        d'évènements dans Siprojuris
      </p>
      <p>Vision partielle des données</p>`,
    background: (_o: PageData, $background: HTMLDivElement) => {
      const markers = _(points)
        .groupBy('loc_id')
        .orderBy((v) => v.length, 'desc')
        .slice(0, 20)
        .map((v) => v[0])
        .value(); // otherwise its totally dies

      const map = franceMap($background);
      let group = L.layerGroup(markers.map((m) => L.marker(m))).addTo(map);

      $bandwidth.classList.add('inputs');
      $background.parentNode!.append(
        html`<div class="absolute" style="right: 2em; top: 2em;">
          ${$bandwidth}
        </div>`
      );

      $bandwidth.addEventListener('input', () => {
        group.remove();

        group = L.layerGroup(
          sortedPlaces.slice(0, $bandwidth.value).map((m) => L.marker(m))
        ).addTo(map);
        $nombre.innerHTML = $bandwidth.value;
      });

      $bandwidth.addEventListener('pointerup', (e) => e.stopPropagation());
    },
  };
};

export const sacvideo: PageObject = {
  background: (_o, $background) => {
    $background.style.zIndex = '0';
    return html`<video width="100%" height="100%" controls>
      <source src="${movieUrl}" type="video/mp4" />
    </video>`;
  },
};

export const sac: PageObject = {
  template: 'title',
  //   title: html`<span style="visibility:hidden">FSAC</span>`,
  content: md`
Préserver l’information spatiale des données

Afficher l’ensemble des données
  `,
  background: (_o, $background) => {
    const map = franceMap($background);

    let group = L.layerGroup().addTo(map);

    function zoomend() {
      const [Cluster, merge] = mergeFactory(5, 0);

      const pointsSAC = fsac(
        points.map((point) => {
          const { x, y } = map.latLngToLayerPoint(point);
          return Cluster(x, y, 1);
        }),
        { merge }
      );

      // bulk adding seems to always be faster
      group.remove();
      group = L.layerGroup(
        pointsSAC.map((point) =>
          L.circleMarker(map.layerPointToLatLng(point as any), {
            radius: point.r - 0,
            weight: 1,
            color: 'blue',
          })
        )
      ).addTo(map);
    }

    map.on('zoomend', zoomend);
    zoomend();
  },
};

export default [topdata, fulldata, heatmapdata, echantillonage, sacvideo, sac];
