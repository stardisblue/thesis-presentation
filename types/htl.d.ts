declare module 'htl' {
  declare interface html {
    (arr: TemplateStringsArray, ...args: any[]): HTMLElement;
    fragment: (arr: TemplateStringsArray, ...args: any[]) => HTMLElement;
  }
  declare const html: html;

  declare function svg(arr: TemplateStringsArray, ...args: any[]): SVGElement;
}
