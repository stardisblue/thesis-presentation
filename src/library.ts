import { Library } from '@observablehq/stdlib';
const lib: any = {};
Library.bind(lib)();

export default async function () {
  return { md: await lib.md(), tex: await lib.tex() };
}
