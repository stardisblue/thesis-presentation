import { html } from 'htl';
import logos from '../data/logos';
// import jury from '../data/jury';
import type { PageObject } from '../pages';
import md, { mdi } from '../md';

// const formatJury = jury.map(({ titre, name, qualite, labo, univ, status }) => [
//   titre,
//   name,
//   [qualite, labo, univ].join(', '),
//   status,
// ]);

const page: PageObject = {
  template: 'title',
  title: mdi`Réduction de l'encombrement visuel : <br>application à la
  visualisation et à l'exploration <br> de données prosopographiques`,
  content: md`
### Fati CHEN

_29 Juin 2022_

Directeur de thèse : **Pascal PONCELET**

Co-encadrant de thèse : **Arnaud SALLABERRY**
  `,
  footer: html`<div
    class="flex-grow-1"
    style="display:flex; justify-content: space-around"
  >
    ${logos.map(
      ({ url, ...attrs }) => html`<a
        href=${url}
        target="_blank"
        rel="noopener noreferrer"
        ><img height="64px" style="width:auto;" ${attrs} />
      </a> `
    )}
  </div>`,
};

export default page;
