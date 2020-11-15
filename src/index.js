import ColorLib from '@kurkle/color';

function createGradient(ctx, axis, area) {
  return axis === 'y'
    ? ctx.createLinearGradient(0, area.bottom, 0, area.top)
    : ctx.createLinearGradient(area.left, 0, area.right, 0);
}

function addColors(gradient, scale, colors) {
  Object.keys(colors).forEach(value => {
    const pixel = scale.getPixelForValue(value);
    const stop = scale.getDecimalForPixel(pixel);
    gradient.addColorStop(Math.max(0, Math.min(1, stop)), ColorLib(colors[value]).rgbString());
  });
}

export default {
  id: 'gradient',
  beforeDatasetsUpdate(chart) {
    const area = chart.chartArea;
    const ctx = chart.ctx;
    chart.data.datasets.forEach((dataset, i) => {
      const gradient = dataset.gradient;
      if (gradient && area) {
        Object.keys(gradient).forEach(prop => {
          const {axis, colors} = gradient[prop];
          const meta = chart.getDatasetMeta(i);
          const scale = meta[axis + 'Scale'];
          const value = createGradient(ctx, axis, area);
          addColors(value, scale, colors);
          dataset[prop] = meta.dataset.options[prop] = value;
        });
      }
    });
  }
};
