import { Chart, registerables } from 'chart.js'

// Registers the time-scale adapter as a Chart.js side effect. Karma loaded
// luxon and this adapter as globals; the ESM build pulls both in directly.
import 'chartjs-adapter-luxon'

import gradient from '../src/index.js'
import { acquireChart, afterEvent, imageMatchers, releaseCharts, triggerMouseEvent } from './utils'

// Karma loaded the UMD bundle, which registers every Chart.js component.
Chart.register(...registerables)
Chart.register(gradient)

// The fixture configs and specs were written against Karma's global scope.
globalThis.Chart = Chart
globalThis.acquireChart = acquireChart
globalThis.afterEvent = afterEvent
globalThis.triggerMouseEvent = triggerMouseEvent

// Pin the backing store to CSS pixels so the reference PNGs stay comparable
// whatever the host display reports.
Chart.defaults.devicePixelRatio = 1
// Disable colors plugin for tests.
Chart.defaults.plugins.colors.enabled = false

expect.extend(imageMatchers)

afterEach(() => {
  releaseCharts()
})
