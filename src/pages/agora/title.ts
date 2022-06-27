import { html } from 'htl';

export default {
  template: 'title',
  title: ``,
  content: () => html`
    <h4 class="gray">ProsoVis</h4>
    <h2>AGORA</h2>
    <blockquote>
      <h3 class="mt0">Automatic Graph Overlap Removal Algorithms</h3>
    </blockquote>
    <p class="pl4">
      Réduction d'encombrement visuel par suppression de chevauchements
    </p>
    <h4 class="gray">FSAC</h4>
    <h4 class="gray">Conclusion</h4>
  `,
};
