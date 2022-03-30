module.exports = {
  config: {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [{
        label: 'legend',
        data: [65, 29, 80, 91, 55, 5, 40],
        gradient: {
          backgroundColor: {
            axis: 'x',
            colors: {
              Jan: 'wrongColor1',
              Apr: 'wrongColor2',
              Jun: 'wrongColor3',
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
        legend: true
      }
    }
  },
  options: {
    spriteText: true
  }
};
