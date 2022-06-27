import { html } from 'htl';
import type { PageObject } from '../../pages';
const perspectives: PageObject = {
  title: 'Perspectives',
  content: () => html`
    <h4>ProsoVis</h4>
    <h4>AGORA</h4>
    <h4>FSAC</h4>
  `,
};
export default perspectives;
