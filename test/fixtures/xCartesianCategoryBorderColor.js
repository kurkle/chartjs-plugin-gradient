module.exports = {
  config: {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [{
        data: [65, 29, 80, 91, 55, 5, 40],
        borderWidth: 4,
        gradient: {
          borderColor: {
            axis: 'x',
            colors: {
              Jan: 'red',
              Apr: 'yellow',
              Jun: 'green',
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
          display: false,
        }
      }
    }
  }
};
