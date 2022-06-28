import { html } from 'htl';
import { PageObject } from '../pages';
import relationsUrl from './transition/relations.png';
import carteUrl from './transition/carte.png';
import _ from 'lodash';

export const focusgraph: PageObject = {
  title: `Encombrement visuel`,
  content: (_o, $holder) => {
    $holder.classList.add('flex');
    $holder.append(
      html`<figure class="w-100 flex flex-column justify-between">
        <img class="shadow-4" src="${relationsUrl}" />
        <figcaption>Graphe de relations</figcaption>
      </figure>`,
      html`<div class="pa2"></div>`,
      html`<figure class="w-100 flex flex-column justify-between o-40">
        <img class="shadow-4" src="${carteUrl}" />
        <figcaption>Carte</figcaption>
      </figure>`
    );
  },
};

export const focusmap: PageObject = {
  title: `Encombrement visuel`,
  content: (_o, $holder) => {
    $holder.classList.add('flex');
    $holder.append(
      html`<figure class="w-100 flex flex-column justify-between o-40">
        <img class="shadow-4" src="${relationsUrl}" />
        <figcaption>Graphe de relations</figcaption>
      </figure>`,
      html`<div class="pa2"></div>`,
      html`<figure class="w-100 flex flex-column justify-between">
        <img class="shadow-4" src="${carteUrl}" />
        <figcaption>Carte</figcaption>
      </figure>`
    );
  },
};
