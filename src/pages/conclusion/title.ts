import { html } from 'htl';
import type { PageObject } from '../../pages';
const title: PageObject = {
  template: 'title',
  title: '',
  content: () => html.fragment`
    <h4 class="gray">ProsoVis</h4>
    <h4 class="gray">AGORA</h4>
    <h4 class="gray">FSAC</h4>
    <h2>Conclusion</h2>
    <p class="mt0 i pl4">Apports et perspectives</p>
  `,
};
export default title;
