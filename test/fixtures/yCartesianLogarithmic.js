module.exports = {
  config: {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [{
        data: [80000, 100, 8000, 20, 700000, 10000, 1000000],
        fill: true,
        gradient: {
          backgroundColor: {
            axis: 'y',
            colors: {
              0: 'red',
              100: 'blue',
              1000: 'yellow',
              10000: 'green',
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
          type: 'logarithmic',
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
