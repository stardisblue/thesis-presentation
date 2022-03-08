import { navigation } from './navigation';
import { Pages } from './pages';
import './css/style.css';
import pages from './pages/index';

(function () {
  const $entry = document.querySelector('#hero');

  if ($entry) {
    const $page = Pages({ lazy: 2 });
    $entry.append($page);

    navigation({ max: pages.length })
      .on('page', (page, _prev, nav) => {
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
