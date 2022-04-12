module.exports = {
  config: {
    type: 'radar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [{
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
          reverse: true,
          beginAtZero: true,
          ticks: {
            z: 100
          }
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
