import { PageObject } from '../../pages';
import conclusion from './conclusion';
import demo from './demo';
import { donnees } from './donnees';
import { features } from './features';
import { title } from './title';

const prosovis: PageObject[] = [title, features, donnees, demo, conclusion];
export default prosovis;
