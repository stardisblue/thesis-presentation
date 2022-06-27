import { html } from 'htl';

const doi = (doi: string) => 'http://dx.doi.org/' + doi;

export type Biblio = {
  label: string;
  url?: string;
};

export const bib = {
  Chen2020: { label: 'Chen2020', url: doi(`10.7155/jgaa.00532`) },
  Dwyer2005: { label: 'Dwyer2005', url: doi('10.1007/11618058_15') },
  Strobelt2012: {
    label: 'Strobelt2012',
    url: doi('60910.1111/j.1467-8659.2012.03106.x'),
  },
  Meulemans2019: { label: 'Meulemans2019', url: doi('10.1111/cgf.13722') },
  Hayashi1998: { label: 'Hayashi1998', url: doi('10.1007/3-540-37623-2_14') },
  Nachmanson2016: {
    label: 'Nachmanson2016',
    url: doi('10.1007/978-3-319-50106-2_3'),
  },
  Gansner2010: { label: 'Gansner2010', url: doi('10.7155/jgaa.00198') },
  Li2005: {
    label: 'Li2005',
    url: 'https://crpit.scem.westernsydney.edu.au/abstracts/CRPITV45Li.html',
  },
  Marriott2003: { label: 'Marriott2003', url: doi('10.1023/A:1022371615202') },
  Huang2007: { label: 'Huang2007', url: doi('10.1016/j.ins.2007.02.016') },
  Misue1995: { label: 'Misue1995', url: doi('10.1006/jvlc.1995.1010') },
  Hu2005: { label: 'Hu2005' },
  Hachul2004: { label: 'Hachul2004', url: doi('10.1007/978-3-540-31843-9_29') },
  Heer2021: { label: 'Heer2021', url: doi('10.1109/VIS49827.2021.9623323') },
};

export function cite(cite: string | Biblio) {
  if (typeof cite === 'string') return html`<code>[${cite}]</code>`;

  if (cite.url)
    return html`<code>[<a href="${cite.url}" target="_blank"/>${cite.label}</a>]</code>`;

  return html`<code>[${cite.label}]</code>`;
}

// {
//   Chen2020: html`F. Chen, L. Piccinini, P. Poncelet, and A. Sallaberry. Node
//     Overlap Removal Algorithms: an Extended Comparative Study.
//     <em>Journal of Graph Algorithms and Applications (JGAA)</em>, Vol. 24, no.
//     4, pp. 683-706, 2020. doi:${doi(`10.7155/jgaa.00532`)}`,
//   Dwyer2005: html`T. Dwyer, K. Marriott, and P. J. Stuckey. Fast node overlap
//     removal.
//     <em>In Proceedings of the International Symposium on Graph Drawing (GD)</em
//     >, pages 153–164. Springer, 2005. doi:${doi('10.1007/11618058_15')}.`,
//   Strobelt2012: html`H. Strobelt, M. Spicker, A. Stoffel, D. A. Keim, and O.
//     Deussen. Rolled-out wordles: A heuristic method for overlap removal of 2D
//     data representatives. <em>Computer Graphics Forum</em>, 31(3):1135–1144,
//     2012. doi:${doi('60910.1111/j.1467-8659.2012.03106.x')}.`,
//   Meulemans2019: html`Meulemans, W. Efficient Optimal Overlap Removal:
//     Algorithms and Experiments. <em>Computer Graphics Forum</em>, 38: 713-723,
//     2019. doi:${doi('10.1111/cgf.13722')}`,
//   Hayashi1998: html`K. Hayashi, M. Inoue, T. Masuzawa, and H. Fujiwara. A layout
//     adjustment problem for disjoint rectangles preserving orthogonal order.
//     <em
//       >In Proceedings of the International Symposium on Graph Drawing (GD)<em
//         >, pages 183–197. Springer, 1998.
//         doi:${doi('10.1007/3-540-37623-2_14')}</em
//       ></em
//     >`,
//   Nachmanson2016: html`L. Nachmanson, A. Nocaj, S. Bereg, L. Zhang, and A.
//     Holroyd. Node overlap removal by growing a tree.
//     <em
//       >In Proceedings of the International Symposium on Graph Drawing and
//       Network Visualization (GD)</em
//     >, pages 33–43. Springer, 2016. doi:${doi('10.1007/978-3-319-50106-2_3')}.`,
//   Gansner2010: html`E. R. Gansner and Y. Hu. Efficient, proximity-preserving
//     node overlap removal. <em>Journal of Graph Algorithms and Applications</em>,
//     14(1):53–74, 2010. doi:${doi('10.7155/jgaa.00198')}.`,
//   Li2005: html`W. Li, P. Eades, and N. Nikolov. Using spring algorithms to
//     remove node overlapping.
//     <em
//       >In Proceedings of the Asia-Pacific Symposium on Information Visualisation
//       (APVis’05)</em
//     >, pages 131–140,
//     2005.url:${url(
//       '[PDF] crpit',
//       'https://crpit.scem.westernsydney.edu.au/abstracts/CRPITV45Li.html'
//     )}`,
//   Marriott2003: html`K. Marriott, P. Stuckey, V. Tam, and W. He. Removing node
//     overlapping in graph layout using constrained optimization.
//     <em>Constraints</em>, 8(2):143–171, 2003.
//     doi:${doi('10.1023/A:1022371615202')}.`,
//   Huang2007: html`X. Huang, W. Lai, A. Sajeev, and J. Gao. A new algorithm for
//     removing node overlapping in graph visualization.
//     <em>Information Sciences</em>, 177(14):2821 – 2844, 2007.
//     doi:${doi('10.1016/j.ins.2007.02.016')}.`,
//   Misue1995: html`K. Misue, P. Eades, W. Lai, and K. Sugiyama. Layout adjustment
//   and the mental map. Journal of Visual Languages & Computing, 6(2):183–210,
//   1995. doi:${doi('10.1006/jvlc.1995.1010')}`,
//   Hu2005: html`Hu Y. Efficient, high-quality force-directed graph drawing.
//     <em>Mathematica journal</em>. 10(1):37-71, 2005.`,
//   Hachul2004: html`S. Hachul and M. J¨unger. Drawing large graphs with a
//     potential-fieldbased multilevel algorithm.
//     <em>In Proceedings of the International Symposium on Graph Drawing (GD)</em
//     >, pages 285–295. Springer, 2004.
//     doi:${doi('10.1007/978-3-540-31843-9_29')}.`,
// }
