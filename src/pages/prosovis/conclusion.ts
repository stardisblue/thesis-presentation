import { html } from 'htl';
import { PageObject } from '../../pages';

export default {
  title: `Conclusion`,
  content: (_o, $holder) => {
    $holder.append(
      html`<h3 class="mt0">ProsoVis : Interface de visualisation analytique</h3>
        <p>Composée de deux vues principales</p>
        <p>Les vues sont synchronisées</p>
        <p>
          Permet de naviguer et explorer des données prosopographiques et
          biographiques
        </p>
        <p>Article en cours de rédaction</p>`
    );
    $holder.after(html`<p class="tr">
      <b>ProsoVis</b> 🔗
      <a href="https://chen.lirmm.net/siprojuris-v2/" target="_blank">
        chen.lirmm.net/siprojuris-v2</a
      >
      | 📚 dépôt disponible prochainement
    </p>`);
    return;
  },
} as PageObject;
