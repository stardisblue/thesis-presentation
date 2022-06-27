import { html, svg } from 'htl';
import { PageObject } from '../../pages';
import { chartOO } from './oo';

import initial from './datasets/rand_100_25-Initial';
import scale from './datasets/rand_100_25-SCALE';
import pfs from './datasets/rand_100_25-PFS';
import pfsp from './datasets/rand_100_25-PFS-';
import vpsc from './datasets/rand_100_25-VPSC';
import fta from './datasets/rand_100_25-FTA';
import prism from './datasets/rand_100_25-PRISM';
import rwordle from './datasets/rand_100_25-RWordle-L';
import gtree from './datasets/rand_100_25-GTREE';
import diamond from './datasets/rand_100_25-Diamond';
import { select } from 'd3';
import tex from '../../tex';

const randGraphs = {
  initial,
  scale,
  pfs,
  pfsp,
  vpsc,
  fta,
  prism,
  rwordle,
  gtree,
  diamond,
};
export const result = {
  template: 'title',
  title: '📊 Résultats 🎉',
};

const resultSyntId = 'O-1';

function makeTable(resultatsSynth: any[], caption: any = '') {
  return html.fragment`<table width="100%">
      <colgroup>
        <col span="1" style="width: 10%;" />
        <col span="1" style="width: 10%;" />
        <col span="1" style="width: 10%;" />
        <col span="1" style="width: 10%;" />
        <col span="1" style="width: 10%;" />
        <col span="1" style="width: 10%;" />
        <col span="1" style="width: 10%;" />
        <col span="1" style="width: 10%;" />
        <col span="1" style="width: 10%;" />
        <col span="1" style="width: 10%;" />
      </colgroup>
      <thead>
        <tr class="${resultSyntId}-headline">
          <th></th>
          <th class="${resultSyntId}-title">Scaling</th>
          <th class="${resultSyntId}-title">PFS</th>
          <th class="${resultSyntId}-title">FTA</th>
          <th class="${resultSyntId}-title">VPSC</th>
          <th class="${resultSyntId}-title">RWordle-L</th>
          <th class="${resultSyntId}-title">PFS'</th>
          <th class="${resultSyntId}-title">PRISM</th>
          <th class="${resultSyntId}-title">GTREE</th>
          <th class="${resultSyntId}-title">Diamond</th>
        </tr>
      </thead>
      <tbody>
        ${resultatsSynth.map(
          (row) =>
            html`<tr>
              ${row.map((v: any) => {
                if (typeof v !== 'number') {
                  return html`<td class="${resultSyntId}-title">${v}</td>`;
                } else {
                  return html`<td class="${resultSyntId}-${v}"></td>`;
                }
              })}
            </tr>`
        )}
      </tbody>
      <caption class="caption" style="caption-side:bottom">
        ${caption}
      </caption>
    </table>
    <style>
      .${resultSyntId}-headline .${resultSyntId}-title {
        font-weight: normal;
        font-style: italic;
        font-size: 0.75em;
        height: auto;
      }
      .${resultSyntId}-title,
      .${resultSyntId}-0,
      .${resultSyntId}-1,
      .${resultSyntId}-2,
      .${resultSyntId}-3,
      .${resultSyntId}-4,
      .${resultSyntId}-5,
      .${resultSyntId}-6,
      .${resultSyntId}-7,
      .${resultSyntId}-8 {
        height: 3em;
      }
      .${resultSyntId}-title {
        text-align: center;
        font-size: 0.75em;
        vertical-align: middle;
      }
      .${resultSyntId}-0,
      .${resultSyntId}-3,
      .${resultSyntId}-6 {
        background-color: #9fcd62;
      }
      .${resultSyntId}-1,
      .${resultSyntId}-4,
      .${resultSyntId}-7 {
        background-color: #f6c142;
      }
      .${resultSyntId}-2,
      .${resultSyntId}-5,
      .${resultSyntId}-8 {
        background-color: #ea3323;
      }

      .${resultSyntId}-3,
      .${resultSyntId}-4,
      .${resultSyntId}-5 {
        opacity: 0.1;
      }
      .${resultSyntId}-6,
      .${resultSyntId}-7,
      .${resultSyntId}-8 {
        opacity: 0.5;
      }
    </style>`;
}

const resultatsSynth = [
  [html`<b>Orthogonal Ordering</b>`, 0, 0, 1, 1, 1, 0, 1, 1, 1],
  [html`<b>Spread Minimisation</b>`, 2, 2, 1, 0, 0, 1, 1, 1, 1],
  [html`<b>Global Shape Preservation</b>`, 0, 2, 1, 1, 0, 0, 0, 0, 0],
  [html`<b>Node Movement Minimisation</b>`, 0, 2, 1, 0, 0, 1, 1, 2, 2],
  [html`<b>Edge Length Preservation</b>`, 0, 1, 1, 0, 1, 0, 1, 1, 2],
];

