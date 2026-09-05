module.exports = {
  config: {
    data: {
      datasets: [
        {
          data: [-65, -29, -80, -10, -55, 0, -40],
          gradient: {
            backgroundColor: {
              axis: 'y',
              colors: {
                '-50': 'yellow',
                '-80': 'green',
                0: 'red',
              },
            },
          },
        },
        {
          data: [-65, -29, -80, -10, -55, 0, -40],
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
          display: false,
        },
      },
    },
    type: 'bar',
  },
}
