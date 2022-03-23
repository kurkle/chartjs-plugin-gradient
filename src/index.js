import {Chart} from 'chart.js';
import ColorLib from '@kurkle/color';

function createGradient(ctx, axis, area) {
  return axis === 'y'
    ? ctx.createLinearGradient(0, area.bottom, 0, area.top)
    : axis === 'r'
      ? ctx.createRadialGradient(area.xCenter, area.yCenter, 0, area.xCenter, area.yCenter, area.drawingArea)
      : ctx.createLinearGradient(area.left, 0, area.right, 0);
}

function getPixelStop(scale, value) {
  if (scale.type === 'radialLinear') {
     const pixel = scale.getDistanceFromCenterForValue(value);
     const stop = pixel / scale.drawingArea;
     return {pixel, stop};		
  }
  const reverse = scale.options.reverse;
  const pixel = scale.getPixelForValue(value);
  const stop = scale.getDecimalForPixel(pixel);
  return {pixel, stop: reverse ? 1 - stop : stop};		
}

function addColors(gradient, scale, colors) {
  for (const value of Object.keys(colors)) {
    const {pixel, stop} = getPixelStop(scale, value);
    if (isFinite(pixel) && isFinite(stop)) {
      gradient.addColorStop(
        Math.max(0, Math.min(1, stop)),
        ColorLib(colors[value]).rgbString()
      );
    }
  }
}

function setValue(meta, dataset, key, value) {
  dataset[key] = value;
  if (!meta.dataset) {
    return;
  }

  if (meta.dataset.options) {
    meta.dataset.options[key] = value;
  } else {
    meta.dataset[key] = value;
  }
}

const getScale = Chart.version
  ? (meta, axis) => meta[axis + 'Scale']
  : (meta, axis) => meta.controller['_' + axis + 'Scale'];

const areaIsValid = (area) => area && area.right > area.left && area.bottom > area.top;

export default {
  id: 'gradient',
  beforeDatasetsUpdate(chart) {
    const area = chart.chartArea;
    if (!areaIsValid(area)) {
      return;
    }
    const ctx = chart.ctx;
    const datasets = chart.data.datasets;
    for (let i = 0; i < datasets.length; i++) {
      const dataset = datasets[i];
      const gradient = dataset.gradient;
      if (!gradient) {
        continue;
      }
      const meta = chart.getDatasetMeta(i);

      for (const [key, options] of Object.entries(gradient)) {
        const {axis, colors} = options;
        const scale = getScale(meta, axis);
        if (!scale) {
          console.warn(`Scale not found for '${axis}'-axis in datasets[${i}] of chart id ${chart.id}, skipping.`);
          continue;
        }
        if (scale) {
          const value = createGradient(ctx, axis, scale);
          addColors(value, scale, colors);
          setValue(meta, dataset, key, value);
        }
      }
    }
  }
};