export const synth = {
  title: '📊 Résultats — graphes synthétiques',
  content: () =>
    makeTable(
      resultatsSynth,
      'Valeurs aggrégées des métriques selectionnées pour les graphes synthétiques.'
    ),
};

const fade = (v: any) => (typeof v === 'number' ? v + 3 : v);

const resultatsSynthOO = [
  [html`<b>Orthogonal Ordering</b>`, 0, 0, 1, 1, 1, 0, 1, 1, 1],
  [html`<b>Spread Minimisation</b>`, 2, 2, 1, 0, 0, 1, 1, 1, 1].map(fade),
  [html`<b>Global Shape Preservation</b>`, 0, 2, 1, 1, 0, 0, 0, 0, 0].map(fade),
  [html`<b>Node Movement Minimisation</b>`, 0, 2, 1, 0, 0, 1, 1, 2, 2].map(
    fade
  ),
  [html`<b>Edge Length Preservation</b>`, 0, 1, 1, 0, 1, 0, 1, 1, 2].map(fade),
];

export const synthOO: PageObject = {
  title: '📊 Résultats — graphes synthétiques',
  content: function (_o, $holder) {
    $holder.classList.add('relative');
    $holder.append(
      makeTable(
        resultatsSynthOO,
        html`L'ensemble des graphes obtiennent de bons résultats (<4%) sur ce
          critère. <em>Scaling</em>, <em>PFS</em> et <em>PFS'</em> sont parfaits
          (0%).`
      )
    );

    const [$svg] = chartOO();
    $svg.addEventListener('pointerup', (e) => e.stopPropagation());

    $svg.style.height = '300px';
    $svg.classList.add('absolute');
    $svg.style.top = '5em';
    $svg.style.left = '5em';
    $holder.append($svg);
  },
};

const resultatsSynth2 = [
  [html`<b>Orthogonal Ordering</b>`, 0, 0, 1, 1, 1, 0, 1, 1, 1],
  [html`<b>Spread Minimisation</b>`, 2, 2, 1, 0, 0, 1, 1, 1, 1],
  [html`<b>Global Shape Preservation</b>`, 0, 2, 1, 1, 0, 0, 0, 0, 0],
  [html`<b>Node Movement Minimisation</b>`, 0, 2, 1, 0, 0, 1, 1, 2, 2],
  [html`<b>Edge Length Preservation</b>`, 0, 1, 1, 0, 1, 0, 1, 1, 2],
];

export const synth2 = {
  title: '📊 Résultats — graphes synthétiques',
  content: () =>
    makeTable(
      resultatsSynth2,
      'Valeurs aggrégées des métriques selectionnées pour les graphes synthétiques.'
    ),
};

function svg2group(file: SVGElement, transform = 'scale(1)', id = 'undefined') {
  const _svg = select(svg`${file}`);
  console.log(file, _svg.node());
  return svg`<g transform="${transform}"><g id="ref-${id}">${[
    _svg.select('g.edges').node(),
    _svg.select('g.nodes').node(),
  ]}</g>`;
}

const resultatsSynth12Id = 'O-4';

const resultatsSynth12 = (() => {
  const fade12 = (v: any, i: any) => {
    return i > 2 ? fade(v) : v;
  };
  return [
    [html`<b>Orthogonal Ordering</b>`, 0, 0, 1, 1, 1, 0, 1, 1, 1].map(fade12),
    [html`<b>Spread Minimisation</b>`, 2, 2, 1, 0, 0, 1, 1, 1, 1].map(fade12),
    [html`<b>Global Shape Preservation</b>`, 0, 2, 1, 1, 0, 0, 0, 0, 0].map(
      fade12
    ),
    [html`<b>Node Movement Minimisation</b>`, 0, 2, 1, 0, 0, 1, 1, 2, 2].map(
      fade12
    ),
    [html`<b>Edge Length Preservation</b>`, 0, 1, 1, 0, 1, 0, 1, 1, 2].map(
      fade12
    ),
  ];
})();

