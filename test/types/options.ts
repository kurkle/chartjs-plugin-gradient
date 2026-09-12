import { Chart } from 'chart.js'
import gradient from 'chartjs-plugin-gradient'

Chart.register(gradient)

// Chart.defaults.gradient (root default level).
Chart.defaults.gradient = {
  backgroundColor: {
    axis: 'y',
    colors: { 0: 'red', 100: 'green' },
  },
}

// Chart.defaults.datasets.<type>.gradient (per-type default level).
Chart.defaults.datasets.line.gradient = {
  borderColor: {
    axis: 'y',
    colors: { 0: 'red', 100: 'green' },
  },
}

new Chart('test', {
  data: {
    datasets: [
      {
        // dataset level, including the `false` opt-out for a key.
        backgroundColor: 'blue',
        data: [1, 2, 3],
        gradient: {
          backgroundColor: false,
          borderColor: {
            axis: 'y',
            colors: { 0: 'red', 50: 'yellow', 100: 'green' },
          },
        },
        label: 'gradient options',
      },
    ],
  },
  options: {
    // `options.datasets.<type>.gradient` level.
    datasets: {
      line: {
        gradient: {
          pointBackgroundColor: {
            axis: 'y',
            colors: { 0: 'red', 100: 'green' },
          },
        },
      },
    },
    // root `options.gradient` level.
    gradient: {
      backgroundColor: {
        axis: 'y',
        colors: { 0: 'red', 100: 'green' },
      },
    },
  },
  type: 'line',
})
