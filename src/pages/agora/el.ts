import { EdgeBased } from 'agora-criteria';
import * as d3 from 'd3';
import { html, svg } from 'htl';
import { bib, cite } from '../../bib';
import { build, attrs } from '../../d3-utils';
import { navigation } from '../../navigation';
import { PageData } from '../../pages';
import tex from '../../tex';
import { node } from './utils/node';

const eb_rsd = EdgeBased.RelativeStandardDeviation.criteria;

const l = (source: any, target: any) => ({ source, target });

function nmDrag(simulation: any) {
  return d3
    .drag()
    .on('start', function (event) {
      d3.select(this).raise().select('rect').attr('stroke', 'black');
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    })
    .on('drag', function (event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    })
    .on('end', function (event) {
      d3.select(this).select('rect').attr('stroke', 'lightgray');
      // if (!event.active) simulation.alphaTarget(0.3);
      event.subject.fx = null;
      event.subject.fy = null;
    });
}

function elChart(state: any, { initial, edges, $div, data, simulation }: any) {
  data.forEach((v: any, i: any) => {
    v.ox = state.nodes[i].ox;
    v.oy = state.nodes[i].oy;
  });

  simulation.force('x').initialize(data);
  simulation.force('y').initialize(data);
  simulation.alphaTarget(0.3).restart();

  const rect = { ...node.rect, width: 60, height: 40 };
  const text = { ...node.text, dx: 30, dy: 20 };

  const _div = d3.select($div);
  const _caption = _div.select('p');
  if (state.caption) (<any>_caption.node()).replaceChildren(state.caption);
  else (<any>_caption.node()).replaceChildren(html`&nbsp;`);

  const _svg = _div.select('svg');

  const _links = _svg
    .select('g.edges')
    .selectAll('path')
    .data(edges)
    .join(
      build({
        append: 'path',
        'stroke-width': 3,
        // opacity: 0.6
      } as any) as any
    );

  const _nodes = _svg
    .select('g.nodes')
    .selectAll('g')
    .data(data, (d: any) => d.label)
    .join(
      build({
        append: 'g',
        call: [
          build({ append: 'rect', ...rect } as any) as any,
          build({
            append: 'text',
            text: (d: any) => d.label,
            ...text,
          } as any) as any,
          nmDrag(simulation),
        ],
      } as any) as any
    );

  const _value = _svg
    .selectAll('text.criteria')
    .data([''])
    .join(
      build({
        append: 'text',
        classed: 'criteria',
        text: 1,
        dx: '300',
        dy: '150',
        ...node.text,
      } as any) as any
    );

  const ratio = ({ source: s, target: t }: any) =>
    (Math.pow(data[s].x - data[t].x, 2) + Math.pow(data[s].y - data[t].y, 2)) /
    (Math.pow(initial[s].ox - initial[t].ox, 2) +
      Math.pow(initial[s].oy - initial[t].oy, 2));

  const colorScale = d3
    .scaleLinear()
    .domain([0, 1, 3])
    .range(['red', 'blue', 'red'] as any);

  const stdgraph = {
    nodes: initial.map((v: any, i: any) => ({
      ...v,
      index: i,
      x: v.ox,
      y: v.oy,
    })),
    edges,
  };

  simulation.on('tick', () => {
    _nodes.style(
      'transform',
      ({ x, y }: any) => `translate3d(${x}px, ${y}px, 0)`
    );
    _links.call(attrs, {
      d: ({ source: s, target: t }: any) =>
        `M${data[s].x + 30},${data[s].y + 20}
  L${data[t].x + 30},${data[t].y + 20}`,
      stroke: (st: any) => colorScale(ratio(st)),
    });

    _value.text(
      eb_rsd(stdgraph, {
        nodes: data.map((v: any, i: any) => ({ ...v, index: i })),
        edges,
      }).value.toFixed(2)
    );
  });

  $div.value = data;
  return $div;
}

function nmSimulation(data: any) {
  data = data.map((v: any) => ({ ...v }));
  const simulation = d3
    .forceSimulation(data)
    .force(
      'x',
      d3
        .forceX()
        .x((v: any) => v.ox)
        .strength(0.3)
    )
    .force(
      'y',
      d3
        .forceY()
        .y((v: any) => v.oy)
        .strength(0.3)
    );

  return { data, simulation };
}

const elStates = [
  {
    nodes: [
      { label: 'A', ox: 55, oy: 110 },
      { label: 'B', ox: 102, oy: 107 },
      { label: 'C', ox: 87, oy: 74 },
      { label: 'D', ox: 130, oy: 88 },
      { label: 'E', ox: 300, oy: 20 },
    ],
    caption: html`Initial ${tex`\mathcal{E}`}`,
  },
  {
    nodes: [
      { label: 'A', ox: 21.83100439971076, oy: 122.56899510486951 },
      { label: 'B', ox: 85.89153247215957, oy: 120.9199285514563 },
      { label: 'C', ox: 84.18211368254869, oy: 63.841778151559375 },
      { label: 'D', ox: 149.94017298158278, oy: 80.61963603432272 },
      { label: 'E', ox: 300, oy: 20 },
    ],
    caption: html`Utilisation de PRISM ${cite(bib.Gansner2010)}`,
  },
  {
    nodes: [
      { label: 'A', ox: 48.5, oy: 112 },
      { label: 'B', ox: 108.5, oy: 117.5 },
      { label: 'C', ox: 78.5, oy: 72 },
      { label: 'D', ox: 138.500001, oy: 77.5 },
      { label: 'E', ox: 300, oy: 20 },
    ],
    caption: html`VPSC ${cite(bib.Dwyer2005)} semble être une meilleure
    alternative.`,
  },
];

export default {
  title: 'Préservation des longueurs des arêtes',
  content: (_opts: PageData, $holder: HTMLDivElement) => {
    $holder.classList.add('flex', 'flex-column');
    const $ref = html`<div class="flex-grow-1"></div>`;
    $holder.append($ref);
    $holder.append(html`<p class="caption">Initial ${tex`\mathcal{E}`}</p>`);

    const { height } = $ref.getBoundingClientRect();

    $holder.replaceChild(
      svg`<svg height=${height} viewbox="0, 10, 400, 160">
    <g class=nodes></g>
    <g class=edges></g>
  </svg>`,
      $ref
    );

    const simulation = nmSimulation(elStates[0].nodes);

    navigation({ max: elStates.length, stopPropagation: true })
      .on('page', (page) =>
        elChart(elStates[page], {
          $div: $holder,
          edges: [l(0, 1), l(0, 2), l(1, 2), l(1, 3), l(2, 3), l(3, 4)],
          initial: elStates[0].nodes,
          ...simulation,
        })
      )
      .bind($holder)
      .first();
  },
};
