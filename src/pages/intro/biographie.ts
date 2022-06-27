import * as d3 from 'd3';
import { html, svg } from 'htl';
import md, { mdi } from '../../md';
import { navigation } from '../../navigation';
import { PageObject } from '../../pages';
import map from './bio/map';
import timeline from './bio/timeline';

const dimensions = [
  html`<div class="pl2">
    <p>Individu Concerné :</p>
    <ul>
      <li>Fati Chen</li>
    </ul>
  </div>`,

  html`<div class="pl2">
    <p>Propriétés :</p>
    <ul>
      <li>Naissance</li>
      <li>Etudes de Master</li>
      <li>Obtention du Master</li>
    </ul>
  </div>`,
  html`<div class="pl2">
    <p>Données Temporelles :</p>
    ${timeline}
  </div>`,
  html`<div class="flex flex-column w-50">
    <p>Données Spatiales :</p>
    ${map}
  </div>`,
];

export const biographie: PageObject = {
  title: 'Biographie',
  content: (_o: any, $holder: HTMLDivElement) => {
    $holder.classList.add('flex', 'flex-column');
    $holder.append(
      md`
<p class="mt0">${mdi`**Fati Chen** est **né** à **Changji** le **16 novembre 1994**.`}</p>

**Il** a **étudié** à l'université de **Montpellier** où il a **obtenu** son Master en **2018**

---
      `
    );

    const $mapdiv = html`<div class="flex-grow-1"></div>`;

    $holder.append(html`<div class="flex flex-grow-1">
      <div class="w-50">
        <div class="step" style="visibility: hidden">
          <p>Individu Concerné :</p>
          <ul>
            <li>Fati Chen</li>
          </ul>
        </div>
        <div class="step" style="visibility: hidden">
          <p>Propriétés :</p>
          <ul>
            <li>Naissance</li>
            <li>Etudes de Master</li>
            <li>Obtention du Master</li>
          </ul>
        </div>
        <div class="step" style="visibility: hidden">
          <p>Données Temporelles :</p>
          ${timeline}
        </div>
      </div>
      <div class="w-50">
        <div class="step flex flex-column h-100" style="visibility: hidden">
          <p>Données Spatiales :</p>
          ${$mapdiv}
        </div>
      </div>
    </div>`);

    const $map = svg`${map}`;
    d3.select($map).attr('height', $mapdiv.getBoundingClientRect().height);
    $mapdiv.append($map);

    navigation({ max: dimensions.length + 1, stopPropagation: true })
      .on('page', (page) =>
        $holder
          .querySelectorAll('.step')
          .forEach((v, i) =>
            d3.select(v).style('visibility', page <= i ? 'hidden' : '')
          )
      )
      .bind($holder)
      .first();
  },
};
