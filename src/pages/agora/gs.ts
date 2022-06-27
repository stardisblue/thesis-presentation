import { html, svg } from 'htl';
import _ from 'lodash';
import { attrs, build, styles } from '../../d3-utils';
import { PageData } from '../../pages';
import tex from '../../tex';
import gsBad from './datasets/gsBad.json';
import spreadInitial from './datasets/spreadInitial.json';
import spreadGood from './datasets/spreadGood.json';
import * as d3 from 'd3';
import { navigation } from '../../navigation';
import { GlobalShape } from 'agora-criteria';
import { bib, cite } from '../../bib';

const gs_bb_iar = GlobalShape.BoundingBox.ImprovedAspectRatio.criteria;

const node = {
  rect: {
    fill: '#eee',
    stroke: 'lightgray',
    rx: 2,
  },
  text: {
    'font-size': '16px',
    'text-anchor': 'middle',
    'dominant-baseline': 'middle',
  },
};

function linkEdges(nodes: any, edges: any) {
  const indexNodes = _.keyBy(nodes, 'index');
  return _.map(edges, ({ source, target, ...rest }) => ({
    ...rest,
    source: indexNodes[source],
    target: indexNodes[target],
  }));
}

function createGraph(_graph: any) {
  const rect = {
    ...node.rect,
    append: 'rect',
    width: (n: any) => n.width,
    height: (n: any) => n.height,
  };

  const edge = {
    append: 'path',
    class: 'edges',
    d: ({ source, target }: any) =>
      `M ${source.x} ${source.y} L ${target.x} ${target.y}`,
    stroke: 'CornflowerBlue',
    'stroke-width': 1,
  };

  _graph
    .selectAll('path.edges')
    .data(({ graph: { nodes, edges } }: any) => linkEdges(nodes, edges))
    .join(build(edge as any) as any, (update: any) =>
      update.call((u: any) =>
        u
          .transition()
          .duration(1000)
          .attr(
            'd',
            ({ source, target }: any) =>
              `M ${source.x} ${source.y} L ${target.x} ${target.y}`
          )
      )
    );
  _graph
    .selectAll('g.nodes')
    .data(
      (d: any) => d.graph.nodes,
      (d: any) => d.index
    )
    .join(
      build({
        append: 'g',
        classed: 'nodes',
        style: {
          transform: ({ x, y, width: w, height: h }: any) =>
            `translate3d(${x - w / 2}px, ${y - h / 2}px, 0)`,
        },
        call: build(rect as any) as any,
      } as any) as any,
      (update: any) =>
        update.call((u: any) =>
          u
            .transition()
            .duration(1000)
            .call(styles, {
              transform: ({ x, y, width: w, height: h }: any) =>
                `translate3d(${x - w / 2}px, ${y - h / 2}px, 0)`,
            })
        )
    );
  return _graph;
}

