/**
 * Guards the one artifact the fixture suite never touches: the minified,
 * terser-processed bundle that `exports.script`, jsdelivr and unpkg actually
 * ship. `karma.conf.cjs` picked this same file for a single-run, but
 * `NODE_ENV=test` (which `npm test` set, and the shared CI ran under)
 * replaced the build's rollup plugins with `[json, resolve, istanbul]` and
 * dropped terser entirely -- so this bundle was never exercised by CI. This
 * suite is the first time it is.
 *
 * The bundle is loaded exactly the way a consumer would load it: as a
 * `<script>` tag resolved through `?url`, not an import. `chart.js/dist/
 * chart.umd.js?url` does not resolve -- chart.js's `exports` field does not
 * expose that path under this project's conditions -- so the UMD globals the
 * bundle expects (`Chart` and `Chart.helpers`) are assembled from the ESM
 * namespaces instead. That is exactly the shape rollup's `globals` map
 * promises: `chart.js` -> `Chart`, `chart.js/helpers` -> `Chart.helpers`.
 *
 * Because the UMD script needs `globalThis.Chart` to be that assembled shim
 * (an object carrying a nested `.Chart` class and `.helpers`), not the class
 * itself, chart construction below goes through the real class captured from
 * the `chart.js` import (`ChartJS`) rather than the bare global `Chart`.
 */
import * as chartjs from 'chart.js'
import * as helpers from 'chart.js/helpers'
// Registers the time-scale adapter as a Chart.js side effect, as test/setup.js
// does for the fixture suite. This suite runs without that setup file, so it
// is imported directly.
import 'chartjs-adapter-luxon'

import minUrl from '../../../dist/chartjs-plugin-gradient.min.js?url'
import rRadialLinearAndLegendDataIndexConfig from '../../fixtures/rRadialLinearAndLegendDataIndex.js'
import rRadialLinearAndLegendDataIndexPng from '../../fixtures/rRadialLinearAndLegendDataIndex.png?url'
import xCartesianTimeConfig from '../../fixtures/xCartesianTime.js'
import xCartesianTimePng from '../../fixtures/xCartesianTime.png?url'
import yCartesianLinearAndLegendConfig from '../../fixtures/yCartesianLinearAndLegend.js'
import yCartesianLinearAndLegendPng from '../../fixtures/yCartesianLinearAndLegend.png?url'
import { readImageData } from '../../utils/canvas.js'
import { imageMatchers } from '../../utils/matchers.js'
import { spritingOff, spritingOn } from '../../utils/sprite.js'

const ChartJS = chartjs.Chart

expect.extend(imageMatchers)

function loadScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = url
    script.onload = () => resolve()
    script.onerror = () => reject(new Error(`Failed to load script ${url}`))
    document.head.appendChild(script)
  })
}

/** A trimmed-down acquireChart: builds against `ChartJS`, not the (repurposed) global `Chart`. */
function buildChart(config, options = {}) {
  const wrapper = document.createElement('div')
  const canvas = document.createElement('canvas')
  canvas.height = 512
  canvas.width = 512
  wrapper.appendChild(canvas)
  document.body.appendChild(wrapper)

  config.options = config.options || {}
  config.options.animation = false
  config.options.responsive = false
  config.options.locale = 'en-US'

  const ctx = canvas.getContext('2d')
  if (options.spriteText) {
    spritingOn(ctx)
  }

  let chart
  try {
    chart = new ChartJS(ctx, config)
  } catch (e) {
    document.body.removeChild(wrapper)
    throw e
  }
  chart.$wrapper = wrapper
  return chart
}

function releaseChart(chart) {
  spritingOff(chart.ctx)
  chart.destroy()
  chart.$wrapper?.parentNode?.removeChild(chart.$wrapper)
}

beforeAll(async () => {
  // The UMD wrapper resolves `chart.js` to the global `Chart` and
  // `chart.js/helpers` to `Chart.helpers`. Build exactly that shape.
  globalThis.Chart = Object.assign(Object.create(null), chartjs, { helpers })
  ChartJS.register(...chartjs.registerables)
  await loadScript(minUrl)
  ChartJS.register(globalThis['chartjs-plugin-gradient'])

  // Same normalisation test/setup.js applies for the fixture suite, so the
  // reference PNGs stay comparable to what this bundle renders.
  ChartJS.defaults.devicePixelRatio = 1
  ChartJS.defaults.plugins.colors.enabled = false
})

describe('min-bundle', () => {
  it('is served unchanged, with its license banner intact', async () => {
    const response = await fetch(minUrl)
    const text = await response.text()

    expect(text.startsWith('/*!')).toBe(true)
  })

  it('registers itself as the gradient plugin', () => {
    const plugin = globalThis['chartjs-plugin-gradient']

    expect(plugin).toBeDefined()
    expect(plugin.id).toBe('gradient')
  })

  it.each([
    // Three distinct code paths, verified by tampering with each source file
    // in turn and watching the matching case fail:
    //  - colors.js: getInterpolatedColorByValue, the gamma-correct
    //    interpolation used for a per-data-point ("DataIndex") legend. Note
    //    this is *not* rRadialLinearAndLegend -- that fixture's legend maps
    //    one item per dataset and never reaches colors.js at all.
    //  - legend.js: applyGradientToLegendByDatasetIndex / setLegendItem, the
    //    per-dataset legend gradient path.
    //  - helpers.js: getPixelStop's time-scale branch and createGradient's
    //    linear-x branch, reached through the plain background gradient with
    //    no legend at all.
    [
      'rRadialLinearAndLegendDataIndex',
      rRadialLinearAndLegendDataIndexConfig,
      rRadialLinearAndLegendDataIndexPng,
    ],
    ['xCartesianTime', xCartesianTimeConfig, xCartesianTimePng],
    ['yCartesianLinearAndLegend', yCartesianLinearAndLegendConfig, yCartesianLinearAndLegendPng],
  ])('renders %s identically to the reference image', async (name, fixture, png) => {
    const json = fixture
    const config = json.config
    config.options = config.options || {}
    // Same normalisation test/utils/fixtures.js applies: none of these
    // fixture names contain 'plugin', so instance plugin options are
    // disabled by default.
    if (!name.includes('plugin') && config.plugins === undefined) {
      config.options.plugins = config.options.plugins || false
    }

    const chart = buildChart(config, json.options)
    try {
      const expected = await readImageData(png)
      expect(chart).toEqualImageData(expected, json)
    } finally {
      releaseChart(chart)
    }
  })
})
