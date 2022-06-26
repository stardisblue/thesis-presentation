export function mergeFactory(radius: number, padding: number) {
  function Cluster(x: number, y: number, n: number, children?: any) {
    const obj = {
      x,
      y,
      r: Math.sqrt(n) + radius + padding,
      n,
      children,
    };
    return obj;
  }

  function circleMerge(
    a: ReturnType<typeof Cluster>,
    b: ReturnType<typeof Cluster>
  ) {
    const xs = a.x * a.n + b.x * b.n,
      ys = a.y * a.n + b.y * b.n,
      n = a.n + b.n;

    return Cluster(xs / n, ys / n, n, [a, b]);
  }

  return [Cluster, circleMerge] as [typeof Cluster, typeof circleMerge];
}
