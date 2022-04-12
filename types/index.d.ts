import {ChartType, Plugin} from 'chart.js';
import {Options} from './options';

declare module 'chart.js' {
    interface ChartDatasetProperties<TType extends ChartType, TData> {
        /**
         * Per dataset datalabels plugin options.
         * @since 0.5.0
         */
        gradient?: Options;
    }
}

declare const plugin: Plugin;

export default plugin;
