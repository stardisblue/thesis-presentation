import * as d3 from 'd3';
import { html, svg } from 'htl';
import { initNavigation } from './navigation';

(function () {
  const $entry = document.querySelector('#hero');

  if ($entry) {
    const $fullsize = html`<div class="h-100 w-100" tabindex="0" />`;
    $entry.append($fullsize);
    initNavigation({ max: 5 })
      .on('next', (page) => {
        console.log(page);
      })
      .on('previous', (page) => {
        console.log(page);
      })
      .bind($fullsize);
  }
})();

export {};
