export default {
  config: {
    data: {
      datasets: [
        {
          borderWidth: 2,
          data: [65, 29, 80, 91, 55, 5, 40],
          gradient: {
            borderColor: {
              axis: 'y',
              colors: {
                0: 'red',
                50: 'yellow',
                80: 'green',
              },
            },
            pointBackgroundColor: {
              axis: 'y',
              colors: {
                0: 'red',
                50: 'yellow',
                80: 'green',
              },
            },
            pointHoverBackgroundColor: {
              axis: 'y',
              colors: {
                0: 'red',
                50: 'yellow',
                80: 'green',
              },
            },
          },
          pointBorderColor: 'white',
          pointRadius: 10,
        },
      ],
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    },
    options: {
      plugins: {
        legend: {
          labels: {
            font: {
              size: 24,
            },
          },
        },
      },
      scales: {
        x: {
          display: false,
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
