import {defined} from 'chart.js/helpers';
import {getInterpolatedColorByValue} from './colors';
import {areaIsValid, createGradient, applyColors, getGradientData} from './helpers';

const legendOptions = [
  {key: 'backgroundColor', legendItemKey: 'fillStyle'},
  {key: 'borderColor', legendItemKey: 'strokeStyle'}];

const legendBoxHeight = (chart, options) => options.labels && options.labels.font && defined(options.labels.font.size)
  ? options.labels.font.size
  : chart.options.font.size;

function setLegendItem(state, ctx, keyOption, item, area) {
  const data = getGradientData(state, keyOption, item.datasetIndex);
  if (!data) {
    return;
  }
  const value = createGradient(ctx, data.axis, area);
  applyColors(value, data.stopColors);
  item[keyOption.legendItemKey] = value;
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
  for (const item of chart.legend.legendItems) {
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
  const legend = chart.legend;
  const options = legend.options;
  const boxHeight = options.labels.boxHeight
    ? options.labels.boxHeight
    : legendBoxHeight(chart, options);
  const boxWidth = options.labels.boxWidth;
  const datasets = chart.data.datasets;
  for (let i = 0; i < datasets.length; i++) {
    const item = legend.legendItems[i];
    if (item.datasetIndex === i) {
      applyGradientToLegendByDatasetIndex(chart, state, item, {boxWidth, boxHeight});
    } else {
      applyGradientToLegendByDataIndex(chart, state, datasets[i], i);
    }
  }
}
