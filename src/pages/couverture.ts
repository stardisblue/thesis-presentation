import { html } from 'htl';
import { md } from '../library';
import type { PageObject } from 'src/templates';
import logos from '../data/logos';
import jury from '../data/jury';

const formatJury = jury.map(({ name, qualite, labo, univ, status }) => [
  [name, qualite, labo, univ].join(', '),
  status,
]);

const page: PageObject = {
  template: 'title',
  title: html`Réduction de l'encombrement visuel : application à la
  visualisation et à l'exploration de données prosopographiques`,
  content: md`

**Fati CHEN**

Directeur de thèse : **Pascal PONCELET**<br/>
Co-encadrant de thèse : **Arnaud SALLABERRY**

Le *DATE DE SOUTENANCE*

<table class="w-100" style="font-size:0.8em">
${formatJury.map(([a, b]) => `<tr><td>${a}</td><td>${b}</td>`).join('\n')}
  </table>`,
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
