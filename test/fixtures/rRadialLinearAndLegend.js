module.exports = {
  config: {
    data: {
      datasets: [
        {
          data: [0, 29, 80, 91, 55, 5, 40],
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
          ticks: {
            display: false,
          },
        },
      },
    },
    type: 'radar',
  },
  options: {
    spriteText: true,
  },
}
