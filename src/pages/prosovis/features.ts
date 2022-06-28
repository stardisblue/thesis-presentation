import md from '../../md';
import type { PageData, PageObject } from '../../pages';
import imgUrl from './prosovis-title.png';
export const features: PageObject = {
  title: 'Besoins',
  content: md`
1. Visualiser la temporalité, la spatialité et les individus
2. Filtrer sur :

   - les dimensions des données
   - les propriétés des évènements

3. Exploration globale ou détaillée
4. Navigation de proche en proche
  `,

  background: (_o: PageData, $bg: HTMLDivElement) => {
    $bg.style.backgroundImage = `url(${imgUrl})`;
    $bg.style.backgroundSize = 'cover';
    $bg.style.opacity = '0.4';
  },
};
