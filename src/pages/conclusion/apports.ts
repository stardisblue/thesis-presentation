import { html } from 'htl';
import { bib, cite } from '../../bib';
import type { PageObject } from '../../pages';
const apports: PageObject = {
  title: 'Conclusion générale',
  content: () => html`<div>
    <div class="w-100">
      <div class="flex items-baseline">
        <h3 class="mt0">ProsoVis</h3>
        <div class="pa3"></div>
        <blockquote>
          Plateforme de visualisation analytique pour des données
          prosopographiques
        </blockquote>
      </div>
      <div class="pl4 smaller">
        <p class="mt0">1 article en rédaction</p>
        <p>
          Interface bientôt disponible en open-source, générique aux données
          prosopographiques
        </p>
      </div>
    </div>
    <div class="w-100">
      <div class="flex items-baseline">
        <h3 class="mt0">AGORA</h3>
        <div class="pa3"></div>
        <blockquote>
          Analyse comparative d'algorithmes de suppression de chevauchements
        </blockquote>
      </div>
      <div class="pl4 smaller">
        <p class="mt0">
          2 publications : GD2019 ${cite(bib.Chen2019)}, JGAA2020
          ${cite(bib.Chen2020)}
        </p>
        <p>
          Algorithmes, critères, analyses, datasets disponibles en JS sur
          <a href="https://github.com/agorajs" target="_blank"
            >github:agorajs</a
          >
        </p>
        <p>
          Interface web :
          <a href="https://agorajs.github.io/" target="_blank"
            >agorajs.github.io</a
          >.
        </p>
      </div>
    </div>
    <div class="w-100">
      <div class="flex items-baseline">
        <h3 class="mt0">FSAC</h3>
        <div class="pa3"></div>
        <blockquote>Nouvelle méthode d'agglomeration spatiale</blockquote>
      </div>
      <div class="pl4 smaller">
        <p class="mt0">1 article en rédaction</p>
        <p>
          Algorithmes, critères, analyses, datasets disponibles en JS sur
          <a href="https://github.com/stardisblue/fsac" target="_blank"
            >github:stardisblue/fsac</a
          >
        </p>
      </div>
    </div>
  </div> `,
};
export default apports;
