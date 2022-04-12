module.exports = {
  config: {
    type: 'line',
    data: {
      datasets: [{
        data: [
          {x: 1648418400000, y: 24},
          {x: 1648504800000, y: 52},
          {x: 1648591200000, y: 79},
          {x: 1648677600000, y: 32},
          {x: 1648764000000, y: 16},
          {x: 1648850400000, y: 69},
          {x: 1648936800000, y: 95},
        ],
        fill: true,
        gradient: {
          backgroundColor: {
            axis: 'x',
            colors: {
              '28/03/2022': 'red',
              '31/03/2022': 'yellow',
              '03/04/2022': 'green',
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
          adapters: {
            date: {
              locale: 'en-US',
              setZone: true,
              zone: 'Europe/Rome'
            }
          },
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
