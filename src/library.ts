import { Library } from '@observablehq/stdlib';
const lib: any = {};
Library.bind(lib)();
export const md = await lib.md();
export const tex = await lib.tex();
