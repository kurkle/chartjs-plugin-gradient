module.exports = {
  config: {
    data: {
      datasets: [
        {
          data: [80000, 100, 8000, 20, 700000, 10000, 1000000],
          fill: true,
          gradient: {
            backgroundColor: {
              axis: 'y',
              colors: {
                0: 'red',
                100: 'blue',
                1000: 'yellow',
                10000: 'green',
              },
            },
          },
        },
      ],
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          display: false,
        },
        y: {
          display: true,
          type: 'logarithmic',
        },
      },
    },
    type: 'line',
  },
  options: {
    spriteText: true,
  },
}
