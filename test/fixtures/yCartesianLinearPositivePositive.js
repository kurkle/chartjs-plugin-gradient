module.exports = {
  config: {
    data: {
      datasets: [
        {
          data: [65, 29, 80, 51, 55, 30, 40],
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
          display: true,
          min: 25,
        },
      },
    },
    type: 'bar',
  },
  options: {
    spriteText: true,
  },
}
