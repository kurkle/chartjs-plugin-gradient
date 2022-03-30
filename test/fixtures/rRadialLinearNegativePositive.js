module.exports = {
  config: {
    type: 'radar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [{
        data: [-65, 29, -80, 51, -55, 30, -40],
        gradient: {
          backgroundColor: {
            axis: 'r',
            colors: {
              '-80': 'green',
              '-50': 'yellow',
              0: 'red',
              50: 'green'
            }
          }
        }
      }],
    },
    options: {
      scales: {
        r: {
          display: true,
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
