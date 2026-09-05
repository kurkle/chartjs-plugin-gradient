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
      indexAxis: 'y',
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
