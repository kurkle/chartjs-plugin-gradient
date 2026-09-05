const istanbul = require('rollup-plugin-istanbul')
const json = require('@rollup/plugin-json')
const resolve = require('@rollup/plugin-node-resolve').default
const env = process.env.NODE_ENV

module.exports = async (karma) => {
  const builds = (await import('./rollup.config.js')).default

  // Use the same rollup config as our dist files: when debugging (npm run dev),
  // we will prefer the unminified build which is easier to browse and works
  // better with source mapping. In other cases, pick the minified build to
  // make sure that the minification process (terser) doesn't break anything.
  const regex = karma.autoWatch
    ? /chartjs-plugin-gradient\.js$/
    : /chartjs-plugin-gradient\.min\.js$/
  const build = builds.filter((v) => v.output.file?.match(regex))[0]

  if (env === 'test') {
    build.plugins = [
      json(),
      resolve(),
      istanbul({ exclude: ['node_modules/**/*.js', 'package.json'] }),
    ]
  }

  karma.set({
    browserDisconnectTimeout: 120000,
    browserDisconnectTolerance: 3,
    browserNoActivityTimeout: 120000,
    browsers: ['chrome', 'firefox'],

    // These settings deal with browser disconnects. We had seen test flakiness from Firefox
    // [Firefox 56.0.0 (Linux 0.0.0)]: Disconnected (1 times), because no message in 10000 ms.
    // https://github.com/jasmine/jasmine/issues/1327#issuecomment-332939551
    captureTimeout: 120000,

    client: {
      jasmine: {
        stopOnSpecFailure: !!karma.autoWatch,
      },
    },

    customLaunchers: {
      chrome: {
        base: 'Chrome',
        flags: [
          '--disable-background-timer-throttling',
          '--disable-backgrounding-occluded-windows',
          '--disable-renderer-backgrounding',
        ],
      },
      firefox: {
        base: 'Firefox',
        prefs: {
          'layers.acceleration.disabled': true,
        },
      },
    },

    customPreprocessors: {
      sources: {
        base: 'rollup',
        options: build,
      },
    },

    files: [
      { included: false, pattern: 'test/fixtures/*.js' },
      { included: false, pattern: 'test/fixtures/*.png' },
      { pattern: 'node_modules/chart.js/dist/chart.umd.js' },
      { pattern: 'node_modules/luxon/build/global/luxon.js' },
      { pattern: 'node_modules/chartjs-adapter-luxon/dist/chartjs-adapter-luxon.umd.js' },
      { pattern: 'src/index.js', watched: false },
      { pattern: 'test/index.js' },
      { pattern: 'test/specs/**.js' },
    ],
    frameworks: ['jasmine'],
    logLevel: karma.LOG_INFO,
    plugins: ['karma-*'],

    preprocessors: {
      'src/index.js': ['sources'],
      'test/index.js': ['rollup'],
    },
    reporters: ['progress', 'kjhtml'],

    rollupPreprocessor: {
      output: {
        format: 'umd',
        name: 'test',
        sourcemap: karma.autoWatch ? 'inline' : false,
      },
      plugins: [resolve()],
    },
  })

  if (env === 'test') {
    karma.reporters.push('coverage')
    karma.coverageReporter = {
      dir: 'coverage/',
      reporters: [
        { subdir: 'html', type: 'html' },
        { subdir: (browser) => browser.toLowerCase().split(/[ /-]/)[0], type: 'lcovonly' },
      ],
    }
  }
}
