import { bib, cite } from '../../bib';
import md from '../../md';
import tex from '../../tex';

export default {
  title: '📏 Méthodologie 📐',
  content: md`
**9 algorithmes**

> **Scaling** — **PFS** — **PFS'** — **VPSC**— **FTA** — **PRISM** — **RWordle-L**— **GTREE** — **Diamond**

**840 graphes synthétiques**<sup>[[ref]("https://github.com/agorajs/agora-dataset)]</sup>

> random — random tree — small world — scale-free
>
> 10 — 20 — 50 — 100 — 200 — 500 — 1000 noeuds
>
> placés avec ${tex`FM^3`}${cite(bib.Hachul2004)}

**14 graphes réels**<sup>[[ref](https://gitlab.com/graphviz/graphviz/-/tree/master/rtest/graphs)]</sup>

> graphviz dataset placés avec *SFDP* ${cite(bib.Hu2005)}

**7 686 graphes à évaluer sur 5 critères**
`,
};
