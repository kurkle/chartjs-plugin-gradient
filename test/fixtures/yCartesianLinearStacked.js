module.exports = {
  config: {
    data: {
      datasets: [
        {
          data: [65, 29, 80, 91, 55, 5, 40],
          fill: true,
          gradient: {
            backgroundColor: {
              axis: 'y',
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
        x: {
          display: false,
        },
        y: {
          beginAtZero: true,
          display: true,
          stack: 'demo',
          stackWeight: 2,
          type: 'linear',
        },
        y2: {
          labels: ['ON', 'OFF'],
          offset: true,
          position: 'left',
          stack: 'demo',
          stackWeight: 1,
          type: 'category',
        },
      },
    },
    type: 'line',
  },
  options: {
    spriteText: true,
  },
}
