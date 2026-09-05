module.exports = {
  config: {
    data: {
      datasets: [
        {
          data: [15, 59, 75, 29, 50, 72, 40],
          gradient: {
            hoverBorderColor: {
              axis: 'r',
              colors: {
                0: 'red',
                50: 'yellow',
                80: 'green',
              },
            },
          },
          label: 'legend',
        },
      ],
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    },
    options: {
      plugins: {
        legend: {
          labels: {
            font: {
              size: 24,
            },
          },
        },
        tooltip: false,
      },
      scales: {
        r: {
          beginAtZero: true,
          display: true,
          pointLabels: {
            display: false,
          },
          ticks: {
            display: false,
          },
        },
      },
    },
    type: 'polarArea',
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
