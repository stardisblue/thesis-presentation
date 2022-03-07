import { navigation } from "./navigation";
import couverture from "./pages/couverture";
import { PageObject, Pages } from "./pages";
import tex from "./tex";
import md from "./md";
import intro from "./agora/intro";

(function () {
  const $entry = document.querySelector("#hero");

  if ($entry) {
    const $page = Pages({ lazy: 2 });
    $entry.append($page);

    const pages: (PageObject | ((page: number) => any))[] = [
      couverture,
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
      intro,
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
    ];

    navigation({ max: pages.length })
      .on("page", (page, _prev, nav) => {
        $page.load(pages[page], page + 1);
        nav.collect(2).map((v, i) => {
          $page.preload(i + 1, pages[v], v + 1);
        });
      })
      .bind($page)
      .first();
  }
})();

export {};
