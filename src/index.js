import { defaults } from 'chart.js'
import { color } from 'chart.js/helpers'

import { applyColors, areaIsValid, createGradient, getPixelStop, isChartV3 } from './helpers'
import { updateLegendItems } from './legend'

const chartStates = new Map()

const getScale = isChartV3
  ? (meta, axis) => meta[`${axis}Scale`]
  : (meta, axis) => meta.controller[`_${axis}Scale`]

function addColors(scale, colors, stopColors) {
  for (const value of Object.keys(colors)) {
    const { pixel, stop } = getPixelStop(scale, value)
    if (Number.isFinite(pixel) && Number.isFinite(stop)) {
      const colorStop = color(colors[value])
      if (colorStop?.valid) {
        stopColors.push({
          color: colorStop,
          stop: Math.max(0, Math.min(1, stop)),
        })
      }
    }
  }
  stopColors.sort((a, b) => a.stop - b.stop)
}

function setValue(meta, dataset, key, value) {
  dataset[key] = value
  if (!meta.dataset) {
    return
  }

  if (meta.dataset.options) {
    meta.dataset.options[key] = value
  } else {
    meta.dataset[key] = value
  }
}

function getStateOptions(state, meta, key, datasetIndex) {
  let stateOptions = state.options.get(key)
  if (!stateOptions) {
    stateOptions = []
    state.options.set(key, stateOptions)
  } else if (!meta.hidden) {
    stateOptions = stateOptions.filter((el) => el.datasetIndex !== datasetIndex)
    state.options.set(key, stateOptions)
  }
  return stateOptions
}

/**
 * The keys to resolve come from the raw configuration objects (dataset,
 * `options.datasets.<type>`, `options.gradient`, and the two default
 * levels), not from `meta.controller.options.gradient`: Chart.js's scriptable
 * option resolver only lists the keys present on the most specific source
 * that defines the object at all, even though reading a key that is missing
 * there still falls through to a less specific level. Iterating the resolved
 * object would silently skip chart-level-only keys.
 */
function gradientKeys(chart, meta, dataset) {
  const type = meta.type
  const sources = [
    dataset.gradient,
    chart.options.datasets?.[type]?.gradient,
    chart.options.gradient,
    defaults.datasets?.[type]?.gradient,
    defaults.gradient,
  ]
  const keys = new Set()
  for (const source of sources) {
    if (source) {
      for (const key of Object.keys(source)) {
        keys.add(key)
      }
    }
  }
  return keys
}

function updateDataset(chart, state, dataset, datasetIndex) {
  const ctx = chart.ctx
  const meta = chart.getDatasetMeta(datasetIndex)
  if (meta.hidden) {
    return
  }
  for (const key of gradientKeys(chart, meta, dataset)) {
    const options = meta.controller.options.gradient?.[key]
    if (!options?.colors) {
      continue
    }
    const { axis, colors } = options
    const scale = getScale(meta, axis)
    if (!scale) {
      console.warn(
        `Scale not found for '${axis}'-axis in datasets[${datasetIndex}] of chart id ${chart.id}, skipping.`
      )
      continue
    }
    const stateOptions = getStateOptions(state, meta, key, datasetIndex)
    const option = {
      axis,
      datasetIndex,
      scale,
      stopColors: [],
    }
    stateOptions.push(option)
    const value = createGradient(ctx, axis, scale)
    addColors(scale, colors, option.stopColors)
    if (option.stopColors.length) {
      applyColors(value, option.stopColors)
      setValue(meta, dataset, key, value)
    }
  }
}

export default {
  afterDestroy(chart) {
    chartStates.delete(chart)
  },

  afterUpdate(chart) {
    const state = chartStates.get(chart)
    if (chart.legend && chart.legend.options.display !== false && isChartV3) {
      updateLegendItems(chart, state)
    }
  },

  beforeDatasetsUpdate(chart) {
    const area = chart.chartArea
    if (!areaIsValid(area)) {
      return
    }
    const state = chartStates.get(chart)
    const datasets = chart.data.datasets
    for (let i = 0; i < datasets.length; i++) {
      updateDataset(chart, state, datasets[i], i)
    }
  },

  beforeInit(chart) {
    const state = {}
    state.options = new Map()
    chartStates.set(chart, state)
  },

  // compatibility Chart.js v3
  destroy(chart) {
    chartStates.delete(chart)
  },
  id: 'gradient',
}
