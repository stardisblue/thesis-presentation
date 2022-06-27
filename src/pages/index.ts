import type { PageData, PageObject } from '../pages';

import couverture from './couverture';
import intro from './intro';
import prosovis from './prosovis';
import agora from './agora';
import fsac from './fsac';
import question from './question';
import conclusion from './conclusion';
import merci from './merci';

const pages: (PageObject | ((options: PageData) => any))[] = [
  couverture,
  ...intro,
  question,
  ...prosovis,
  ...agora,
  ...fsac,
  ...conclusion,
  merci,
];

export default pages;
