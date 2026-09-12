export default {
  config: {
    data: {
      datasets: [
        {
          data: [10, 50, 90],
          gradient: {
            borderColor: {
              axis: 'y',
              colors: {
                0: 'red',
                50: 'yellow',
                100: 'green',
              },
            },
            hoverBackgroundColor: {
              axis: 'y',
              colors: {
                0: 'red',
                50: 'yellow',
                100: 'green',
              },
            },
          },
          pointHoverRadius: 20,
          pointRadius: 20,
        },
      ],
      labels: ['Jan', 'Feb', 'Mar'],
    },
    options: {
      plugins: {
        legend: false,
        tooltip: false,
      },
      scales: {
        x: {
          display: false,
        },
        y: {
          beginAtZero: true,
          display: false,
          max: 100,
        },
      },
    },
    type: 'line',
  },
  options: {
    async run(chart) {
      const meta = chart.getDatasetMeta(0)
      const el = meta.data[1]
      await window.triggerMouseEvent(chart, 'mousemove', el.getCenterPoint())
    },
    spriteText: true,
  },
}
