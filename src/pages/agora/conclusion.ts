import { html } from 'htl';
import { mdi } from '../../md';
import { PageObject } from '../../pages';

const doi = (doi: string) => url(doi, 'http://dx.doi.org/' + doi);

const url = (title: string, url: string) =>
  Object.assign(mdi`[${title}](${url})`, {
    onclick: (e: any) => e.stopPropagation(),
  });

export default {
  title: 'Conclusion',
  content: (_o, $holder) => {
    $holder.append(html.fragment`<table class="collapse mb4">
        <tr class="bb bt">
          <th class="pa3"></th>
          <th class="pa3">Compact</th>
          <th class="pa3">Structure</th>
        </tr>
        <tr>
          <td class="pa3">Petit</td>
          <td class="pa3">RWordle-L</td>
          <td class="pa3">PRISM</td>
        </tr>
        <tr class="bb">
          <td class="pa3">Grand</td>
          <td class="pa3">VPSC</td>
          <td class="pa3">PFS'</td>
        </tr>
      </table>

      <h3>Node Overlap Removal Algorithms: an Extended Comparative Study</h3>

      <p>
        <b>Fati CHEN</b>, Laurent Piccinini, Pascal Poncelet & Arnaud Sallaberry
      </p>
      <blockquote>
        <p>
          <i>Graph Drawing 2019 (GD2019)</i>
          <small
            >doi:${doi('10.1007/978-3-030-35802-0_14')}</small
          >
        </p>
        <p>
          <i>Journal of Graph Algorithms and Applications (JGAA)</i>
          <small>doi:${doi('10.7155/jgaa.00532')}</small>
        </p>
      </blockquote>`);

    $holder.after(html`<p class="tr">
      <b>AGORAjs</b>
      🔗
      <a href="https://agorajs.github.io" target="_blank">agorajs.github.io</a>
      | 📚
      <a href="https://github.com/agorajs" target="_blank"
        >github.com/agorajs</a
      >
    </p>`);
  },
} as PageObject;
