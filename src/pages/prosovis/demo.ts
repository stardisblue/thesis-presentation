import { html } from 'htl';
import { PageObject } from '../../pages';
import movieUrl from './prosovis.mp4';

export default {
  background: (_o, $background) => {
    $background.style.zIndex = '0';
    return html`<video width="100%" height="100%" controls>
      <source src="${movieUrl}" type="video/mp4" />
    </video>`;
  },
} as PageObject;
