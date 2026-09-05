module.exports = {
  config: {
    data: {
      datasets: [
        {
          borderWidth: 2,
          data: [65, 29, 80, 91, 55, 5, 40],
          gradient: {
            pointBorderColor: {
              axis: 'y',
              colors: {
                0: 'red',
                50: 'yellow',
                80: 'green',
              },
            },
          },
          pointRadius: 10,
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
        x: {
          display: false,
        },
        y: {
          beginAtZero: true,
          display: false,
        },
      },
    },
    type: 'line',
  },
  options: {
    spriteText: true,
  },
}
