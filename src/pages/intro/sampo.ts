import { html } from 'htl';
import { bib, cite } from '../../bib';
import { PageObject } from '../../pages';
import graphUrl from './proso/sampo-graph.png';
import mapUrl from './proso/sampo-map.png';

export const sampo: PageObject = {
  title: 'Prosopographie',
  content: (_o: any, $holder: HTMLDivElement) => {
    $holder.classList.add('flex', 'flex-column');

    const container = html`<div class="flex flex-grow-1 justify-around"></div>`;
    $holder.append(container);
    $holder.append(
      html`<div class="w-100">
        <p class="tc">BiographySampo ${cite(bib.Hyvonen2019)}</p>
      </div> `
    );

    container.style.height = container.getBoundingClientRect().height + 'px';

    container.append(
      html`<img class="shadow-4" src=${mapUrl} />`,
      html`<img class="shadow-4" src=${graphUrl} />`
    );

    return;
  },
};
