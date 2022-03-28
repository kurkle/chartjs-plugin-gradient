describe('Gradient plugin', function() {

  describe('auto', jasmine.fixtures('.'));

  it('should emit console warning when unknown axis type is used', function() {
    const origWarn = console.warn;
    console.warn = jasmine.createSpy('warn');

    acquireChart({
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
          data: [65, 29, 80, 91, 55, 5, 40],
          gradient: {
            backgroundColor: {
              axis: 's',
              colors: {
                Jan: 'red',
                Apr: 'yellow',
                Jun: 'green',
              }
            }
          }
        }],
      }
    });

    expect(console.warn).toHaveBeenCalledWith({
      asymmetricMatch: function(compareTo) {
        return compareTo.startsWith('Scale not found for \'s\'-axis in datasets[0] of chart id');
      }
    });

    console.warn = origWarn;
  });


});
