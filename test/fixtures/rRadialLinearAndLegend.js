module.exports = {
  config: {
    type: 'radar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [{
        label: 'legend',
        data: [0, 29, 80, 91, 55, 5, 40],
        gradient: {
          backgroundColor: {
            axis: 'r',
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
        r: {
          display: true,
          beginAtZero: true,
          ticks: {
            display: false
          },
          pointLabels: {
            display: false
          }
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
