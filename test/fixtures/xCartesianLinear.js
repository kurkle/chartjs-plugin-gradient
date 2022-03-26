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
              50: 'yellow',
              80: 'green',
            }
          }
        }
      }],
    },
    options: {
      indexAxis: 'y',
      scales: {
        x: {
          display: false,
        },
        y: {
          display: false,
        }
      },
      plugins: {
        legend: false
      }
    }
  }
};
