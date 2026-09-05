module.exports = {
  config: {
    data: {
      datasets: [
        {
          data: [15, 59, 75, 29, 50, 72, 40],
          gradient: {
            backgroundColor: {
              axis: 'r',
              colors: {
                0: 'red',
                50: 'yellow',
                80: 'green',
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
        legend: {
          labels: {
            font: {
              size: 24,
            },
          },
        },
      },
      scales: {
        r: {
          beginAtZero: true,
          display: true,
          pointLabels: {
            display: false,
          },
          ticks: {
            display: false,
          },
        },
      },
    },
    type: 'polarArea',
  },
  options: {
    spriteText: true,
  },
  // Radial legend hitbox anti-aliasing differs slightly across Chrome versions/platforms;
  // widen the default 0.1% tolerance to avoid failing on that noise alone.
  tolerance: 0.002,
}
