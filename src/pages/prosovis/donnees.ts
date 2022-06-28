import md from '../../md';
import type { PageObject } from '../../pages';
import tex from '../../tex';

export const donnees: PageObject = {
  title: 'Etude de cas',
  content: md`
<h3>Siprojuris</h3>

Base de données sur l'activité des professeurs de droits de 1800 à 2000.

> &nbsp;${tex`\approx 600`} individus
>
> &nbsp;${tex`\approx 5000`} évènements


#### Quelle est la carrière des professeurs ayant enseignés à Grenoble au début du XIX<sup>ième</sup> siècle ?
  `,
};
