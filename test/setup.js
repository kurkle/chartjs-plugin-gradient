import { Chart, registerables } from 'chart.js'
import { acquireChart, afterEvent, setup, triggerMouseEvent } from 'chartjs-test-utils'

// Registers the time-scale adapter as a Chart.js side effect. Karma loaded
// luxon and this adapter as globals; the ESM build pulls both in directly.
import 'chartjs-adapter-luxon'

import gradient from '../src/index.js'

// Karma loaded the UMD bundle, which registers every Chart.js component.
Chart.register(...registerables)
Chart.register(gradient)

// Registers the image matchers, releases the charts after every spec and pins
// the backing store to CSS pixels so the reference PNGs stay comparable
// whatever the host display reports.
setup({ Chart })

// The fixture configs and specs were written against Karma's global scope.
globalThis.Chart = Chart
globalThis.acquireChart = acquireChart
globalThis.afterEvent = afterEvent
globalThis.triggerMouseEvent = triggerMouseEvent

// Disable colors plugin for tests.
Chart.defaults.plugins.colors.enabled = false
