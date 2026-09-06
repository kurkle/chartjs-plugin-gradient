// Shared helpers for the gradient chart-editor samples.
// Usable through `Utils.name`.

const rand = () => Math.random() * 100

// Generates the same random line-chart dataset shape every gradient sample
// uses to show off gradient colors against, independent of any specific
// data values.
export function gen(count = 10) {
  return [...Array(count)].map((_, i) => ({ x: i, y: rand() }))
}
