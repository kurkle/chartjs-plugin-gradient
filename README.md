# chartjs-plugin-gradient

[![npm](https://img.shields.io/npm/v/chartjs-plugin-gradient.svg)](https://www.npmjs.com/package/chartjs-plugin-gradient)
[![release](https://img.shields.io/github/release/kurkle/chartjs-plugin-gradient.svg?style=flat-square)](https://github.com/kurkle/chartjs-plugin-gradient/releases/latest)
![npm bundle size](https://img.shields.io/bundlephobia/min/chartjs-plugin-gradient.svg)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=kurkle_chartjs-plugin-gradient&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=kurkle_chartjs-plugin-gradient)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=kurkle_chartjs-plugin-gradient&metric=coverage)](https://sonarcloud.io/summary/new_code?id=kurkle_chartjs-plugin-gradient)
[![documentation](https://img.shields.io/static/v1?message=Documentation&color=informational)](https://chartjs-plugin-gradient.pages.dev)
![GitHub](https://img.shields.io/github/license/kurkle/chartjs-plugin-gradient.svg)

[Chart.js](https://www.chartjs.org/) **v3+, v4+** plugin that renders a dataset's background and/or border color as a gradient following any axis (`x`, `y`, or `r`), instead of a single flat color — for anyone already charting with Chart.js who wants a value-driven color transition instead of a solid fill or stroke. It should also work with Chart.js v2, but there are no regression tests to guarantee this.

## Example

![Example chart](https://github.com/kurkle/chartjs-plugin-gradient/raw/main/sample.png "Example chart")

## Installation

```bash
npm install chart.js chartjs-plugin-gradient
```

Or via CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-gradient"></script>
```

## Quickstart

```js
import { Chart, registerables } from 'chart.js';
import gradient from 'chartjs-plugin-gradient';

Chart.register(...registerables, gradient);

new Chart(document.getElementById('chart'), {
  type: 'line',
  data: {
    labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    datasets: [
      {
        label: 'Gradient background',
        data: [10, 20, 15, 40, 30, 25, 60, 45, 70, 50],
        fill: true,
        gradient: {
          backgroundColor: {
            axis: 'y',
            colors: {
              0: 'green',
              50: 'blue',
              100: 'red',
            },
          },
        },
      },
    ],
  },
});
```

`Chart.register(gradient)` enables the plugin for every chart. To register it for a single chart instead, pass it in `plugins`:

```js
new Chart(ctx, {
  // ...
  plugins: [gradient],
});
```

See more integration options (script tag, other module loaders) in the [documentation](https://chartjs-plugin-gradient.pages.dev/integration/).

## Documentation

You can find documentation for chartjs-plugin-gradient at [https://chartjs-plugin-gradient.pages.dev/](https://chartjs-plugin-gradient.pages.dev/). The full configuration reference lives there, not in this README — this file stays a quickstart.

## Development

You first need to install node dependencies (requires [Node.js](https://nodejs.org/)):

```bash
> npm install
```

The following commands will then be available from the repository root:

```bash
> npm run build        // build dist files
> npm test              // run all tests
> npm run lint          // perform code linting
```

## License

chartjs-plugin-gradient is available under the [MIT license](https://opensource.org/licenses/MIT).
