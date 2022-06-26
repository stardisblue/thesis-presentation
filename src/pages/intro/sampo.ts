import { html } from 'htl';
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
        <p class="tc">BiographySampo (Hyvonen et al. 2018)</p>
      </div> `
    );

    container.style.height = container.getBoundingClientRect().height + 'px';

    const images = html.fragment`<div><img class="shadow-4" src=${mapUrl} /></div>
 <div><img class="shadow-4"  src=${graphUrl} /></div>`;
    container.append(images);

    return;
  },
};
