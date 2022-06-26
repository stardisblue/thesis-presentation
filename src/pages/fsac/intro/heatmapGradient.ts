export function context2d(width: number, height: number, dpi?: number) {
  if (dpi == null) dpi = devicePixelRatio;
  var canvas = document.createElement('canvas');
  canvas.width = width * dpi;
  canvas.height = height * dpi;
  canvas.style.width = width + 'px';
  var context = canvas.getContext('2d')!;
  context.scale(dpi, dpi);
  return context;
}

export const heatmapGradient = (function () {
  const grad: Record<string, string> = {
    0.4: 'blue',
    0.6: 'cyan',
    0.7: 'lime',
    0.8: 'yellow',
    1.0: 'red',
  };
  // create a 256x1 gradient that we'll use to turn a grayscale heatmap into a colored one
  const ctx = context2d(1, 256),
    gradient = ctx.createLinearGradient(0, 0, 0, 256);

  for (var i in grad) {
    gradient.addColorStop(+i, grad[i]);
  }

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1, 256);

  const gr = ctx.getImageData(0, 0, 1, 256).data;

  return function (t: number) {
    t = Math.sqrt(t);
    const pixel = Math.floor(Math.max(0, Math.min(255, t * 256))) * 4;
    return {
      r: gr[pixel],
      g: gr[pixel + 1],
      b: gr[pixel + 2],
      opacity: t,
    };
  };
})();
