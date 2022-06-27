import md from '../../md';
import { bib, cite } from '../../bib';

export default {
  title: 'Critères sélectionnés',
  content: md`
- *Normalised Number of Inversions* ${cite(bib.Chen2020)}  
    <small>*Number of Inversions* ${cite(bib.Strobelt2012)}</small>
- *Convex Hull Area* ${cite(bib.Strobelt2012)}
- *Improved Aspect Ratio* ${cite(bib.Chen2020)}  
    <small>*Aspect Ratio* ${cite(bib.Li2005)}</small>
- *Improved Mean Squared Euclidean* ${cite(bib.Chen2020)}  
    <small>*Squared Euclidean* ${cite(
      bib.Marriott2003
    )} & *Mean Euclidean* ${cite(bib.Strobelt2012)}</small>
- *Relative Standard Deviation* ${cite(bib.Chen2020)}  
    <small>*R.S.D. Delaunay* ${cite(bib.Gansner2010)}</small>
    `,
};
