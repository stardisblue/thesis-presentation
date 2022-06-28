import { html } from 'htl';
import { PageObject } from '../../pages';

export default {
  title: `Conclusion`,
  content: (_o, $holder) => {
    $holder.append(
      html`<h3 class="mt0">FSAC : Méthode d'agglomération</h3>
        <p>Produits des résultats similaires à l'état de l'art</p>
        <p>Extremement rapide</p>
        <p>Est disponible en deux variantes : en temps réel ou hors ligne.</p>
        <p>Article en cours de rédaction</p>`
    );
    $holder.after(html`<p class="tr">
      <b>FSAC</b> 🔗
      <a
        href="https://observablehq.com/@stardisblue/sac-overview"
        target="_blank"
      >
        @stardisblue/sac-overview</a
      >
      | 📚
      <a href="https://github.com/stardisblue/fsac/" target="_blank">
        github:stardisblue/fsac</a
      >
    </p>`);
  },
} as PageObject;
