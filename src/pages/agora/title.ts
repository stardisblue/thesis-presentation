import { html } from 'htl';

export default {
  template: 'title',
  title: ``,
  content: () => html.fragment`
    <h4 class="gray">ProsoVis</h4>
    <div class="flex items-baseline">
      <h2>AGORA</h2>
      <div class="pa2"></div>
      <h3>(Automatic Graph Overlap Removal Algorithms)</h3>
    </div>
    <p class="pl4 i mt0">
      Réduction d'encombrement visuel par suppression de chevauchements
    </p>
    <h4 class="gray">FSAC</h4>
    <h4 class="gray">Conclusion</h4>
  `,
};
