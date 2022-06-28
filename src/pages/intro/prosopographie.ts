import { html } from 'htl';
import { PageObject } from '../../pages';
import imgUrl from './proso/relations.png';

const pascal = [
  { date: '1970', place: 'Changji', name: 'Naissance' },
  { date: '1990', place: 'Montpellier', name: 'Etudes' },
  { date: '2018', place: 'Montpellier', name: 'Diplôme de Master' },
];

const yusu = [
  { date: '1992', place: 'Changji', name: 'Naissance' },
  { date: '2012', place: 'Montpellier', name: 'Etudes' },
  { date: '2019', place: 'Montpellier', name: 'Diplôme de Master' },
];

const data = [
  { date: '1994', place: 'Changji', name: 'Naissance' },
  { date: '? - 2018', place: 'Montpellier', name: 'Etudes' },
  { date: '2018', place: 'Montpellier', name: 'Diplôme de Master' },
];

const createTable = (
  name: string,
  data: any[],
  { x = '0', y = '0' }: { x?: string; y?: string } = {}
) => html`<div
  class="absolute bg-white shadow-4 br2 ph2"
  style="left:${x};top:${y}"
>
  <h4>${name}</h4>
  <table style="border-collapse: collapse; background-color: white;">
    <tr class="bb">
      <th class=" pa2">Date 📅</th>
      <th class="br bl pa2">Lieu 📍</th>
      <th class="pa2">Description</th>
    </tr>
    ${data.map(
      ({ date, place, name }) =>
        html`<tr>
          <td class="pa2">${date}</td>
          <td class="br bl pa2">${place}</td>
          <td class="pa2">${name}</td>
        </tr>`
    )}
  </table>
</div>`;

export const prosopographie: PageObject = {
  title: 'Prosopographie',
  content: () => {
    const $biographies = [
      createTable('Yusu Chen', yusu),
      createTable('Pascal Poncelet', pascal, { x: '2em', y: '2.5em' }),
      createTable('Fati Chen', data, { x: '4em', y: '5em' }),
    ];

    return html.fragment`<p class="mt0">
        L'étude de la vie d'individus et de leurs communautés
      </p>

      <hr />
      <div class="flex">
        <div class="w-60">
          <h3>Biographies</h3>
          <div class="relative">${$biographies}</div>
        </div>
        <div class="w-40">
          <h3>Relations</h3>
          <div><img src=${imgUrl} /></div>
        </div>
      </div>`;
  },
};
