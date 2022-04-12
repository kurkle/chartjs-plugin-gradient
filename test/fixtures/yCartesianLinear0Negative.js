module.exports = {
  config: {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [{
        data: [-65, -29, -80, -10, -55, 0, -40],
        gradient: {
          backgroundColor: {
            axis: 'y',
            colors: {
              0: 'red',
              '-50': 'yellow',
              '-80': 'green',
            }
          }
        }
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
          display: false,
        }
      },
      plugins: {
        legend: {
          display: false,
        }
      }
    }
  }
};
