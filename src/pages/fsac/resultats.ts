import { html } from 'htl';
import { PageObject } from '../../pages';
import tex from '../../tex';
import timeperlinUrl from './result/time-perlin-noise.png';

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
  title: '📊 Résultats — Temps',
  content: (_o, $holder) => {
    $holder.classList.add('flex', 'flex-column');
    const $temp = html`<div class="flex-grow-1"></div>`;
    const $figure = html`<figure
      class="flex-grow-1 flex flex-column items-center"
    >
      ${$temp}
      <figcaption>Temps médian (ms), Bruit de Perlin</figcaption>
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
  title: '📊 Résultats — Temps',
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
              (i, j) =>
                html`<td class="pa2 ${j === 0 ? 'tl pr3' : ''}">${i}</td>`
            )}
          </tr>`
        )}
        <caption style="caption-side: bottom">
          Temps médian (ms)
        </caption>
      </table>`,
};

// export const qualite: PageObject = {
//   title: '📊 Résultats — Glottolog',
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
  content: (_o, $holder) => {
    $holder.classList.add('flex');

    return html.fragment`
      <div class="w-100">
        <h3>Facteurs de compression</h3>
        ${tex.block`cf = 1 - \frac{|C|}{|X|}`}
      </div>
      <div class="pa2"></div>
      <div class="w-100">
        <h3>Distance moyenne au centre</h3>
        ${tex.block`mdc = \frac{1}{|X|} \times \sum_{c \in C}{\sum_{p \in C}{||x(c) - x(p)||^2}}`}
      </div>
      <div class="pa2"></div>
      <div class="w-100">
        <h3>Variance de la taille des clusters</h3>
        ${tex.block`csv = \frac{1}{|C|} \times \sum_{c \in C}{(|c| - |\overline{c}|)^2}`}
      </div>
    </div> `;
  },
};

import facteurUrl from './result/facteur-compression.png';
import varianceUrl from './result/variance-taille.png';
import distanceUrl from './result/distance-centre.png';

export const resultats: PageObject = {
  title: '📊 Résultats — Critères',

  content: (_o, $holder) => {
    $holder.classList.add('flex', 'flex-column', 'justify-center');
    $holder.append(
      html`<div class="flex">
        <figure class="w-100 tc">
          <img src="${facteurUrl}" />
          <figcaption>Facteur de compression</figcaption>
        </figure>
        <div class="pa2"></div>
        <figure class="w-100 tc">
          <img src="${varianceUrl}" />
          <figcaption>Variance tailles des clusters</figcaption>
        </figure>
        <div class="pa2"></div>
        <figure class="w-100 tc">
          <img src="${distanceUrl}" />
          <figcaption>Distance au centre</figcaption>
        </figure>
      </div>`
    );
  },
};

export default [
  timessynth,
  timesreal,
  // qualite,
  criteres,
  resultats,
];
