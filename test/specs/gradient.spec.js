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

  describe('gradient options resolved from chart options and defaults', () => {
    const backgroundColorSpec = {
      axis: 'y',
      colors: { 0: 'red', 100: 'green' },
    }

    it('resolves from Chart.defaults.gradient', () => {
      Chart.defaults.gradient = { backgroundColor: backgroundColorSpec }
      try {
        const chart = acquireChart({
          data: {
            datasets: [{ data: [65, 29, 80, 91, 55, 5, 40] }],
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
          },
          type: 'bar',
        })

        expect(chart.data.datasets[0].backgroundColor).toBeInstanceOf(CanvasGradient)
      } finally {
        delete Chart.defaults.gradient
      }
    })

    it('resolves from Chart.defaults.datasets.line.gradient', () => {
      Chart.defaults.datasets.line.gradient = { backgroundColor: backgroundColorSpec }
      try {
        const chart = acquireChart({
          data: {
            datasets: [{ data: [65, 29, 80, 91, 55, 5, 40] }],
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
          },
          type: 'line',
        })

        expect(chart.data.datasets[0].backgroundColor).toBeInstanceOf(CanvasGradient)
      } finally {
        delete Chart.defaults.datasets.line.gradient
      }
    })

    it('re-resolves options.gradient on update, producing a new gradient instance', () => {
      const chart = acquireChart({
        data: {
          datasets: [{ data: [65, 29, 80, 91, 55, 5, 40] }],
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        },
        options: {
          gradient: { backgroundColor: backgroundColorSpec },
        },
        type: 'bar',
      })

      const first = chart.data.datasets[0].backgroundColor
      expect(first).toBeInstanceOf(CanvasGradient)

      chart.options.gradient = {
        backgroundColor: { axis: 'y', colors: { 0: 'blue', 100: 'yellow' } },
      }
      chart.update()

      const second = chart.data.datasets[0].backgroundColor
      expect(second).toBeInstanceOf(CanvasGradient)
      expect(second).not.toBe(first)
    })

    it('lets a dataset opt out of a chart-level key with false', () => {
      const chart = acquireChart({
        data: {
          datasets: [
            {
              backgroundColor: 'blue',
              data: [65, 29, 80, 91, 55, 5, 40],
              gradient: { backgroundColor: false },
            },
          ],
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        },
        options: {
          gradient: { backgroundColor: backgroundColorSpec },
        },
        type: 'bar',
      })

      expect(chart.data.datasets[0].backgroundColor).toBe('blue')
    })

    it('does not throw when a dataset opts out with null', () => {
      expect(() => {
        acquireChart({
          data: {
            datasets: [
              {
                backgroundColor: 'blue',
                data: [65, 29, 80, 91, 55, 5, 40],
                gradient: { backgroundColor: null },
              },
            ],
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
          },
          options: {
            gradient: { backgroundColor: backgroundColorSpec },
          },
          type: 'bar',
        })
      }).not.toThrow()
    })
  })
})
