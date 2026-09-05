describe('Gradient plugin', () => {
  describe('auto', jasmine.fixtures('.'))

  it('should emit console warning when unknown axis type is used', () => {
    const origWarn = console.warn
    console.warn = jasmine.createSpy('warn')

    acquireChart({
      data: {
        datasets: [
          {
            data: [65, 29, 80, 91, 55, 5, 40],
            gradient: {
              backgroundColor: {
                axis: 's',
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
      type: 'bar',
    })

    expect(console.warn).toHaveBeenCalledWith({
      asymmetricMatch: (compareTo) =>
        compareTo.startsWith("Scale not found for 's'-axis in datasets[0] of chart id"),
    })

    console.warn = origWarn
  })
})
