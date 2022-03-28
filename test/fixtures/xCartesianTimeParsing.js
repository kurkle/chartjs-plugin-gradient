module.exports = {
  config: {
    type: 'line',
    data: {
      datasets: [{
        data: [
          {x: '26/03/2022', y: 24},
          {x: '27/03/2022', y: 52},
          {x: '28/03/2022', y: 79},
          {x: '29/03/2022', y: 32},
          {x: '30/03/2022', y: 16},
          {x: '31/03/2022', y: 69},
          {x: '01/04/2022', y: 95},
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
