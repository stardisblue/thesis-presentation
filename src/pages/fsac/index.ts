import type { PageObject } from '../../pages';
import conclusion from './conclusion';
import datasets from './datasets';
import { fastsac } from './fastsac';
import intro from './intro';
import overlap from './overlap';
import { question } from './question';
import { reponse } from './reponse';
import resultats from './resultats';
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
  ...datasets,
  ...resultats,
  conclusion,
] as PageObject[];
