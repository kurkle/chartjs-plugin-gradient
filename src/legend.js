import { defined } from 'chart.js/helpers'

import { getInterpolatedColorByValue } from './colors'
import { applyColors, areaIsValid, createGradient, getGradientData } from './helpers'

const legendOptions = [
  { key: 'backgroundColor', legendItemKey: 'fillStyle' },
  { key: 'borderColor', legendItemKey: 'strokeStyle' },
]

const legendBoxHeight = (chart, options) =>
  options.labels?.font && defined(options.labels.font.size)
    ? options.labels.font.size
    : chart.options.font.size

function setLegendItem(state, ctx, keyOption, item, area) {
  const data = getGradientData(state, keyOption, item.datasetIndex)
  if (!data?.stopColors.length) {
    return
  }
  const value = createGradient(ctx, data.axis, area)
  applyColors(value, data.stopColors)
  item[keyOption.legendItemKey] = value
}

function buildArea(hitBox, { boxWidth, boxHeight }) {
  return {
    bottom: hitBox.top + boxHeight,
    drawingArea: Math.max(boxWidth, boxHeight) / 2,
    left: hitBox.left,
    right: hitBox.left + boxWidth,
    top: hitBox.top,
    xCenter: hitBox.left + boxWidth / 2,
    yCenter: hitBox.top + boxHeight / 2,
  }
}

function applyGradientToLegendByDatasetIndex(chart, state, item, boxSize) {
  const hitBox = chart.legend.legendHitBoxes[item.datasetIndex]
  const area = buildArea(hitBox, boxSize)
  if (areaIsValid(area)) {
    legendOptions.forEach((keyOption) => {
      setLegendItem(state, chart.ctx, keyOption, item, area)
    })
  }
}

function applyGradientToLegendByDataIndex(chart, state, dataset, datasetIndex) {
  for (const item of chart.legend.legendItems) {
    legendOptions.forEach((keyOption) => {
      const value = dataset.data[item.index]
      const c = getInterpolatedColorByValue(state, keyOption, datasetIndex, value)
      if (c?.valid) {
        item[keyOption.legendItemKey] = c.rgbString()
      }
    })
  }
}

/**
 * @typedef { import("chart.js").Chart } Chart
 */

/**
 * Udpate the legend items, applying the gradients
 * @param {Chart} chart - chart instance
 * @param {Object} state - state of the plugin
 */
export function updateLegendItems(chart, state) {
  const legend = chart.legend
  const options = legend.options
  const boxHeight = options.labels.boxHeight
    ? options.labels.boxHeight
    : legendBoxHeight(chart, options)
  const boxWidth = options.labels.boxWidth
  const datasets = chart.data.datasets
  for (let i = 0; i < datasets.length; i++) {
    const item = legend.legendItems[i]
    if (item.datasetIndex === i) {
      applyGradientToLegendByDatasetIndex(chart, state, item, { boxHeight, boxWidth })
    } else {
      applyGradientToLegendByDataIndex(chart, state, datasets[i], i)
    }
  }
}
