import { html } from 'htl';
import { PageObject } from '../../pages';

export const question: PageObject = {
  template: 'title',
  content: html`<h4 class="measure">
    Comment effectuer le regroupement agglomératif tout en réduisant le nombre
    d’opérations nécessaires ?
  </h4>`,
};
