module.exports = {
  config: {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [{
        data: [65, 29, 80, 91, 55, 5, 40],
        borderWidth: 2,
        pointRadius: 10,
        gradient: {
          pointBorderColor: {
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
          beginAtZero: true
        }
      },
      plugins: {
        legend: {
          labels: {
            font: {
              size: 24
            }
          }
        }
      }
    }
  },
  options: {
    spriteText: true
  }
};
