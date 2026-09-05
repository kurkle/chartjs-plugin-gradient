module.exports = {
  config: {
    data: {
      datasets: [
        {
          data: [65, 29, 80, 91, 55, 5, 40],
          gradient: {
            backgroundColor: {
              axis: 'x',
              colors: {
                Apr: 'yellow',
                Jan: 'red',
                Jun: 'green',
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
        x: {
          display: false,
        },
        y: {
          beginAtZero: true,
          display: false,
        },
      },
    },
    type: 'bar',
  },
  options: {
    spriteText: true,
  },
}
