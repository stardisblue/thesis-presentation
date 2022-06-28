import { html } from 'htl';
import type { PageObject } from '../../pages';
const perspectives: PageObject = {
  title: 'Perspectives',
  content: () => html`
    <h4>ProsoVis</h4>
    meilleure représentation des incertitudes
    <h4>AGORA & FSAC</h4>
    un système hybride
  `,
};
export default perspectives;