function gsChart(
  state: any,
  { $div, graphs: { initial, bad, good } }: { $div: any; graphs: any }
) {
  const _div = d3.select($div);
  const _svg = _div.select('svg');

  const hull = (data: any) => {
    const [minX, maxX] = d3.extent(
      data.flatMap((v: any) => [v.x - v.width / 2, v.x + v.width / 2])
    );
    const [minY, maxY] = d3.extent(
      data.flatMap((v: any) => [v.y - v.height / 2, v.y + v.height / 2])
    );
    if (minX === undefined) return [];
    return [
      [minX, minY],
      [minX, maxY],
      [maxX, maxY],
      [maxX, minY],
    ];
  };

  const initial_small = `translate3d(150px, 1px, 0)scale(0.6)`;
  const bad_small = 'translate3d(40px, 70px, 0)scale(0.6)';
  const good_small = 'translate3d(270px, 75px, 0)scale(0.6)';

  const caption = {
    append: 'text',
    ...node.text,
    'font-size': ({ show }: any) =>
      show === 'small' || show === false ? '16px' : '10px',
    dx: '75px',
    dy: '110px',
    text: () => `1.00`,
  };

  _svg
    .selectAll('g.bad')
    .data([
      {
        graph:
          state.bad === 'initial'
            ? initial
            : state.bad === 'small'
            ? bad
            : { nodes: [], edges: [] },
        show: state.bad,
      },
    ])
    .join(
      build({
        append: 'g',
        classed: 'bad',
        style: {
          transform: ({ show }: any) =>
            show === 'initial' ? initial_small : bad_small,
        },
        opacity: ({ show }: any) => (show === 'small' ? 1 : 0),
        call: [
          createGraph,
          build({ ...caption, property: { _current: 1 } } as any) as any,
          (g: any) =>
            (
              build(
                {
                  append: 'path',
                  d: (v: any) => `M${hull(v.graph.nodes).join('L')}Z`,
                  opacity: (v: any) => (v.show === 'small' ? 1 : 0),
                  'fill-opacity': 0,
                } as any,
                g
              ) as any
            )
              .transition()
              .delay(1000)
              .duration(1000)
              .call(attrs, {
                'fill-opacity': 0.3,
                stroke: 'lightred',
                fill: 'red',
              }),
        ],
      } as any) as any,
      (update) =>
        update.call((u) =>
          u
            .call(createGraph)
            .call((_graph) =>
              _graph
                .select('path')
                .attr('d', (v) => `M${hull(v.graph.nodes).join('L')}Z`)
                .transition()
                .delay(1000)
                .duration(1000)
                .call(attrs as any, {
                  stroke: 'lightred',
                  opacity: (v: any) => (v.show === 'small' ? 1 : 0),
                  'fill-opacity': 0.3,
                  fill: 'red',
                })
            )
            .call((u) =>
              u
                .select('text')
                .transition()
                .duration(1000)
                .call(attrs as any, {
                  dy: ({ show }: any) => (show === 'small' ? '130px' : '110px'),
                  dx: ({ show }: any) => (show === 'small' ? '90px' : '75px'),
                  fill: ({ show }: any) => (show === 'small' ? 'red' : 'black'),
                })
                .textTween(function (this: any, d) {
                  const i = d3.interpolate(
                    this._current,
                    d.show === 'small' ? gs_bb_iar(initial, d.graph).value : 1
                  );
                  return function (this: any, t) {
                    return (this._current = i(t)).toFixed(2);
                  };
                })
            )
            .attr('opacity', ({ show }) => (show === 'small' ? 1 : 0))
            .transition()
            .duration(1000)
            .call(styles as any, {
              transform: ({ show }: any) =>
                show === 'initial' || show === false
                  ? initial_small
                  : bad_small,
            })
        )
    );

  _svg
    .selectAll('g.good')
    .data([
      {
        graph:
          state.good === 'initial'
            ? initial
            : state.good === 'small'
            ? good
            : { nodes: [], edges: [] },
        show: state.good,
      },
    ])
    .join(
      build({
        append: 'g',
        classed: 'good',
        style: {
          transform: ({ show }: any) =>
            show === 'initial' ? initial_small : good_small,
        },
        opacity: ({ show }: any) => (show === 'small' ? 1 : 0),
        call: [
          createGraph,
          build({ ...caption, property: { _current: 1 } } as any),
          (g: any) =>
            (
              build(
                {
                  append: 'path',
                  d: (v: any) => `M${hull(v.graph.nodes).join('L')}Z`,
                  opacity: (v: any) => (v.show === 'small' ? 1 : 0),
                  'fill-opacity': 0,
                } as any,
                g
              ) as any
            )
              .transition()
              .delay(1000)
              .duration(1000)
              .call(attrs, {
                'fill-opacity': 0.3,
                stroke: 'lightgreen',
                fill: 'green',
              }),
        ],
      } as any) as any,
      (update) =>
        update.call((u) =>
          u
            .attr('opacity', ({ show }) => (show === 'small' ? 1 : 0))
            .transition()
            .duration(1000)
            .call(styles as any, {
              transform: ({ show }: any) =>
                show === 'initial' ? initial_small : good_small,
            })
            .selection()
            .call((u) =>
              u
                .select('text')
                .transition()
                .duration(1000)
                .attr('dy', ({ show }) =>
                  show === 'small' ? '120px' : '110px'
                )
                .attr('dx', ({ show }) => (show === 'small' ? '60px' : '75px'))
                .attr('fill', ({ show }) =>
                  show === 'small' ? 'green' : 'black'
                )
                .textTween(function (this: any, d) {
                  const i = d3.interpolate(
                    this._current,
                    d.show === 'small' ? gs_bb_iar(initial, d.graph).value : 1
                  );
                  return function (this: any, t) {
                    return (this._current = i(t)).toFixed(2);
                  };
                })
            )
            .call(createGraph)
            .call((_graph) =>
              _graph
                .select('path')
                .attr('d', (v) => `M${hull(v.graph.nodes).join('L')}Z`)
                .transition()
                .delay(1000)
                .duration(1000)
                .call(attrs as any, {
                  stroke: 'lightgreen',
                  opacity: (v: any) => (v.show === 'small' ? 1 : 0),
                  'fill-opacity': 0.3,
                  fill: 'green',
                })
            )
        )
    );

  _svg
    .selectAll('g.initial')
    .data([{ graph: initial, show: state.initial }])
    .join(
      build({
        append: 'g',
        classed: 'initial',
        style: {
          transform: ({ show }: any) =>
            show === 'full' || show === 'no-hull'
              ? `translate3d(100px, 10px, 0)scale(1.3)`
              : initial_small,
        },
        call: [
          createGraph,
          build({
            append: 'path',
            classed: 'hull',
            d: (v: any) => `M${hull(v.graph.nodes).join('L')}Z`,
            stroke: 'lightblue',
            'fill-opacity': '0.3',
            fill: 'lightblue',
            opacity: (d: any) => (d.show === 'no-hull' ? 0 : 1),
          } as any),
          build(caption as any) as any,
        ],
      } as any) as any,
      (update) =>
        update.call((u) =>
          u
            .call((u) =>
              u
                .select('path.hull')
                .transition()
                .attr('opacity', (d) => (d.show === 'no-hull' ? 0 : 1))
            )
            .call((u) =>
              u
                .select('text')
                .transition()
                .attr('font-size', ({ show }) =>
                  show === 'small' ? '16px' : '10px'
                )
            )
            .transition()
            .call(styles as any, {
              transform: ({ show }: any) =>
                show === 'full' || show === 'no-hull'
                  ? `translate3d(100px, 10px, 0)scale(1.3)`
                  : initial_small,
            })
        )
    );
  const references = (div: any) =>
    div
      .selectAll('span.caption')
      .data((d: any) => d)
      .join(
        build({
          append: ([, d]: any) => d,
          style: { opacity: ([d]: any) => (d === 'small' ? 1 : 0) },
        } as any),
        (update: any) =>
          update.call((u: any) => {
            u.transition()
              .duration(1000)
              .style('opacity', ([d]: any) => (d === 'small' ? 1 : 0));
          })
      );

  _div
    .selectAll('div.nts')
    .data([
      [
        [
          state.bad,
          html`<span class="caption">GTREE ${cite(bib.Hayashi1998)}</span>`,
        ],
        [
          state.good,
          html`<span class="caption">VPSC ${cite(bib.Dwyer2005)}</span>`,
        ],
      ],
    ])
    .join(
      build({
        append: () =>
          html`<div
            class="nts"
            style="display: flex; justify-content: space-around"
          ></div>`,
        call: references,
      } as any) as any,
      (update) => update.call(references)
    );

  return $div;
}

