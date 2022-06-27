import type { PageObject } from '../../pages';
import conclusion from './conclusion';
import criterias from './criterias';
import el from './el';
import gs from './gs';
import intro from './intro';
import method from './method';
import nm from './nm';
import oo from './oo';
import question from './question';
import results from './results';
import selected from './selected';
import sm from './sm';
import title from './title';

export default [
  title,
  intro,
  question,
  criterias,
  oo,
  sm,
  gs,
  nm,
  el,
  selected,
  method,
  ...results,
  conclusion,
] as PageObject[];
