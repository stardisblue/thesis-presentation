declare module '@observablehq/inputs' {
  function range(
    range: [number, number],
    options: {
      label?: string;
      step?: number;
      value?: number;
      disabled?: boolean;
    }
  ): HTMLFormElement;
}
