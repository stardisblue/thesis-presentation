import { html } from 'htl';
import { CoverPage } from '../templates';

export default {
  id: 'couverture',
  render: function () {
    return CoverPage(
      html`Réduction de l'encombrement visuel :<br />
        application à la visualisation et à l'exploration <br />
        de données prosopographiques`,
      html` 
        <p><b>Fati CHEN</b></p>

        <p>
          Directeur de thèse : <b>Pascal PONCELET</b><br />
          Co-encadrant de thèse : <b>Arnaud SALLABERRY</b>
        </p>

        <p>Le 15 mai 2022</p>
      </div>`,
      html`<div style="display:flex; justify-content: space-around">
        <a
          href="https://www.lirmm.fr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            height="64px"
            style="width:auto;"
            src="//raw.githubusercontent.com/agorajs/agorajs.github.io/develop/public/lirmm.png"
            alt="LIRMM"
        /></a>
        <a
          href="https://www.univ-montp3.fr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            height="64px"
            style="width:auto;"
            src="//raw.githubusercontent.com/agorajs/agorajs.github.io/develop/public/um3.png"
            alt="UM3"
        /></a>
        <a
          href="https://www.umontpellier.fr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            height="64px"
            style="width:auto;"
            src="//raw.githubusercontent.com/agorajs/agorajs.github.io/develop/public/um.png"
            alt="UM"
        /></a>
        <a
          href="https://www.cnrs.fr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            height="64px"
            style="width:auto;"
            src="//raw.githubusercontent.com/agorajs/agorajs.github.io/develop/public/cnrs.png"
            alt="CNRS"
        /></a>
        <a
          href="https://anr.fr/Projet-ANR-17-CE38-0013"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            height="64px"
            style="width:auto;"
            src="//raw.githubusercontent.com/agorajs/agorajs.github.io/develop/public/anr.jpg"
            alt="ANR"
        /></a>
      </div>`
    );
  },
};
