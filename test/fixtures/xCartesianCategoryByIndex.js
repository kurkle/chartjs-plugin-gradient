module.exports = {
  config: {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [{
        data: [65, 29, 80, 91, 55, 5, 40],
        gradient: {
          backgroundColor: {
            axis: 'x',
            colors: {
              0: 'red',
              2.5: 'pink',
              4.5: 'yellow',
              6: 'green',
            }
          }
        }
      }],
    },
    options: {
      scales: {
        x: {
          display: true,
          ticks: {
            display: false
          }
        },
        y: {
          display: false,
          beginAtZero: true
        }
      },
      plugins: {
        legend: false
      }
    }
  }
};
