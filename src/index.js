import {Chart} from 'chart.js';
import {isNumber} from 'chart.js/helpers';
import ColorLib from '@kurkle/color';

function createGradient(ctx, axis, scale) {
  if (axis === 'r') {
    return ctx.createRadialGradient(scale.xCenter, scale.yCenter, 0, scale.xCenter, scale.yCenter, scale.drawingArea);
  }
  if (axis === 'y') {
    return ctx.createLinearGradient(0, scale.bottom, 0, scale.top);
  }
  return ctx.createLinearGradient(scale.left, 0, scale.right, 0);
}

function scaleValue(scale, value) {
  const normValue = isNumber(value) ? parseFloat(value) : Chart.version ? scale.parse(value) : value;
  return scale.getPixelForValue(normValue);
}

function getPixelStop(scale, value) {
  if (scale.type === 'radialLinear') {
    const distance = scale.getDistanceFromCenterForValue(value);
    return {pixel: distance, stop: distance / scale.drawingArea};
  }
  const reverse = scale.options.reverse;
  const pixel = scaleValue(scale, value);
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
