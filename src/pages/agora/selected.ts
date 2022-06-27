import { bib, cite } from '../../bib';
import { html } from 'htl';

export default {
  title: 'Critères sélectionnés',
  content: html`<ul>
    <li>
      <p>
        <em>Normalised Number of Inversions</em> ${cite(bib.Chen2020)}<br />
        <small><em>Number of Inversions</em> ${cite(bib.Strobelt2012)}</small>
      </p>
    </li>
    <li>
      <p><em>Convex Hull Area</em> ${cite(bib.Strobelt2012)}</p>
    </li>
    <li>
      <p>
        <em>Improved Aspect Ratio</em> ${cite(bib.Chen2020)}<br />
        <small><em>Aspect Ratio</em> ${cite(bib.Li2005)}</small>
      </p>
    </li>
    <li>
      <p>
        <em>Improved Mean Squared Euclidean</em> ${cite(bib.Chen2020)}<br />
        <small
          ><em>Squared Euclidean</em> ${cite(bib.Marriott2003)} &
          <em>Mean Euclidean</em> ${cite(bib.Strobelt2012)}</small
        >
      </p>
    </li>
    <li>
      <p>
        <em>Relative Standard Deviation</em> ${cite(bib.Chen2020)}<br />
        <small><em>R.S.D. Delaunay</em> ${cite(bib.Gansner2010)}</small>
      </p>
    </li>
  </ul> `,
};
