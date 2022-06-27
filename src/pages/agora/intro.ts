import * as d3 from 'd3';
import { html } from 'htl';
import _ from 'lodash';
import { bib, cite } from '../../bib';
import { attrs } from '../../d3-utils';
import md from '../../md';
import { navigation } from '../../navigation';
import { PageData } from '../../pages';
import tex from '../../tex';
import graphstate0 from './intro/graphstate0.json';
import graphstate1 from './intro/graphstate1.json';
import graphstateadd from './intro/graphstateadd.json';
import nodesVPSC from './intro/nodesVPSC.json';

const introStates = (() => {
  const combined = {
    nodes: [...graphstate1.nodes, ...graphstateadd.nodes],
    edges: [...graphstate1.edges, ...graphstateadd.edges],
  };

  return [
    {
      graph: graphstate0,
      caption: md`Soit un ensemble de points ${tex`V`} dans un espace tel que ${tex`\forall v \in V, (x_v, y_v)`}`,
    },
    {
      graph: graphstate1,
      point: true,
      caption: md`Sous forme de dessin ${tex`\mathcal{E}_G: V \rightarrow \mathbb{R}^2`} tel que ${tex`\forall v\in V, \mathcal{E}_G(v) = (x_v, y_v)`}`,
    },
    {
      graph: graphstate1,
      caption: md`Affichés avec leurs labels ${tex`\forall v \in V, (w_v, h_v)`}`,
    },
    {
      graph: combined,
      point: true,
      caption: md`${'—'}`,
    },
    {
      graph: combined,
      caption: md`${'—'}`,
    },
    {
      graph: { nodes: nodesVPSC, edges: combined.edges },
      caption: md`<p>${tex`\mathcal{E}'_G(v)`} Résultat souhaité (généré avec VPSC ${cite(
        bib.Dwyer2005
      )})`,
    },
  ];
})();

type Node = {
  label: string;
  x: number;
  y: number;
  index: number;
  width: number;
  height: number;
};

type Edge<T> = { source: T; target: T };

function linkEdges(nodes: Node[], edges: Edge<number>[]) {
  const indexNodes = _.keyBy(nodes, 'index');
  return _.map(edges, ({ source, target, ...rest }) => ({
    ...rest,
    source: indexNodes[source],
    target: indexNodes[target],
  }));
}

function edgelife() {
  const getPath = ({ source, target }: Edge<Node>) =>
    `M ${source.x} ${source.y} L ${target.x} ${target.y}`;

  return [
    (enter: any) =>
      enter
        .append('path')
        .call(attrs, {
          d: getPath,
          stroke: 'CornflowerBlue',
          'stroke-width': 0,
        })
        .call((p: any) => p.transition().delay(500).attr('stroke-width', 2)),
    (update: any) =>
      update.call((up: any) =>
        up.transition().duration(1000).attr('d', getPath)
      ),
    (exit: any) => exit.transition().attr('stroke-width', 0).remove(),
  ];
}

function nodelife(point: any) {
  const cssCoord = ({ x, y, width, height }: Node) =>
    `translate3d(${x - width / 2}px, ${y - height / 2}px, 0)`;

  function rect(rect: any, point: any) {
    rect.call(attrs, {
      fill: ({ fill }: any) => fill ?? (point ? 'black' : '#eee'),
      stroke: ({ stroke }: any) => stroke ?? (point ? 'black' : 'lightgray'),
      x: ({ width }: any) => (point ? width / 2 - 2 : 0),
      y: ({ height }: any) => (point ? height / 2 - 2 : 0),
      width: ({ width }: any) => (point ? 4 : width),
      height: ({ height }: any) => (point ? 4 : height),
    });
  }

  function text(text: any) {
    text
      .text(({ label }: any) => label)
      .call(attrs, {
        'font-size': point ? '0px' : '16px',
        'text-anchor': 'middle',
        'dominant-baseline': 'middle',
        dx: ({ width }: any) => width / 2,
        dy: ({ height }: any) => height / 2,
      });
  }

  return [
    (enter: any) =>
      enter
        .append('g')
        .style('transform', cssCoord)
        .attr('opacity', 0)
        .call((g: any) => {
          g.transition().call(attrs, {
            opacity: 1,
            'font-style': ({ fontStyle }: any) => fontStyle,
          });

          g.append('rect').attr('rx', '2').call(rect, point);

          g.append('text').call(text);
        }),
    (update: any) =>
      update.call((up: any) => {
        up.transition('position')
          .duration(1000)
          .call((t: any) =>
            t
              .style('transform', cssCoord)
              .attr('font-style', ({ fontStyle }: any) => fontStyle)
          );
        up.transition('style').call((t: any) => {
          t.select('text')
            .text(({ label }: any) => label)
            .call(attrs, {
              'font-size': point ? '0px' : '16px',
              dx: ({ width }: any) => width / 2,
              dy: ({ height }: any) => height / 2,
            });

          t.select('rect').call(rect, point);
        });
        return up;
      }),
    (exit: any) => exit.transition().attr('opacity', 0).remove(),
  ];
}

function graphIntro(
  _id: any,
  { graph: { nodes, edges }, caption = '', point = false }: any,
  $div: any
) {
  const div = d3.select($div);

  const svg = div.select('svg');
  if (typeof caption === 'string') {
    div.select('#caption').text(caption);
  } else {
    (div.select('#caption').node() as Element).replaceChildren(caption);
  }

  const _edges = svg
    .selectAll('g.edges')
    .data([linkEdges(nodes, edges)])
    .join('g')
    .classed('edges', true);

  const _nodes = svg
    .selectAll('g.nodes')
    .data([nodes])
    .join('g')
    .classed('nodes', true);

  _nodes
    .selectAll('g')
    .data(
      (d) => d,
      ({ index }: any) => index
    )
    .join(...(nodelife(point) as [any]));

  _edges
    .selectAll('path')
    .data((d) => d)
    .join(...(edgelife() as [any]));

  return $div;
}

export default {
  title: `Introduction`,
  content: (_opts: PageData, $holder: HTMLDivElement) => {
    $holder.classList.add('flex', 'flex-column');
    $holder.style.height = $holder.getBoundingClientRect().height + 'px';
    $holder.append(html.fragment`
      <svg
        preserveAspectRatio="xMidYMid meet"
        viewbox=${[-5, -5, 430, 230]}
      ></svg>
      <div id="caption" style=${{ fontSize: '0.75em', color: 'gray' }}></div>`);

    navigation({ max: introStates.length, stopPropagation: true })
      .on('page', (page) => graphIntro(0, introStates[page], $holder))
      .bind($holder)
      .first();
  },
};