export const synth12 = {
  title: '📊 Résultats — graphes synthétiques',
  content: () => html.fragment`<div  style="position: relative">
  <style>.rect{
    fill: #eee;
    stroke: lightgray;
    rx: 2px;
  }
  .edges{
      stroke: cornflowerblue;
      stroke-width: 5;
  }</style>
    <div style="position: absolute;width: 3em;top: 1em;left: 35%">
      <p style="margin-bottom:0"><em>Initial</em></p>
      <svg width=100% height=100% viewbox="-10,-10,150,150">
        <style>#ref-${resultatsSynth12Id} .edges{stroke-width:4px;}</style>
        ${svg2group(
          randGraphs.initial(),
          'translate(0,0)scale(1)',
          resultatsSynth12Id
        )}</svg></div>
    <div style="position: absolute;width: 10em;top: 1em;left: 70%">
      <p style="margin-bottom:0"><em>Scale</em></p>
      <svg width=100% height=100% viewbox="-10,-10,900,900">
        <style>#ref-${resultatsSynth12Id} .edges{stroke-width:4px;}</style>
        ${svg2group(
          randGraphs.scale(),
          'translate(0,0)scale(1)',
          resultatsSynth12Id
        )}</svg></div>
    <div style="position: absolute;width: 10em;top: 1em;left: 45%">
      <p style="margin-bottom:0"><em>PFS</em></p>
      <svg width=100% height=100% viewbox="-10,-10,800,400">
        <style>#ref-${resultatsSynth12Id} .edges{stroke-width:4px;}</style>
        ${svg2group(
          randGraphs.pfs(),
          'translate(0,0)scale(1)',
          resultatsSynth12Id
        )}</svg></div>
  ${makeTable(
    resultatsSynth12,
    html`On s'intéresse aux résultats de <em>Scale</em> et <em>PFS</em>.`
  )}`,
};

const resultatsSynth34Id = 'O-3';
const resultatsSynth34 = (() => {
  const fade12 = (v: any, i: any) => {
    return i < 3 || i > 4 ? fade(v) : v;
  };
  return [
    [html`<b>Orthogonal Ordering</b>`, 0, 0, 1, 1, 1, 0, 1, 1, 1].map(fade12),
    [html`<b>Spread Minimisation</b>`, 2, 2, 1, 0, 0, 1, 1, 1, 1].map(fade12),
    [html`<b>Global Shape Preservation</b>`, 0, 2, 1, 1, 0, 0, 0, 0, 0].map(
      fade12
    ),
    [html`<b>Node Movement Minimisation</b>`, 0, 2, 1, 0, 0, 1, 1, 2, 2].map(
      fade12
    ),
    [html`<b>Edge Length Preservation</b>`, 0, 1, 1, 0, 1, 0, 1, 1, 2].map(
      fade12
    ),
  ];
})();

export const synth34 = {
  title: '📊 Résultats — graphes synthétiques',
  content: () => html`<div class="relative">
    <style>
      .rect {
        fill: #eee;
        stroke: lightgray;
        rx: 2px;
      }
      .edges {
        stroke: cornflowerblue;
        stroke-width: 5;
      }
    </style>
    <div class="absolute" style="width:4em;top:1em; left:52%">
      <p style="margin-bottom:0"><em>Initial</em></p>
      <svg width="100%" height="100%" viewbox="-10,-10,150,150">
        <style>
          #ref-${resultatsSynth34Id} .edges {
            stroke-width: 4px;
          }
        </style>
        ${svg2group(
          randGraphs.initial(),
          'translate(0,0)scale(1)',
          resultatsSynth34Id
        )}
      </svg>
    </div>
    <div class="absolute" style="width:4.4em;top: 1em;left:65%">
      <p style="margin-bottom:0"><em>VPSC</em></p>
      <svg width="100%" height="100%" viewbox="-10,-10,180,310">
        <style>
          #ref-${resultatsSynth34Id} .edges {
            stroke-width: 4px;
          }
        </style>
        ${svg2group(
          randGraphs.vpsc(),
          'translate(0,0)scale(1)',
          resultatsSynth34Id
        )}
      </svg>
    </div>
    <div class="absolute" style="width:9.2em;top:1em;left:77%">
      <p style="margin-bottom:0"><em>FTA</em></p>
      <svg width="100%" height="100%" viewbox="-10,-10,350,210">
        <style>
          #ref-${resultatsSynth34Id} .edges {
            stroke-width: 4px;
          }
        </style>
        ${svg2group(
          randGraphs.fta(),
          'translate(0,0)scale(1)',
          resultatsSynth34Id
        )}
      </svg>
    </div>

    ${makeTable(
      resultatsSynth34,
      html`<em>FTA</em> et <em>VPSC</em> ont tendance à produire des graphes
        étirés.`
    )}
  </div>`,
};

const resultatsSynth5Id = 'O-2';

const resultatsSynth5 = (() => {
  const fade12 = (v: any, i: any) => {
    return i < 5 ? fade(v) : v;
  };
  return [
    [html`<b>Orthogonal Ordering</b>`, 0, 0, 1, 1, 1, 0, 1, 1, 1].map(fade12),
    [html`<b>Spread Minimisation</b>`, 2, 2, 1, 0, 0, 1, 1, 1, 1].map(fade12),
    [html`<b>Global Shape Preservation</b>`, 0, 2, 1, 1, 0, 0, 0, 0, 0].map(
      fade12
    ),
    [html`<b>Node Movement Minimisation</b>`, 0, 2, 1, 0, 0, 1, 1, 2, 2].map(
      fade12
    ),
    [html`<b>Edge Length Preservation</b>`, 0, 1, 1, 0, 1, 0, 1, 1, 2].map(
      fade12
    ),
  ];
})();

export const synth5 = {
  title: '📊 Résultats — graphes synthétiques',
  content: () => html.fragment`<div style="height:3em; position: relative">
  <style>
  .rect {
    fill: #eee;
    stroke: lightgray;
    rx: 2px;
  }
  .edges {
    stroke: cornflowerblue;
    stroke-width: 5;
  }
