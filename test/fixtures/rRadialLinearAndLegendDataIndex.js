module.exports = {
  config: {
    type: 'polarArea',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [{
        label: 'legend',
        data: [15, 59, 75, 29, 50, 72, 40],
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
