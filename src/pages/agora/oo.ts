import * as d3 from 'd3';
import { html, svg } from 'htl';
import _ from 'lodash';
import { build } from '../../d3-utils';
import { PageData } from '../../pages';
import tex from '../../tex';

function ooDrag(_lines: any, $tex: any) {
  return d3
    .drag()
    .on('start', function () {
      d3.select(this).raise().select('rect').attr('stroke', 'black');
    })
    .on('drag', function (event, d: any) {
      d3.select(this)
        .style(
          'transform',
          `translate3d(${(d.x = event.x)}px, ${(d.y = event.y)}px, 0)`
        )
        .select('rect')
        .attr('fill', d.x <= 70 || d.y <= 20 ? 'red' : '#eee');

      _lines.attr('stroke', ({ orient }: any) =>
        (d.x <= 70 && orient === 'x') || (d.y <= 20 && orient === 'y')
          ? 'red'
          : 'blue'
      );

      $tex.replaceChildren(
        tex`\text{nni} = ${((d.x <= 70 ? 1 : 0) + (d.y <= 20 ? 1 : 0)) / 2}`
      );
    })
    .on('end', function () {
      d3.select(this).select('rect').attr('stroke', 'lightgray');
    });
}

export function chartOO() {
  const $svg = svg`<svg id="chartOO" viewbox="0, 0, 400, 150">`;

  const $tex = html`<span>${tex`\text{nni} = 0`}</span>`;

  const _svg = d3.select($svg);

  _svg.on('click', function (e) {
    e.stopPropagation();
  });

  const rect = {
    fill: '#eee',
    stroke: 'lightgray',
    width: 60,
    height: 40,
    rx: 2,
  };
  const text = {
    'font-size': '16px',
    'text-anchor': 'middle',
    'dominant-baseline': 'middle',
    dx: 30,
    dy: 20,
  };

  const lines = [
    {
      orient: 'x',
      d: [
        [100, 0],
        [100, 200],
      ],
    },
    {
      orient: 'y',
      d: [
        [30, 40],
        [370, 40],
      ],
    },
  ];

  const _lines = _svg
    .selectAll('path')
    .data(lines)
    .join(
      build({
        append: 'path',
        d: ({ d }: any) => d3.line()(d),
        stroke: 'blue',
        'stroke-dasharray': '8 16',
      } as any) as any
    );

  _svg
    .call(
      build({
        append: 'g',
        style: { transform: 'translate3d(70px, 20px, 0)' },
        call: [
          build({ append: 'rect', ...rect } as any) as any,
          build({ append: 'text', text: 'A', ...text } as any) as any,
        ],
      } as any) as any
    )
    .call(
      build({
        append: 'g',
        style: { transform: 'translate3d(270px, 80px, 0)' },
        call: [
          build({ append: 'rect', ...rect } as any) as any,
          build({ append: 'text', text: 'B', ...text } as any) as any,
          (g: any) => g.datum({ x: 270, y: 80 }),
          ooDrag(_lines, $tex),
        ],
      } as any) as any
    );

  return [$svg, $tex];
}

export default {
  title: `Orthogonal Ordering`,
  content: (_opts: PageData, $holder: HTMLDivElement) => {
    $holder.classList.add('flex', 'flex-column');
    const $ref = html`<div class="flex-grow-1"></div>`;

    const [$svg, $div] = chartOO();
    $svg.addEventListener('pointerup', (e) => e.stopPropagation());

    $holder.append(
      html`<h4>Préserver l'ordre des noeuds sur ${tex`x`} et ${tex`y`}</h4>`,
      $ref,
      $div
    );

    const { height } = $ref.getBoundingClientRect();
    $svg.style.height = '' + height;
    $holder.replaceChild($svg, $ref);
  },
};
