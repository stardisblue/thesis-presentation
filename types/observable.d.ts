declare module '@observablehq/runtime' {
  export class Runtime {
    constructor(...args: any[]);
    module(...args: any[]): any;
  }
  export class Inspector {
    constructor(...args: any[]);
  }
}

declare module 'b24f23c58f6e07b8' {
  function module(...args: any[]): any;

  export default module;
}
