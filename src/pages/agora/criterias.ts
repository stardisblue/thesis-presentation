import md from '../../md';

export default {
  title: 'Classes de critères',
  content: md`<div class="lh-copy">
  22 critères
  
  ${[
    {
      fr: "Préservation de l'ordre orthogonal",
      en: 'Orthogonal Ordering',
      count: 4,
    },
    { fr: "Minimisation de l'expansion", en: 'Spread Minimisation', count: 4 },
    {
      fr: 'Conservation du rapport de forme',
      en: 'Global Shape Preservation',
      count: 3,
    },
    {
      fr: 'Min. du mouvement des noeuds',
      en: 'Node Movement Minimisation',
      count: 8,
    },
    {
      fr: 'Préservation des longeurs des arêtes',
      en: 'Edge Length Preservation',
      count: 3,
    },
  ].map(
    ({ fr, en, count }) =>
      `- ${en} (${count}) *<small style="font-size: 0.7em">${fr}</small>*\n`
  )} `,
};
