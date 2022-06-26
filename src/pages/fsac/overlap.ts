import { scaleLinear } from 'd3';
import { html, svg } from 'htl';
import { PageObject } from '../../pages';
import tex from '../../tex';

const c0 = { label: 'S', x: 380, y: 300, r: 100 };
const c1 = { label: 'T', x: 530, y: 290, r: 110 };
const circles = [
  { label: 'R', x: 110, y: 180, r: 100 },
  { label: 'U', x: 710, y: 310, r: 100 },
  { label: 'V', x: 450, y: 500, r: 100 },
  c0,
  c1,
];
const centers = { x1: c0.x, y1: c0.y, x2: c1.x, y2: c1.y };
export const overlap: PageObject = {
  title: 'Résoudre les chevauchements',
  content: (_o, $container) => {
    const $svgcontainer = html`<div class="relative w-70"></div>`;
    const $div = html`<div class="w-30"></div>`;

    $container.append(html`<div class="flex">${$svgcontainer}${$div}</div>`);
    const { width } = $svgcontainer.getBoundingClientRect();
    const x = scaleLinear().domain([0, 1000]).range([0, width]);

    const $svg = svg`<svg viewBox="0 0 1000 610" width="${x(1000)}">
    <g stroke=black>
    ${circles.map(
      (c) => svg`<g transform="translate(${c.x}, ${c.y})">
      <circle r=${c.r} fill=blue fill-opacity=0.1 />`
    )}`;
    $svgcontainer.append($svg);
  },
};

export const radius: PageObject = {
  title: 'Résoudre les chevauchements',
  content: (_o, $container) => {
    const $svgcontainer = html`<div class="relative w-70"></div>`;
    const $div = html`<div class="w-30"></div>`;

    $container.append(html`<div class="flex">${$svgcontainer}${$div}</div>`);
    const { width } = $svgcontainer.getBoundingClientRect();
    const x = scaleLinear().domain([0, 1000]).range([0, width]);
    const $svg = svg`<svg viewBox="0 0 1000 610" width=${x(1000)} >
    <g stroke=black>
    ${circles.map(
      (c) => svg`<g transform="translate(${c.x}, ${c.y})" opacity=${
        c.label !== 'S' ? 0.2 : 1
      }>
      <circle r=${c.r} fill=none />
      <circle r=3 stroke=none />
      <line x1=0 x2=0 y1=0 y2=${-c.r} stroke-width=1 />`
    )}`;

    const $reproject = html.fragment`<div
        class="absolute"
        style="top:${x(c0.y - 10)}px;left:${x(c0.x)}px"
      >
        ${tex`c`}
      </div>
      <div
        class="absolute"
        style="top: ${x(c0.y - 20 - c0.r / 2)}px; left:${x(c0.x - 40)}px"
      >
        ${tex`r`}
      </div>`;

    $svgcontainer.append($svg, $reproject);

    $div.append(html.fragment`<p>${tex`r`} rayon</p>
      <p>${tex`c`} centre</p>`);
  },
};

export const naming: PageObject = {
  title: 'Résoudre les chevauchements',
  content: function (_o, $container) {
    const $svgcontainer = html`<div class="relative w-70"></div>`;
    const $div = html`<div class="w-30"></div>`;

    $container.append(html`<div class="flex">${$svgcontainer}${$div}</div>`);
    const { width } = $svgcontainer.getBoundingClientRect();
    const x = scaleLinear().domain([0, 1000]).range([0, width]);
    const $svg = svg`<svg viewBox="0 0 1000 610" width=${x(1000)} >
    <g stroke=black>
    ${circles.map(
      (c) => svg`<g transform="translate(${c.x}, ${c.y})" opacity=${
        c.label !== 'S' ? 0.2 : 1
      }>
      <circle r=${c.r} fill=none />
      <circle r=3 stroke=none />`
    )}`;

    $svgcontainer.append(
      $svg,
      ...circles.map(
        (c) => html`<div
          class="absolute"
          style="left:${x(c.x)}px;top:${x(c.y - 10)}px;opacity:${c.label !== 'S'
            ? 0.2
            : 1}"
        >
          ${tex`c_${c.label}`}
        </div>`
      )
    );
  },
};

export const green: PageObject = {
  title: 'Détection du chevauchement',
  content: function (_o, $container) {
    const $svgcontainer = html`<div class="relative w-70"></div>`;
    const $div = html`<div class="w-30"></div>`;

    $container.append(html`<div class="flex">${$svgcontainer}${$div}</div>`);
    const { width } = $svgcontainer.getBoundingClientRect();
    const x = scaleLinear().domain([0, 1000]).range([0, width]);
    const $svg = svg`<svg viewBox="0 0 1000 610" width=${x(1000)} >
    <g stroke=black>
    ${circles.map(
      (c) => svg`<g transform="translate(${c.x}, ${c.y})" opacity=${
        c.label === 'T' || c.label === 'S' ? 1 : 0.2
      }>
      <circle r=${c.r} fill=none stroke=${
        c.label === 'T' ? 'green' : 'black'
      } />
      <circle r=3 stroke=none fill=${c.label === 'T' ? 'green' : 'black'} />`
    )}`;

    $svgcontainer.append(
      $svg,
      ...circles.map(
        (c) => html`<div
          class="absolute"
          style="left:${x(c.x)}px;top:${x(c.y - 10)}px;opacity:${c.label ===
            'T' || c.label === 'S'
            ? 1
            : 0.2}; color: ${c.label === 'T' ? 'green' : 'black'}"
        >
          ${tex`c_${c.label}`}
        </div>`
      )
    );
  },
};

