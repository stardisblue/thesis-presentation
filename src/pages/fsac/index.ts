import type { PageObject } from '../../pages';
import experiments from './experiments';
import { fastsac } from './fastsac';
import intro from './intro';
import overlap from './overlap';
import { question } from './question';
import { reponse } from './reponse';
import { rtree } from './rtree';
import { title } from './title';

export default [
  title,
  ...intro,
  ...overlap,
  question,
  reponse,
  fastsac,
  rtree,
  ...experiments,
] as PageObject[];
