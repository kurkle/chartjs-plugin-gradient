import {defined} from 'chart.js/helpers';
import {getInterpolatedColorByValue} from './colors';
import {areaIsValid, createGradient, applyColors} from './helpers';

const legendOptions = [
  {key: 'backgroundColor', legendItemKey: 'fillStyle'},
  {key: 'borderColor', legendItemKey: 'strokeStyle'}];

const legendBoxHeight = (chart, options) => options.labels && options.labels.font && defined(options.labels.font.size)
  ? options.labels.font.size
  : chart.options.font.size;

function setLegendItem(state, ctx, keyOption, item, area) {
  if (state.options.has(keyOption.key)) {
    const option = state.options.get(keyOption.key);
    const gradientData = option.filter((el) => el.datasetIndex === item.datasetIndex);
    if (gradientData.length) {
      const data = gradientData[0];
      const value = createGradient(ctx, data.axis, area);
      applyColors(value, data.stopColors);
      item[keyOption.legendItemKey] = value;
    }
  }
}

function buildArea(hitBox, {boxWidth, boxHeight}) {
  return {
    top: hitBox.top,
    left: hitBox.left,
    bottom: hitBox.top + boxHeight,
    right: hitBox.left + boxWidth,
    xCenter: hitBox.left + boxWidth / 2,
    yCenter: hitBox.top + boxHeight / 2,
    drawingArea: Math.max(boxWidth, boxHeight) / 2
  };
}

function applyGradientToLegendByDatasetIndex(chart, state, item, boxSize) {
  const hitBox = chart.legend.legendHitBoxes[item.datasetIndex];
  const area = buildArea(hitBox, boxSize);
  if (areaIsValid(area)) {
    legendOptions.forEach(function(keyOption) {
      setLegendItem(state, chart.ctx, keyOption, item, area);
    });
  }
}

function applyGradientToLegendByDataIndex(chart, state, dataset, datasetIndex) {
  for (let i = 0; i < chart.legend.legendItems.length; i++) {
    const item = chart.legend.legendItems[i];
    legendOptions.forEach(function(keyOption) {
      const value = dataset.data[item.index];
      const c = getInterpolatedColorByValue(state, keyOption, datasetIndex, value);
      if (c && c.valid) {
        item[keyOption.legendItemKey] = c.rgbString();
      }
    });
  }
}

export function updateLegendItems(chart, state) {
  const boxHeight = chart.legend.options.labels.boxHeight
    ? chart.legend.options.labels.boxHeight
    : legendBoxHeight(chart, chart.legend.options);
  const boxWidth = chart.legend.options.labels.boxWidth;
  const datasets = chart.data.datasets;
  for (let i = 0; i < datasets.length; i++) {
    const item = chart.legend.legendItems[i];
    if (item.datasetIndex === i) {
      applyGradientToLegendByDatasetIndex(chart, state, item, {boxWidth, boxHeight});
    } else {
      const dataset = datasets[i];
      applyGradientToLegendByDataIndex(chart, state, dataset, i);
    }
  }
}