const fused = (function () {
  const n0 = Math.pow(c0.r, 2);
  const n1 = Math.pow(c0.r, 2);
  const n = n0 + n1;
  return {
    label: 'W',
    x: (c0.x * n0 + c1.x * n1) / n,
    y: (c0.y * n0 + c1.y * n1) / n,
    r: Math.sqrt(n),
  };
})();

export const newcircle: PageObject = {
  title: 'Agglomération des cercles',
  content: function (_o, $container) {
    const $svgcontainer = html`<div class="relative w-70"></div>`;
    const $div = html`<div class="w-30"></div>`;

    $container.append(html`<div class="flex">${$svgcontainer}${$div}</div>`);
    const { width } = $svgcontainer.getBoundingClientRect();
    const x = scaleLinear().domain([0, 1000]).range([0, width]);
    const $svg = svg`<svg viewBox="0 0 1000 610" width=${x(1000)} >
    <g stroke=black>
    <g opacity=0.2>
      ${circles.map(
        (c) => svg`<g transform="translate(${c.x}, ${c.y})">
        <circle r=${c.r} fill=none />
        <circle r=3 stroke=none />`
      )}
      <line ${centers} stroke-dasharray="5,5" stroke-width=1 />
    </g>
    <g transform="translate(${fused.x}, ${fused.y})">
      <circle r=${fused.r} fill=none />
      <circle r=3 stroke=none /></g></g>
  `;

    $svgcontainer.append(
      $svg,
      ...circles.map(
        (c) => html`<div
          class="absolute"
          style="opacity:0.2; top:${x(c.y - 10)}px;left:${x(c.x)}px"
        >
          ${tex`c_${c.label}`}
        </div>`
      ),
      html`<div
        class="absolute"
        style="top:${x(fused.y - 10)}px;left:${x(fused.x)}px"
      >
        ${tex`c_${fused.label}`}
      </div>`
    );

    $div.append(
      tex.block`c_W = \frac{r_S^2 \times c_S + r_T^2 \times c_T }{r_S^2 + r_T^2}`,
      tex.block`r_W = \sqrt{r_S^2 + r_T^2}`
    );
  },
};

export const again: PageObject = {
  title: 'Nouveau chevauchement occasionné',
  content: function (_o, $container) {
    const $svgcontainer = html`<div class="relative w-70"></div>`;
    const $div = html`<div class="w-30"></div>`;

    $container.append(html`<div class="flex">${$svgcontainer}${$div}</div>`);
    const { width } = $svgcontainer.getBoundingClientRect();
    const x = scaleLinear().domain([0, 1000]).range([0, width]);
    const $svg = svg`<svg viewBox="0 0 1000 610" width=${x(1000)} >
    <g stroke=black>
    <g>
      ${circles
        .filter((c) => c.label !== 'S' && c.label !== 'T')
        .map(
          (c) => svg`<g transform="translate(${c.x}, ${c.y})">
        <circle r=${c.r} fill=none stroke="${
            c.label === 'V' ? 'green' : 'black'
          }"/>
        <circle r=3 stroke=none fill="${
          c.label === 'V' ? 'green' : 'black'
        }" />`
        )}
     </g>
    <g transform="translate(${fused.x}, ${fused.y})">
      <circle r=${fused.r} fill=none />
      <circle r=3 stroke=none /></g></g>
  `;

    $svgcontainer.append(
      $svg,
      ...circles
        .filter((c) => c.label !== 'S' && c.label !== 'T')
        .map(
          (c) => html`<div
            class="absolute"
            style="top:${x(c.y - 10)}px;left:${x(c.x)}px;color: ${c.label ===
            'V'
              ? 'green'
              : 'black'}"
          >
            ${tex`c_${c.label}`}
          </div>`
        ),
      html`<div
        class="absolute"
        style="top:${x(fused.y - 10)}px;left:${x(fused.x)}px"
      >
        ${tex`c_${fused.label}`}
      </div>`
    );

    $div.append(
      html`<p>Processus itératif ${tex`O(n)`}</p>`,
      html`<p>Détecter les chevauchements ${tex`O(n^2)`}</p>`,
      tex.block`O(n \times n^2)`
    );
  },
};

export default [overlap, radius, naming, green, newcircle, again];
