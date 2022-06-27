import { html } from 'htl';
import { PageObject } from '../pages';

export default {
  template: 'title',
  title: `Problématique`,
  content: html`<h3 class="measure">
    Quelle visualisation d’information offrir aux experts pour explorer et
    naviguer dans des données prosopographiques et les aider à répondre à leurs
    questions ou à tester leurs hypothèses ?
  </h3>`,
} as PageObject;
