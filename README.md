# chartjs-plugin-gradient

*Easy gradients for [Chart.js](https://www.chartjs.org)*

This plugin requires Chart.js 3.0.0 or later. Could work with v2, but it is not supported.

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
