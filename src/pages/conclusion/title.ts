import { html } from 'htl';
import type { PageObject } from '../../pages';
const title: PageObject = {
  template: 'title',
  title: '',
  content: () => html`
    <h4 class="gray">ProsoVis</h4>
    <h4 class="gray">AGORA</h4>
    <h4 class="gray">FSAC</h4>
    <h2>Conclusion</h2>
    <blockquote><h3 class="mt0">Apports et perspectives</h3></blockquote>
  `,
};
export default title;
