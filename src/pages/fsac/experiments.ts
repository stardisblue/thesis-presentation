import md from '../../md';
import { PageObject } from '../../pages';
import uniformUrl from './dataset/uniform_3200_0.png';
import normalUrl from './dataset/normal_3200_0.png';
import poissonUrl from './dataset/poisson_3200_0.png';
import perlinUrl from './dataset/perlin_3200_52.png';
import { html } from 'htl';
import glottolog from './dataset/glottolog.json';
import L from 'leaflet';
import tex from '../../tex';
import { bib, cite } from '../../bib';
// import realUrl from './dataset/qualitative.png';
export const experiments: PageObject = {
  title: 'Dispositif Experimental',
  content: md`
**4 Algorithmes**

> O-SAC ${cite(bib.Scheepens2014)} – **FSAC** – QUAD ${cite(
    bib.Castermans2019
  )} – QUAD+BIG ${cite(bib.Castermans2019)}

**4000 jeux de données synthétiques**

> Uniforme – Normale – Disques de poisson  – Bruit de Perlin
>
> 50 – 100 – 200 – 400 – 800 – 1600 – 3200 – 6400 – 12800 – 25600 points
>
> 100 exemplaires de chaque configuration

**8 Jeux de données réelles**
  `,
};

const datasets = [
  { label: () => 'Uniforme', url: uniformUrl },
  { label: () => 'Normale', url: normalUrl },
  {
    label: () => html.fragment`Disques de Poisson ${cite(bib.Cook1986)}`,
    url: poissonUrl,
  },
  {
    label: () => html.fragment`Bruit de Perlin ${cite(bib.Perlin1985)}`,
    url: perlinUrl,
  },
];

export const sdataset: PageObject = {
  title: 'Jeux de données synthétiques – Distributions',
  content: (_o, $container) => {
    $container.classList.add('flex');
    $container.append(
      ...datasets.map(
        (d) => html`<div class="w-25 pa2 flex flex-column justify-center">
          <img src=${d.url} />
          <p class="tc">${d.label()}</p>
        </div>`
      )
    );
  },
};

export function createMap(container: HTMLDivElement, bounds: L.LatLngBounds) {
  const map = L.map(container, {
    zoomControl: false,
    renderer: L.canvas(),
  }).fitBounds(bounds);
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

export const rdataset: PageObject = {
  title: 'Jeux de données réelles',
  content: html`<div class="mw6 br2 pa2" style="background-color: #ffffffd6">
    <h4>Glottolog</h4>
    <p>${tex`\approx 7100`} points</p>
    <p>${tex`\approx 10000`} chevauchements</p>
  </div>`,
  background: (_o, $background) => {
    const group = L.featureGroup(
      glottolog.map((m) => L.circleMarker(m, { radius: 1 }))
    );
    const map = createMap($background, group.getBounds());
    group.addTo(map);
  },
};

export const criteres: PageObject = {
  title: 'Critères de comparaison',
  content: md`
**Facteurs de compression**

${tex.block`cf = 1 - \frac{|C|}{|X|}`}

**Distance moyenne au centre**

${tex.block`mdc = \frac{1}{|X|} \times \sum_{c \in C}{\sum_{p \in C}{||x(c) - x(p)||^2}}`}

**Variance de la taille des clusters**

${tex.block`csv = \frac{1}{|C|} \times \sum_{c \in C}{(|c| - |\overline{c}|)^2}`}
  `,
};

export const times: PageObject = {
  title: 'Résultats – Temps',
  content: () => {
    return md`
En fait je sais pas quoi mettre puisque des résultats pour les critères on en a beaucoup :(
    `;
  },
};

// export const qualite: PageObject = {
//   title: 'Résultats – Glottolog',
//   content: (_o, $holder) => {
//     const { height } = $holder.getBoundingClientRect();
//     return html`<figure class="flex">
//       <img src=${realUrl} height="${height}" />
//       <figcaption class="pl3">
//         O-SAC est le plus détaillé, suivi par FSAC puis QUAD+ et QUAD+BIG
//       </figcaption>
//     </figure>`;
//   },
// };

export const resultats: PageObject = {
  title: 'Résultats – Critères',
  content: () => {
    return md`
En fait je sais pas quoi mettre puisque des résultats pour les critères on en a beaucoup :(
    `;
  },
};

export default [
  experiments,
  sdataset,
  rdataset,
  times,
  // qualite,
  criteres,
  resultats,
];
