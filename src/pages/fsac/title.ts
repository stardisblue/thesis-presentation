import { html } from 'htl';
import type { PageObject } from '../../pages';
export const title: PageObject = {
  template: 'title',
  title: '',
  content: () => html.fragment`
    <h4 class="gray">ProsoVis</h4>
    <h4 class="gray">AGORA</h4>
    <div class="flex items-baseline">
      <h2>FSAC</h2>
      <div class="pa2"></div>
      <h3 class="mt0">(Fast Spatial Agglomerative Clustering)</h3>
    </div>
    <p class="pl4 i mt0">
      Réduction d'encombrement visuel par agglomération spatiale
    </p>

    <h4 class="gray">Conclusion</h4>
  `,
};
