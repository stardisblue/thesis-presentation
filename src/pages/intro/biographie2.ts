import { html } from 'htl';
import md, { mdi } from '../../md';
import { PageObject } from '../../pages';

const data = [
  { date: '1994', place: 'Changji', name: 'Naissance' },
  { date: '? - 2018', place: 'Montpellier', name: 'Etudes' },
  { date: '2018', place: 'Montpellier', name: 'Diplôme de Master' },
];

const table = html`<table style="border-collapse: collapse">
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
</table>`;

export const biographie2: PageObject = {
  title: 'Biographie — Des données complexes',
  content: md`
<p class="mt0">${mdi`**Fati Chen** est **né** à **Changji** le **16 novembre 1994**.`}</p>

**Il** a **étudié** à l'université de **Montpellier** où il a **obtenu** son Master en **2018**

---

### Fati Chen

${table}
  `,
};
