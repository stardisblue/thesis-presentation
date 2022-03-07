import { html } from 'htl';
import { navigation } from './navigation';
import couverture from './pages/couverture';
import { PageObject, Pages } from './pages';

(async function () {
  const $entry = document.querySelector('#hero');

  if ($entry) {
    const $page = Pages();
    $entry.append($page);

    const pages: (PageObject | ((page: number) => any))[] = [
      couverture,
      (page: number) => ({
        title: `ProsoVis`,
        content: html`<div>hello world</div>`,
        footer: html`<p>${page}</p>`,
      }),
      (page: number) => ({
        title: `AGORA`,
        content: html`<div>hello world</div>`,
        footer: html`<p>${page}</p>`,
      }),
      (page: number) => ({
        title: `FSAC`,
        content: html`<div>hello world</div>`,
        footer: html`<p>${page}</p>`,
      }),
      (page: number) => ({
        title: `FSAC5`,
        content: html`<div>hello world</div>`,
        footer: html`<p>${page}</p>`,
      }),
      (page: number) => ({
        title: `FSAC6`,
        content: html`<div>hello world</div>`,
        footer: html`<p>${page}</p>`,
      }),
    ];

    $page.load(pages[0], 1);

    navigation({ max: pages.length })
      .on('page', (page, _prev, nav) => {
        $page.load(pages[page], page + 1);
        nav.collect(2).map((v, i) => {
          $page.preload(i + 1, pages[v], v + 1);
        });
      })
      .bind($page);
  }
})();

export {};
