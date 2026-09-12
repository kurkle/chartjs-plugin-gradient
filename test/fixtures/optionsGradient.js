export default {
  config: {
    data: {
      datasets: [
        {
          data: [10, 40, 70, 90, 60, 30, 20],
          fill: true,
          label: 'Dataset A',
        },
        {
          data: [20, 50, 30, 60, 80, 40, 10],
          fill: true,
          label: 'Dataset B',
        },
      ],
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    },
    options: {
      gradient: {
        backgroundColor: {
          axis: 'y',
          colors: {
            0: 'red',
            50: 'yellow',
            100: 'green',
          },
        },
      },
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
          max: 100,
        },
      },
    },
    type: 'line',
  },
  options: {
    spriteText: true,
  },
}
