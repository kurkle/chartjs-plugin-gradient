module.exports = {
  config: {
    data: {
      datasets: [
        {
          data: [
            { x: '28/03/2022', y: 24 },
            { x: '29/03/2022', y: 52 },
            { x: '30/03/2022', y: 79 },
            { x: '31/03/2022', y: 32 },
            { x: '01/04/2022', y: 16 },
            { x: '02/04/2022', y: 69 },
            { x: '03/04/2022', y: 95 },
          ],
          fill: true,
          gradient: {
            backgroundColor: {
              axis: 'x',
              colors: {
                '03/04/2022': 'green',
                '28/03/2022': 'red',
                '31/03/2022': 'yellow',
              },
            },
          },
        },
      ],
    },
    options: {
      plugins: {
        legend: false,
      },
      scales: {
        x: {
          adapters: {
            date: {
              locale: 'en-US',
              setZone: true,
              zone: 'Europe/Rome',
            },
          },
          display: true,
          time: {
            parser: 'dd/MM/yyyy',
            unit: 'day',
          },
          type: 'time',
        },
        y: {
          beginAtZero: true,
          display: false,
        },
      },
    },
    type: 'line',
  },
  options: {
    spriteText: true,
  },
}
