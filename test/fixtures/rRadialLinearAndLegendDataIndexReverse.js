module.exports = {
  config: {
    data: {
      datasets: [
        {
          data: [15, 59, 75, 29, 50, 72, 40],
          gradient: {
            backgroundColor: {
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
      },
      scales: {
        r: {
          beginAtZero: true,
          display: true,
          pointLabels: {
            display: false,
          },
          reverse: true,
          ticks: {
            display: false,
          },
        },
      },
    },
    type: 'polarArea',
  },
  options: {
    spriteText: true,
  },
}
