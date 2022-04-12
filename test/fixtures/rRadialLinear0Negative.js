module.exports = {
  config: {
    type: 'radar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [{
        data: [-65, -29, -80, -10, -55, 0, -40],
        gradient: {
          backgroundColor: {
            axis: 'r',
            colors: {
              0: 'red',
              '-50': 'yellow',
              '-80': 'green',
            }
          }
        }
      }],
    },
    options: {
      scales: {
        r: {
          display: true
        }
      },
      plugins: {
        legend: {
          display: false,
        }
      }
    }
  },
  options: {
    spriteText: true
  }
};
