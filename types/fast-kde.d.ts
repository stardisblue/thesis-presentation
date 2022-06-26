declare module 'fast-kde' {
  interface Density2d {
    grid(): any;
    points(
      x?: string,
      y?: string,
      z?: string
    ): Iterator<[number, number, number]>;
    bandwidth(): any;
    bandwidth(bandwidth: number): Density2d;
    extent(): number[];
    heatmap(options?: {
      color?: any;
      clamp?: [number, number];
      canvas?: HTMLCanvasElement;
      maxColors?: number;
    }): HTMLCanvasElement;
  }
  function density2d(data: any, options: Record<string, any>): Density2d;
}
