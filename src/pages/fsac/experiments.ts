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
import timeperlinUrl from './result/time-perlin-noise.png';
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

const realTimes = [
  [
    'Trove',
    tex`139\,960`,
    tex`6\,335`,
    tex`2\,054`,
    tex`3\,535`,
    tex`\mathbf{15}`,
  ],
  [
    'Glottolog',
    tex`68\,942`,
    tex`2\,688`,
    tex`1\,801`,
    tex`2\,870`,
    tex`\mathbf{14}`,
  ],
  ['IRA', tex`94`, tex`22`, tex`118`, tex`130`, tex`\mathbf{<1}`],
  ['RISSE', tex`20`, tex`5`, tex`100`, tex`104`, tex`\mathbf{<1}`],
  [
    'OCS Wrecks',
    tex`\approx 4\,704\,225`,
    tex`570\,266`,
    tex`3114`,
    tex`91`,
    tex`\mathbf{19}`,
  ],
  ['Siprojuris', tex`119`, tex`44`, tex`89`, tex`95`, tex`\mathbf{<1}`],
];
export const timessynth: PageObject = {
  title: 'Résultats — Temps',
  content: (_o, $holder) => {
    $holder.classList.add('flex', 'flex-column');
    const $temp = html`<div class="flex-grow-1"></div>`;
    const $figure = html`<figure
      class="flex-grow-1 flex flex-column items-center"
    >
      ${$temp}
      <figcaption>
        Temps médian (ms) par rapport aux nombre de points
      </figcaption>
    </figure>`;

    $holder.append(html`<h3>Données Synthétiques</h3>`, $figure);

    const { height } = $temp.getBoundingClientRect();
    $figure.classList.remove('flex-grow-1');
    $holder.classList.remove('flex', 'flex-column');

    $figure.replaceChild(
      html`<img src="${timeperlinUrl}" height=${height} />`,
      $temp
    );
  },
};

export const timesreal: PageObject = {
  title: 'Résultats — Temps',
  content: () => html.fragment`<h3>Données Réelles</h3>
    <table class="bt bb collapse tr center">
      <tr class="tc bb">
        <th class="pa2"></th>
        <th class="pa2">O-SAC</th>
        <th class="pa2">IO-SAC</th>
        <th class="pa2">QUAD+</th>
        <th class="pa2">QUAD+BIG</th>
        <th class="pa2">FSAC</th>
      </tr>
      ${realTimes.map(
        (v) => html`<tr>
          ${v.map(
            (i, j) => html`<td class="pa2 ${j === 0 ? 'tl pr3' : ''}">${i}</td>`
          )}
        </tr>`
      )}
      <caption style="caption-side: bottom">
        Temps médian (ms)
      </caption>
    </table>`,
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

export const resultats: PageObject = {
  title: 'Résultats — Critères',
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
  timessynth,
  timesreal,
  // qualite,
  criteres,
  resultats,
];
