import tex from '../tex';
import md, { mdi } from '../md';
import type { PageObject } from '../pages';
import intro from './agora/intro';
import couverture from './couverture';

const pages: (PageObject | ((page: number) => any))[] = [
  couverture,
  (page: number) => ({
    title: `AGORA`,
    content: md`
<div>hello world</div>

${tex.block`\frac{1}{hello \cup test}`}

~~~js
const i = j;
i++;
function sum(a, b) {
return a + b;
}
~~~
      `,
    footer: md`${page}`,
  }),
  intro,
  (page: number) => ({
    title: `AGORA`,
    content: md`
<div>hello world</div>

${tex.block`\frac{1}{hello \cup test}`}

~~~javascript
const i = j;
i++;
function sum(a, b) {
return a + b;
}
~~~
      `,
    footer: mdi`${page}`,
  }),
];

export default pages;
