import { NodeMovement } from 'agora-criteria';
import * as d3 from 'd3';
import { html, svg } from 'htl';
import { build, attrs } from '../../d3-utils';
import { navigation } from '../../navigation';
import { PageData } from '../../pages';
import tex from '../../tex';
import { node } from './utils/node';

function generateArrow(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  flangeSize: number,
  padding1: number,
  padding2: number
) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.sqrt(dx * dx + dy * dy);

  let multiplier1 = padding1 / length;
  const dx1 = dx * multiplier1;
  const dy1 = dy * multiplier1;

  let multiplier2 = padding2 / length;
  const dx2 = dx * multiplier2;
  const dy2 = dy * multiplier2;

  var px = y1 - y2;
  var py = x2 - x1;
  let plength = Math.sqrt(px * px + py * py);
  let pmultiplier = flangeSize / plength;

  const px1 = px * pmultiplier;
  const py1 = py * pmultiplier;

  const sx = dx * pmultiplier;
  const sy = dy * pmultiplier;

  const a1 = x1 + dx1;
  const b1 = y1 + dy1;
  const a2 = x2 - dx2;
  const b2 = y2 - dy2;

  return `
      M${a1}, ${b1}
      L${a2}, ${b2}
      M${a2 + px1 - sx}, ${b2 + py1 - sy}
      L${a2}, ${b2}
      L${a2 - px1 - sx}, ${b2 - py1 - sy}
    `;
}

const nm_dm_imse =
  NodeMovement.DistanceMoved.ImprovedMeanSquaredEuclidean.criteria;

const nmStates = [
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
    caption: html`Utilisation de PRISM ${'Gansner2010'}`,
  },
  {
    nodes: [
      { label: 'A', ox: 48.5, oy: 112 },
      { label: 'B', ox: 108.5, oy: 117.5 },
      { label: 'C', ox: 78.5, oy: 72 },
      { label: 'D', ox: 138.500001, oy: 77.5 },
      { label: 'E', ox: 300, oy: 20 },
    ],
    caption: html`VPSC ${'Dwyer2005'} semble être une meilleure alternative.`,
  },
];

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

function nmChart(state: any, { initial, $div, data, simulation }: any) {
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
  if (state.caption) (_caption.node() as any).replaceChildren(state.caption);
  else (_caption.node() as any).replaceChildren(html`&nbsp;`);

  const _svg = _div.select('svg');

  const _links = _svg
    .select('g.edges')
    .selectAll('path')
    .data(d3.zip(initial, data))
    .join(
      build({
        append: 'path',
        stroke: 'red',
        'stroke-width': 3,
        fill: 'red',
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

  const stdgraph = {
    nodes: initial.map((v: any, i: any) => ({
      ...v,
      index: i,
      x: v.ox,
      y: v.oy,
    })),
    edges: [],
  };

  simulation.on('tick', () => {
    _nodes.style(
      'transform',
      ({ x, y }: any) => `translate3d(${x}px, ${y}px, 0)`
    );
    _links.call(attrs as any, {
      d: ([o, d]: any) => {
        return Math.abs(o.ox - d.x) + Math.abs(o.oy - d.y) > 3
          ? generateArrow(o.ox + 30, o.oy + 20, d.x + 30, d.y + 20, 4, 0, 0)
          : '';
      },
    });

    _value.text(
      nm_dm_imse(stdgraph, {
        nodes: data.map((v: any, i: any) => ({ ...v, index: i })),
        edges: [],
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

export default {
  title: 'Node Movement Minimisation',
  content: (_opts: PageData, $holder: HTMLDivElement) => {
    $holder.classList.add('flex', 'flex-column');
    $holder.append(html`<h4>Minimiser le mouvement des noeuds</h4>`);
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

    const simulation = nmSimulation(nmStates[0].nodes);
    navigation({ max: nmStates.length, stopPropagation: true })
      .on('page', (page) =>
        nmChart(nmStates[page], {
          $div: $holder,
          initial: nmStates[0].nodes,
          ...simulation,
        })
      )
      .bind($holder)
      .first();
  },
};
