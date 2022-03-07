import { html } from "htl";
import { navigation } from "./navigation";
import couverture from "./pages/couverture";
import { PageObject, Pages } from "./pages";
import tex from "./tex";
import md from "./md";

(function () {
  const $entry = document.querySelector("#hero");

  if ($entry) {
    const $page = Pages();
    $entry.append($page);

    const pages: (PageObject | ((page: number) => any))[] = [
      couverture,
      (page: number) => ({
        title: `ProsoVis`,
        content: html`<div>hello world ${tex`\frac{1}{hello \cup test}`}</div>`,
        footer: html`<p>${page}</p>`,
      }),
      (page: number) => ({
        title: `AGORA`,
        content: md`
<div>hello world</div>

${tex.block`\frac{1}{hello \cup test}`}

~~~js
const i = j;
i++;
function sum(a, b) {
  return a + b;
}
~~~
        `,
        footer: md`<p>${page}</p>`,
      }),
      (page: number) => ({
        title: `FSAC`,
        content: md`
~~~javascript
const i = j;
i++;
function sum(a, b) {
  return a + b;
}
~~~
        `,
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
      .on("page", (page, _prev, nav) => {
        $page.load(pages[page], page + 1);
        nav.collect(2).map((v, i) => {
          $page.preload(i + 1, pages[v], v + 1);
        });
      })
      .bind($page);
  }
})();

export {};
