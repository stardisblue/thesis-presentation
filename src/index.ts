import { html } from 'htl';
import { navigation } from './navigation';
import couverture from './pages/couverture';
import { Page, PageObject } from './templates';

(async function () {
  const $entry = document.querySelector('#hero');

  if ($entry) {
    const $page = Page();
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
    ];

    $page.update(pages[0], 0);

    navigation({ max: pages.length })
      .on('page', (page, _prev, nav) => {
        $page.update(pages[page], page + 1);
        const peekpage = nav.peek();
        if (peekpage) {
          console.log(peekpage);
        }
      })
      .bind($page);
  }
})();

export {};
