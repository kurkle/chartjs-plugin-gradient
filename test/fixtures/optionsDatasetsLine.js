export default {
  config: {
    data: {
      datasets: [
        {
          borderWidth: 3,
          data: [10, 40, 70, 90, 60, 30, 20],
          label: 'Line A',
          type: 'line',
        },
        {
          borderWidth: 3,
          data: [20, 50, 30, 60, 80, 40, 10],
          label: 'Line B',
          type: 'line',
        },
        {
          backgroundColor: 'silver',
          borderColor: 'gray',
          borderWidth: 2,
          data: [15, 35, 55, 75, 45, 25, 65],
          label: 'Bar',
          type: 'bar',
        },
      ],
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    },
    options: {
      datasets: {
        line: {
          gradient: {
            borderColor: {
              axis: 'y',
              colors: {
                0: 'red',
                50: 'yellow',
                100: 'green',
              },
            },
          },
        },
      },
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
          max: 100,
        },
      },
    },
    type: 'bar',
  },
  options: {
    spriteText: true,
  },
}
