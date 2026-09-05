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
        },
      ],
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    },
    options: {
      plugins: {
        legend: false,
      },
      scales: {
        r: {
          beginAtZero: true,
          display: true,
        },
      },
    },
    type: 'radar',
  },
  options: {
    spriteText: true,
  },
}
