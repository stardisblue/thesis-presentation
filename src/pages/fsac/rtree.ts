import { html } from 'htl';
import { PageObject } from '../../pages';
import { Runtime, Inspector } from '@observablehq/runtime';
import notebook from 'b24f23c58f6e07b8';
import tex from '../../tex';
import { select } from 'd3';
import { navigation } from '../../navigation';

const comments = [
  () => html`<p>Algorithmes d'indexation spatiale</p>
    <p>Recherche d'objets dans l'espace</p>`,
  () => html`<p>Algorithmes d'indexation spatiale</p>
    <p>Recherche d'objets dans l'espace</p>
    <p>Coût de la détection: ${tex`O(n) \Rightarrow O(\log n)`}</p> `,
];

export const rtree: PageObject = {
  title: 'Optimiser la détection de chevauchements',
  content: (_o, $container) => {
    $container.classList.add('flex');

    const $svgdiv = html`<div class="w-100">
      <div
        id="observablehq-viewof-viewDepth-14fea8e0"
        style="font-size:0.5em"
      ></div>
      <div
        id="observablehq-viewof-showRegions-14fea8e0"
        style="font-size:0.5em"
      ></div>
      <div id="observablehq-rtreeview-14fea8e0"></div>
      <p>R-Arbre (Manolopoulos et al., 2006)</p>
    </div>`;
    const $comments = html`<div class="w-100">
      <p>Coût de la détection: ${tex`O(n) \Rightarrow O(\log n)</p>`}</p>
    </div>`;

    $svgdiv.addEventListener('pointerup', (e) => e.stopPropagation());

    $container.append($svgdiv);
    $container.append($comments);

    new Runtime().module(notebook, (name: any) => {
      if (name === 'rtreeview')
        return new Inspector(
          document.querySelector('#observablehq-rtreeview-14fea8e0')
        );
      if (name === 'viewof showRegions')
        return new Inspector(
          document.querySelector('#observablehq-viewof-showRegions-14fea8e0')
        );
      if (name === 'viewof viewDepth')
        return new Inspector(
          document.querySelector('#observablehq-viewof-viewDepth-14fea8e0')
        );
      return ['figure', 'showrtree'].includes(name);
    });

    navigation({ max: comments.length, stopPropagation: true })
      .on('page', (page) => {
        select($comments).selectChildren().remove();
        $comments.append(comments[page]());
      })
      .bind($container)
      .first();
  },
};
