import type { PageData, PageObject } from '../pages';

import couverture from './couverture';
import intro from './intro';
import prosovis from './prosovis';
import agora from './agora';
import fsac from './fsac';

const pages: (PageObject | ((options: PageData) => any))[] = [
  couverture,
  ...intro,
  ...prosovis,
  ...agora,
  ...fsac,
];

export default pages;
