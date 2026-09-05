module.exports = {
  config: {
    data: {
      datasets: [
        {
          borderWidth: 4,
          data: [65, 29, 80, 91, 55, 5, 40],
          gradient: {
            borderColor: {
              axis: 'x',
              colors: {
                Apr: 'yellow',
                Jan: 'red',
                Jun: 'green',
              },
            },
          },
        },
      ],
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    },
    options: {
      plugins: {
        legend: false,
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
    type: 'bar',
  },
}
