import { html } from 'htl';
import type { PageObject } from '../../pages';
const perspectives: PageObject = {
  title: 'Perspectives',
  content: () => html`
    <h4>ProsoVis</h4>
    <p class="pl4 measure lh-copy">
      Intégrer plus finement la représentation de l'incertitude dans les
      différentes vues.
    </p>
    <h4>AGORA & FSAC</h4>
    <p class="pl4 measure  lh-copy">
      Développer un système hybride ; agglomérer ou déplacer les éléments en
      fonction d'un facteur de chevauchement.
    </p>
  `,
};
export default perspectives;
