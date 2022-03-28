import {Chart} from 'chart.js';
import {isNumber, color, defined, valueOrDefault} from 'chart.js/helpers';

const chartStates = new Map();
const legendOptions = [
  {key: 'backgroundColor', legendItemKey: 'fillStyle'},
  {key: 'borderColor', legendItemKey: 'strokeStyle'}];

function createGradient(ctx, axis, scale) {
  if (axis === 'r') {
    return ctx.createRadialGradient(scale.xCenter, scale.yCenter, 0, scale.xCenter, scale.yCenter, scale.drawingArea);
  }
  if (axis === 'y') {
    return ctx.createLinearGradient(0, scale.bottom, 0, scale.top);
  }
  return ctx.createLinearGradient(scale.left, 0, scale.right, 0);
}

const parse = Chart.version
  ? (scale, value) => scale.parse(value)
  : (scale, value) => value;

function scaleValue(scale, value) {
  const normValue = isNumber(value) ? parseFloat(value) : parse(scale, value);
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

function applyColors(gradient, colors) {
  colors.forEach(function(item) {
    gradient.addColorStop(
      item.stop, item.colorRgbString
    );
  });
}

function addColors(scale, colors, stopColors) {
  for (const value of Object.keys(colors)) {
    const {pixel, stop} = getPixelStop(scale, value);
    if (isFinite(pixel) && isFinite(stop)) {
      const colorStop = color(colors[value]);
      if (colorStop && colorStop.valid) {
        stopColors.push({
          stop: Math.max(0, Math.min(1, stop)),
          colorRgbString: colorStop.rgbString()
        });
      }
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

function setLegendItem(chart, keyOption, item, area) {
  const state = chartStates.get(chart);
  const ctx = chart.ctx;
  if (state.options.has(keyOption.key)) {
    const option = state.options.get(keyOption.key);
    const gradientData = option.filter((el) => el.datasetIndex === item.datasetIndex);
    if (gradientData.length === 1) {
      const data = gradientData[0];
      const value = createGradient(ctx, data.axis, area);
      applyColors(value, data.stopColors);
      item[keyOption.legendItemKey] = value;
    }
  }
}

function getStateOptions(state, meta, key, datasetIndex) {
  let stateOptions = state.options.get(key);
  if (!stateOptions) {
    stateOptions = [];
    state.options.set(key, stateOptions);
  } else if (!meta.hidden) {
    stateOptions = stateOptions.filter((el) => el.datasetIndex !== datasetIndex);
    state.options.set(key, stateOptions);
  }
  return stateOptions;
}

const getScale = Chart.version
  ? (meta, axis) => meta[axis + 'Scale']
  : (meta, axis) => meta.controller['_' + axis + 'Scale'];

const areaIsValid = (area) => area && area.right > area.left && area.bottom > area.top;

const legendFontSize = (options) => options.plugins.legend.labels.font && defined(options.plugins.legend.labels.font.size)
  ? options.plugins.legend.labels.font.size
  : options.font.size;

const legendBoxHeight = Chart.version
  ? (options) => legendFontSize(options)
  : (options) => valueOrDefault(options.legend.labels.fontSize, options.defaultFontSize);

export default {
  id: 'gradient',

  beforeInit(chart) {
    const state = new Object();
    state.options = new Map();
    chartStates.set(chart, state);
  },

  beforeDatasetsUpdate(chart) {
    const area = chart.chartArea;
    if (!areaIsValid(area)) {
      return;
    }
    const state = chartStates.get(chart);
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
        const stateOptions = getStateOptions(state, meta, key, i);
        if (colors && !meta.hidden) {
          const option = {
            datasetIndex: i,
            axis,
            stopColors: []
          };
          stateOptions.push(option);
          const value = createGradient(ctx, axis, scale);
          addColors(scale, colors, option.stopColors);
          applyColors(value, option.stopColors);
          setValue(meta, dataset, key, value);
        }
      }
    }
  },

  afterUpdate(chart) {
    if (chart.legend) {
      const boxHeight = chart.legend.options.labels.boxHeight
        ? chart.legend.options.labels.boxHeight
        : legendBoxHeight(chart.options);
      const boxWidth = chart.legend.options.labels.boxWidth;
      const datasets = chart.data.datasets;
      for (let i = 0; i < datasets.length; i++) {
        const item = chart.legend.legendItems[i];
        const hitBox = chart.legend.legendHitBoxes[i];
        const area = {
          top: hitBox.top,
          left: hitBox.left,
          bottom: hitBox.top + boxHeight,
          right: hitBox.left + boxWidth,
          xCenter: hitBox.left + boxWidth / 2,
          yCenter: hitBox.top + boxHeight / 2,
          drawingArea: Math.max(boxWidth, boxHeight) / 2
        };
        if (areaIsValid(area)) {
          legendOptions.forEach(function(keyOption) {
            setLegendItem(chart, keyOption, item, area);
          });
        }
      }
    }
  }

};
