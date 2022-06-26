import { navigation } from './navigation';
import { Pages } from './pages';
import 'tachyons/css/tachyons.min.css';
import './css/style.css';
import pages from './pages/index';

(function () {
  const $entry = document.querySelector('#hero');

  if ($entry) {
    const $page = Pages({ lazy: 2 });
    $entry.append($page);

    navigation({ max: pages.length })
      .on('page', (page, _prev, nav) => {
        $page.load(pages[page], { page: page + 1, nav });
        nav.collect(2).map((v, i) => {
          $page.preload(i + 1, pages[v], { page: v + 1, nav });
        });
      })
      .bind($page)
      .first();
  }
})();

export {};
