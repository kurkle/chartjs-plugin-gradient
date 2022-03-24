# chartjs-plugin-gradient

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=kurkle_chartjs-plugin-gradient&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=kurkle_chartjs-plugin-gradient)

*Easy gradients for [Chart.js](https://www.chartjs.org)*

This plugin requires Chart.js 3.0.0 or later. It should also work with v2, but there are no regressing tests to guarantee this.

**NOTE** the plugin does not automatically register.

## Example

![Example chart](https://github.com/kurkle/chartjs-plugin-gradient/raw/master/sample.png "Example chart")

## Installation

NPM:

```bash
npm i --save-dev chartjs-plugin-gradient
```

CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-gradient"></script>
```

## Usage

### loading

ESM

```js
import gradient from 'chartjs-plugin-gradient';
```

CDN

```js
const gradient = window['chartjs-plugin-gradient'];
```

### Registering

All charts

```js
Chart.register(gradient);
```

Signle chart

```js
const chart = new Chart(ctx, {
  // ...
  plugins: {
    gradient
  }
});
```

### Configuration

The gradient colors are configured in the `gradient` key of dataset

```js
const chart = new Chart(ctx, {
  data: {
    datasets: [{
      // data
      gradient: {
        backgroundColor: {
          axis: 'y',
          colors: {
            0: 'red',
            50: 'yellow',
            100: 'green'
          }
        },
        borderColor: {
          axis: 'x',
          colors: {
            0: 'black',
            1: 'white',
            2: 'black',
            3: 'white'
          }
        }
      }
    }]
  }
});
```

## License

`chartjs-plugin-gradient.js` is available under the [MIT license](https://github.com/kurkle/chartjs-plugin-gradient/blob/master/LICENSE).
