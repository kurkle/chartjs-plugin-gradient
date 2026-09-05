module.exports = {
  config: {
    data: {
      datasets: [
        {
          data: [65, 29, 80, 91, 55, 5, 40],
          gradient: {
            backgroundColor: {
              axis: 'x',
              colors: {
                Apr: 'wrongColor2',
                Jan: 'wrongColor1',
                Jun: 'wrongColor3',
              },
            },
          },
          label: 'legend',
        },
      ],
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    },
    options: {
      plugins: {
        legend: true,
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
  options: {
    spriteText: true,
  },
}
