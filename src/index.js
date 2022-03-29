import {color} from 'chart.js/helpers';
import {updateLegendItems} from './legend';
import {areaIsValid, createGradient, applyColors, getPixelStop, isChartV3} from './helpers';

const chartStates = new Map();

const getScale = isChartV3
  ? (meta, axis) => meta[axis + 'Scale']
  : (meta, axis) => meta.controller['_' + axis + 'Scale'];

function addColors(scale, colors, stopColors) {
  for (const value of Object.keys(colors)) {
    const {pixel, stop} = getPixelStop(scale, value);
    if (isFinite(pixel) && isFinite(stop)) {
      const colorStop = color(colors[value]);
      if (colorStop && colorStop.valid) {
        stopColors.push({
          stop: Math.max(0, Math.min(1, stop)),
          color: colorStop
        });
      }
    }
  }
  stopColors.sort((a, b) => a.stop - b.stop);
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

export default {
  id: 'gradient',

  beforeInit(chart) {
    const state = {};
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
            scale,
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
    const state = chartStates.get(chart);
    if (chart.legend && isChartV3) {
      updateLegendItems(chart, state);
    }
  },

  destroy(chart) {
    chartStates.delete(chart);
  }
};
