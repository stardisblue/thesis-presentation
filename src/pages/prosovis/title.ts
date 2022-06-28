import { html } from 'htl';
import type { PageObject } from '../../pages';

// <p class="pl4">Comment aider la navigation dans les données ?</p>
// <p class="pl4">Comment lier les deux échelles des données ?</p>
export const title: PageObject = {
  template: 'title',
  title: '',
  content: () => html.fragment`
    <div class="flex items-baseline">
      <h2>ProsoVis</h2>
      <div class="pa2"></div>
      <h3>(Prosopographic Visualisation)</h3>
    </div>
    <p class="mt0 pl4 i">Plateforme de visualisation analytique</p>
    <h4 class="gray">AGORA</h4>
    <h4 class="gray">FSAC</h4>
    <h4 class="gray">Conclusion</h4>
  `,
  // background: (_o: PageData, $bg: HTMLDivElement) => {
  //   $bg.style.backgroundImage = `url(${imgUrl})`;
  //   $bg.style.backgroundSize = 'cover';
  //   $bg.style.opacity = '0.3';
  // },
};
