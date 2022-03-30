module.exports = {
  config: {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [{
        data: [-65, -29, -80, -51, -55, -30, -40],
        gradient: {
          backgroundColor: {
            axis: 'y',
            colors: {
              '-80': 'green',
              '-50': 'yellow',
              0: 'red',
              50: 'yellow',
              80: 'green',
            }
          }
        }
      }],
    },
    options: {
      scales: {
        x: {
          display: false,
        },
        y: {
          display: true,
          max: -25
        }
      },
      plugins: {
        legend: false
      }
    }
  },
  options: {
    spriteText: true
  }
};
