import { html } from 'htl';
import type { PageObject } from '../../pages';
export const title: PageObject = {
  template: 'title',
  title: '',
  content: () => html`
    <h4 class="gray">ProsoVis</h4>
    <h4 class="gray">AGORA</h4>
    <h2>FSAC</h2>
    <blockquote>
      <h3 class="mt0">Fast Spatial Agglomerative Clustering</h3>
    </blockquote>
    <p class="pl4">
      Réduction d'encombrement visuel par agglomération spatiale
    </p>

    <h4 class="gray">Conclusion</h4>
  `,
};
