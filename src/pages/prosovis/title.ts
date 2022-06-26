import md from '../../md';
import type { PageData, PageObject } from '../../pages';
import imgUrl from './prosovis-title.png';
export const title: PageObject = {
  template: 'title',
  title: 'Prosovis',
  content: md`
Comment aider la navigation dans les données ?

Comment lier les deux échelles des données ?
  `,
  background: (_o: PageData, $bg: HTMLDivElement) => {
    $bg.style.backgroundImage = `url(${imgUrl})`;
    $bg.style.backgroundSize = 'cover';
    $bg.style.opacity = '0.3';
  },
};