const gsStates = [
  { initial: 'no-hull', bad: false, good: false },
  //   { initial: 'full', bad: false, good: false },
  { initial: 'small', bad: 'initial', good: 'initial' },
  { initial: 'small', bad: 'small', good: 'small' },
];

const graphs = { initial: spreadInitial, bad: gsBad, good: spreadGood };

export default {
  title: `Global Shape Preservation`,
  content: (_opts: PageData, $holder: HTMLDivElement) => {
    $holder.classList.add('flex', 'flex-column');
    $holder.append(html`<h4>Préserver le rapport de forme</h4>`);

    const funct = tex.block`\max{\left(\frac{w'_{bb} \times h_{bb}} {h'_{bb} \times w_{bb}}, \frac{h'_{bb} \times w_{bb}} {w'_{bb} \times h_{bb}}\right)}`;

    const $svgsize = html`<div class="flex-grow-1"></div>`;
    const $div = html`<div class="flex flex-column flex-grow-1">
      ${$svgsize}
      <div class="nts" style="display: flex; justify-content: space-around">
        <span class="caption o-0">PFS' ${cite(bib.Hayashi1998)}</span>
      </div>
      <div class="flex justify-around items-center">
        ${funct}
        <span class="caption"
          ><span><i>Improved Aspect Ratio</i> ${cite(bib.Chen2020)}</span>
          <div style="text-align: right">
            <small>extended from ${cite(bib.Li2005)}</small>
          </div></span
        >
      </div>
    </div>`;

    $holder.append($div);

    const { height } = $svgsize.getBoundingClientRect();
    $div.replaceChild(
      svg`<svg width="100%" height="${height}" viewbox="0, 0, 300, 180"></svg>`,
      $svgsize
    );

    navigation({ max: gsStates.length, stopPropagation: true })
      .on('page', (page) => gsChart(gsStates[page], { $div, graphs }))
      .bind($holder)
      .first();
  },
};