</style>
  <div style="position: absolute; width:1.5em;">
    <p style="margin:0"><em>Initial</em></p>
    <svg width=100% height=100% viewbox="-10,-10,150,150">
      <style>#ref-${resultatsSynth5Id} .edges{stroke-width:4px;}</style>
      ${svg2group(
        randGraphs.initial(),
        'translate(0,0)scale(1)',
        resultatsSynth5Id
      )}</svg></div>
  
  <div style="position: absolute; width:2em; left: 53%">
    <svg width=100% height=100% viewbox="-10,-10,300,200">
      <style>#ref-${resultatsSynth5Id} .edges{stroke-width:4px;}</style>
      ${svg2group(
        randGraphs.rwordle(),
        'translate(0,0)scale(1)',
        resultatsSynth5Id
      )}</svg></div>
  
  <div style="position: absolute; width:4em; left: 63%">
    <svg width=100% height=100% viewbox="-10,-10,600,300">
      <style>#ref-${resultatsSynth5Id} .edges{stroke-width:4px;}</style>
      ${svg2group(
        randGraphs.pfsp(),
        'translate(0,0)scale(1)',
        resultatsSynth5Id
      )}</svg></div>
  
  <div style="position: absolute; width:4em; left: 73%">
    <svg width=100% height=100% viewbox="-10,-10,600,250">
      <style>#ref-${resultatsSynth5Id} .edges{stroke-width:4px;}</style>
      ${svg2group(
        randGraphs.prism(),
        'translate(0,0)scale(1)',
        resultatsSynth5Id
      )}</svg></div>
  
  <div style="position: absolute; width:4em; left: 83%"> 
    <svg width=100% height=100% viewbox="-10,-10,600,320">
      <style>#ref-${resultatsSynth5Id} .edges{stroke-width:4px;}</style>
      ${svg2group(
        randGraphs.gtree(),
        'translate(0,0)scale(1)',
        resultatsSynth5Id
      )}</svg></div>
  
  <div style="position: absolute; width:4em; left: 93%"> 
    <svg width=100% height=100% viewbox="-10,-10,600,400">
      <style>#ref-${resultatsSynth5Id} .edges{stroke-width:4px;}</style>
      ${svg2group(
        randGraphs.diamond(),
        'translate(0,0)scale(1)',
        resultatsSynth5Id
      )}</svg></div>
</div>
${makeTable(resultatsSynth5, html``)}`,
};

const resultatsTimes = (() => {
  const fade = (v: any) => (typeof v === 'number' ? v + 6 : v);
  return [
    [html`<b>10</b>`, 0, 0, 0, 0, 0, 0, 2, 2, 1].map(fade),
    [html`<b>20</b>`, 0, 0, 0, 0, 0, 0, 2, 2, 1].map(fade),
    [html`<b>50</b>`, 0, 0, 0, 0, 1, 0, 2, 2, 2].map(fade),
    [html`<b>100</b>`, 0, 0, 0, 0, 1, 0, 2, 2, 2].map(fade),
    [html`<b>200</b>`, 0, 0, 0, 0, 1, 0, 1, 1, 2],
    [html`<b>500</b>`, 0, 0, 0, 0, 1, 0, 1, 1, 2],
    [html`<b>1000</b>`, 0, 0, 0, 0, 1, 0, 1, 1, 2],
  ];
})();

export const times = {
  title: '📊 Résultats — temps',
  content: () =>
    html`<div class="relative">
      ${makeTable(
        resultatsTimes,
        'Valeurs aggrégées des temps pour les graphes synthétiques.'
      )}
      <p style="position:absolute; top:33%; left:45%">${tex`>400ms`}</p>
    </div>`,
};

export default [synth, synthOO, synth2, synth12, synth34, synth5];
