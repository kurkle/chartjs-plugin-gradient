import { specsFromFixtures } from '../utils'

describe('Gradient plugin', () => {
  describe('auto', specsFromFixtures())

  it('should emit console warning when unknown axis type is used', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

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

    expect(warn).toHaveBeenCalledWith(
      expect.stringMatching(/^Scale not found for 's'-axis in datasets\[0\] of chart id/)
    )

    warn.mockRestore()
  })
})
