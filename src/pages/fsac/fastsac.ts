import { hierarchy, max, scaleLinear, select } from 'd3';
import { fsac } from 'fsac';
import { html, svg } from 'htl';
import { navigation } from '../../navigation';
import { PageObject } from '../../pages';
import tex from '../../tex';
// import imgUrl from './dataset/algo.png';

const data = [
  Cluster(2.3, 3.2, 1, null, { id: 'a', at: 0, h: 0 }),
  Cluster(1.4, 2.5, 1, null, { id: 'b', at: 0, h: 0 }),
  Cluster(3.8, 2.8, 1, null, { id: 'c', at: 0, h: 0 }),
  Cluster(5.5, 2.9, 1, null, { id: 'd', at: 0, h: 0 }),
  Cluster(5.4, 1.2, 1, null, { id: 'e', at: 0, h: 0 }),
];

const comments = [
  () => html`<p><strong>Résolution du cluster ${tex`a`}</strong></p>
    <p>Chevauchements de ${tex`a = \{b, c\}`}</p>`,
  () =>
    html` <p><strong>Résolution du cluster ${tex`a`}</strong></p>
      <p>${tex`a`} devient ${tex`a_2`} et n'a plus de chevauchements</p>`,
  () =>
    html`<p><strong>Résolution du cluster ${tex`d`}</strong></p>
      <p>Chevauchements de ${tex`d = \{e\}`}</p>`,
  () => html`<p><strong>Résolution du cluster ${tex`d`}</strong></p>
    <p>${tex`d`} devient ${tex`d_1`} en fusionnant avec ${tex`e`}</p>
    <p>${tex`d_1`} chevauche à présent avec ${tex`a_2`}</p>`,
  () => html`<p><strong>Résolution du cluster ${tex`d`}</strong></p>
    <p>${tex`d_1`} devient ${tex`d_2`} et n'a plus de chevauchements</p>`,
  () => html` <p>Complexité : ${tex`O(n^2)`}</p>`,
];

// export const fastsac: PageObject = {
//   title: 'Fast SAC',
//   content: html`<img src=${imgUrl} />`,
// };

const pages = [0, 2, 2, 3, 4, 4];

export const fastsac: PageObject = {
  title: 'Méthode heuristique',
  content: (_o, $container) => {
    $container.classList.add('flex');

    const $svgdiv = html`<div class="w-100 relative"></div>`;
    const $comments = html`<div class="w-100"></div>`;

    $container.append($svgdiv);
    $container.append($comments);
    const { width } = $svgdiv.getBoundingClientRect();

    const result = fsac(data, { merge: circleMerge() });

    navigation({ max: pages.length, stopPropagation: true })
      .on('page', (page) => {
        const show = getAtStep(
          result,
          ({ data: d }: { data: any }) => d.data.at <= pages[page]
        );

        const x = scaleLinear().domain([0, 8]).range([0, width]);
        select($svgdiv).selectChildren().remove();
        $svgdiv.append(createSvg(width, x, show));

        select($comments).selectChildren().remove();
        $comments.append(comments[page]());
      })
      .bind($container)
      .first();
  },
};

function createSvg(width: number, x: any, show: any[]): string | Node {
  return html.fragment`<svg
            viewbox="0 0 ${width} ${x(4.9)}"
            width=${width}
          >
            ${show.map(
              (c) => svg`<circle
                  cx=${x(c.x)}
                  cy=${x(c.y)}
                  r=${x(c.r)}
                  stroke="${c.data.color ?? 'black'}"
                  stroke-width="2"
                  fill="none"
                ></circle>`
            )}
          </svg>
          ${show.map(
            (c) => html`<div
              class="absolute"
              style="left:calc(${x(c.x)}px - .2em);top:calc(${x(
                c.y
              )}px - .7em);color:${c.data.color ?? 'currentColor'}"
            >
              ${tex`${c.data.id}${c.data.h ? '_' + c.data.h : ''}`}
            </div>`
          )} `;
}

function getAtStep(clusters: any, condition: any) {
  const tree = hierarchy({ children: clusters });

  function arrayDescent(node: any) {
    const stack = node.children.map((v: any) => [v, 0]);

    const acc = [];
    while (true) {
      if (stack.length === 0) return acc;

      const iter = stack[stack.length - 1];
      const [{ children }, idx] = iter;

      if (condition(iter[0])) {
        acc.push(iter[0]); // do not deep deeper
        stack.pop();
        continue;
      }

      if (children) {
        if (children.length > idx) {
          stack.push([children[idx], 0]);
          iter[1]++;
          continue;
        }

        stack.pop();
        continue;
      }

      console.error('we are not supposed to be here');
      stack.pop(); // but we will infiniteloop securize it either way
    }

    return acc;
  }

  return arrayDescent(tree).map((d) => d.data);
}

function Cluster(
  x: number,
  y: number,
  n: number,
  children: any = null,
  data: any = null
) {
  const obj: any = { x, y, r: Math.sqrt(n), n };
  if (children !== null) obj.children = children;
  if (data !== null) obj.data = data;
  return obj;
}

function circleMerge() {
  let cid = 1;
  return function (a: any, b: any) {
    const xs = a.x * a.n + b.x * b.n,
      ys = a.y * a.n + b.y * b.n,
      n = a.n + b.n;
    return Cluster(xs / n, ys / n, n, [a, b], {
      id: a.data.id,
      at: cid++,
      h: a.data.h + 1,
    });
  };
}
