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
              1648418400000: 'red',
              1648677600000: 'yellow',
              1648936800000: 'green',
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
        legend: false
      }
    }
  },
  options: {
    spriteText: true
  }
};
