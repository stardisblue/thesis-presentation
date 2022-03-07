declare module "htl" {
  declare interface html {
    fragment: (arr: TemplateStringsArray, ...args: any[]) => HTMLElement;
  }
  declare function html(
    strings: TemplateStringsArray,
    ...args: any[]
  ): HTMLElement;
  declare function svg(arr: TemplateStringsArray, ...args: any[]): SVGElement;
}
