import Chart from 'chart.js/auto'

import gradient from '../dist/chartjs-plugin-gradient.esm.js'
import * as helpers from './scripts/helpers.js'
import * as Utils from './scripts/utils.js'
import { docsVersion } from './src/generated/version.js'

Chart.register(gradient)
Chart.register({
  afterDraw(chart) {
    const ctx = chart.ctx
    const versionLabel = docsVersion
      ? `Chart.js v${Chart.version} + chartjs-plugin-gradient v${docsVersion}`
      : `Chart.js v${Chart.version}`
    ctx.save()
    ctx.font = '9px monospace'
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
    ctx.textAlign = 'right'
    ctx.textBaseline = 'top'
    ctx.fillText(versionLabel, chart.chartArea.right - 8, 2)
    ctx.restore()
  },
  id: 'version',
})

export const globals = { Chart, helpers, Utils }

export function createChart(canvas, config) {
  return new Chart(canvas, config)
}
