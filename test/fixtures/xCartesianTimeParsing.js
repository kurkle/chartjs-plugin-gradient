module.exports = {
  config: {
    type: 'line',
    data: {
      datasets: [{
        data: [
          {x: 1648249200000, y: 24},
          {x: 1648335600000, y: 52},
          {x: 1648422000000, y: 79},
          {x: 1648508400000, y: 32},
          {x: 1648594800000, y: 16},
          {x: 1648681200000, y: 69},
          {x: 1648767600000, y: 95},
        ],
        fill: true,
        gradient: {
          backgroundColor: {
            axis: 'x',
            colors: {
              '26/03/2022': 'red',
              '28/03/2022': 'yellow',
              '31/03/2022': 'green',
            }
          }
        }
      }],
    },
    options: {
      scales: {
        x: {
          type: 'time',
          display: true,
          time: {
            unit: 'day',
            parser: 'dd/MM/yyyy'
          },
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
  },
  options: {
    spriteText: true
  }
};
