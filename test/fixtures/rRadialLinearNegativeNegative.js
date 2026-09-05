module.exports = {
  config: {
    data: {
      datasets: [
        {
          data: [-65, -29, -80, -51, -55, -30, -40],
          gradient: {
            backgroundColor: {
              axis: 'r',
              colors: {
                '-50': 'yellow',
                '-80': 'green',
                0: 'red',
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
          display: true,
          max: -25,
        },
      },
    },
    type: 'radar',
  },
  options: {
    spriteText: true,
  },
}
