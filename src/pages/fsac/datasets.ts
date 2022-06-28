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
import { franceMap } from './intro/franceMap';
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
  title: 'Jeux de données synthétiques — Distributions',
  content: (_o, $container) => {
    $container.classList.add('flex');
    $container.append(
      ...datasets.map(
        (d) => html`<figure class="w-100 pa2 flex flex-column justify-center">
          <img src=${d.url} />
          <figcaption class="tc"><p>${d.label()}</p></figcaption>
        </figure>`
      )
    );
  },
};

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
    const map = franceMap($background, { zoomSnap: 1 });
    map.fitBounds(group.getBounds());
    group.addTo(map);
  },
};

export default [
  experiments,
  sdataset,
  rdataset,
  // qualite,
];
