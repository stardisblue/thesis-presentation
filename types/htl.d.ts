declare module 'htl' {
  interface html {
    fragment: (arr: TemplateStringsArray, ...args: any[]) => HTMLElement;
  }

  function html(strings: TemplateStringsArray, ...args: any[]): HTMLElement;

  module html {
    function fragment(arr: TemplateStringsArray, ...args: any[]): HTMLElement;
  }

  function svg(arr: TemplateStringsArray, ...args: any[]): SVGElement;
}
