import { html } from 'htl';
import logos from '../data/logos';
import md from '../md';
import { PageObject } from '../pages';
import notebook from '302a7a340686465f';
import { Inspector, Runtime } from '@observablehq/runtime';

export default {
  title: `Merci de votre attention`,
  content: (_o, $holder) => {
    const _md = md`
### Fati CHEN

<small>🔗[stardisblue.github.io](https://stardisblue.github.io) | 📚[github.com/stardisblue](https://github.com/stardisblue)</small>

<div id="mybanner"></div>
<div class="flex justify-between"><div>

#### ProsoVis

<small>🔗 [Siprojuris](https://chen.lirmm.net/siprojuris-v2/) | 🔗 [WEB3 & ADVANSE](https://chen.lirmm.net/prosovis-advanse-web3/)</small>

</div> 
<div>

#### AGORA

<small>🔗[agorajs.github.io](https://agorajs.github.io) | 📚 [github.com/agorajs](https://github.com/agorajs)</small>

</div> 
<div>

#### FSAC

<small>📚 [github.com/stardisblue/fsac](https://github.com/stardisblue/fsac)</small>

</div>
    `;

    $holder.append(_md);

    const main = new Runtime().module(notebook, (name: any) => {
      if (name === 'viewof banner')
        return new Inspector(_md.querySelector('#mybanner'));
      return;
    });

    const { width } = $holder.getBoundingClientRect();
    main.redefine('width', width);
  },
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
} as PageObject;
