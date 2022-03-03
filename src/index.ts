import * as d3 from 'd3';
import { html } from 'htl';
import { md, tex } from './library';
import { navigation } from './navigation';
import couverture from './pages/couverture';
import { TitlePage } from './templates';

(async function () {
  const $entry = document.querySelector('#hero');

  if ($entry) {
    const $holder = html`<div
      class="h-100 w-100 helvetica"
      tabindex="0"
      style="padding: 1% 10%;font-size:3vh"
    />`;
    $entry.append($holder);
    const fullsize = d3.select($holder);

    const pages: ((page: number) => Element)[] = [
      couverture.render,
      (page: number) =>
        TitlePage(
          tex`\text{sp\_bb\_na} = 1 - \frac{w_{bb} \times h_{bb}}{w'_{bb} \times h'_{bb}}`,
          html`hello world`,
          page
        ),
    ];

    $holder.append(pages[0](0));

    navigation({ max: pages.length })
      .on('page', (page) => {
        fullsize
          .selectAll((_, i, nodes) => nodes[i].children)
          .data([pages[page](page + 1)])
          .join(
            (g) => g.append((d) => d),
            (g) =>
              g.each(function (d) {
                d3.select(d).datum(d3.select(this).datum());
                return this.parentNode?.replaceChild(d, this);
              })
          );
      })
      .bind($holder);
  }
})();

export {};
