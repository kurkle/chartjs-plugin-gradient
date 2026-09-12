import { ChartType, Plugin } from 'chart.js'

import { Options } from './options.js'

declare module 'chart.js' {
  interface ChartDatasetProperties<TType extends ChartType, TData> {
    /**
     * Per dataset gradient options.
     * @since 0.5.0
     */
    gradient?: Options
  }

  interface CoreChartOptions<TType extends ChartType> {
    /**
     * Chart-level gradient defaults, merged per key with a dataset's own
     * `gradient` (which wins) and with `options.datasets.<type>.gradient`.
     * @since 0.8.0
     */
    gradient?: Options
  }

  interface BarControllerDatasetOptions {
    /**
     * Gradient defaults for every `bar` dataset, via `options.datasets.bar.gradient`.
     * @since 0.8.0
     */
    gradient?: Options
  }

  interface LineControllerDatasetOptions {
    /**
     * Gradient defaults for every `line` (and `scatter`) dataset, via
     * `options.datasets.line.gradient`.
     * @since 0.8.0
     */
    gradient?: Options
  }

  interface BubbleControllerDatasetOptions {
    /**
     * Gradient defaults for every `bubble` dataset, via `options.datasets.bubble.gradient`.
     * @since 0.8.0
     */
    gradient?: Options
  }

  interface DoughnutControllerDatasetOptions {
    /**
     * Gradient defaults for every `doughnut` (and `pie`) dataset, via
     * `options.datasets.doughnut.gradient`.
     * @since 0.8.0
     */
    gradient?: Options
  }

  interface PolarAreaControllerDatasetOptions {
    /**
     * Gradient defaults for every `polarArea` dataset, via
     * `options.datasets.polarArea.gradient`.
     * @since 0.8.0
     */
    gradient?: Options
  }

  interface RadarControllerDatasetOptions {
    /**
     * Gradient defaults for every `radar` dataset, via `options.datasets.radar.gradient`.
     * @since 0.8.0
     */
    gradient?: Options
  }
}

declare const plugin: Plugin

export default plugin
