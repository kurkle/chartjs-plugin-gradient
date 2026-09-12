---
title: Background
description: Gradient background fill along the y-axis.
---

```js chart-editor
// <block:data:1>
const values = Utils.gen()
// </block:data>

// <block:config:0>
const config = {
  type: 'line',
  data: {
    datasets: [
      {
        label: 'Gradient background',
        data: values,
        fill: true,
        gradient: {
          backgroundColor: {
            axis: 'y',
            colors: {
              0: 'green',
              50: 'blue',
              100: 'red',
            },
          },
        },
      },
    ],
  },
  options: {
    scales: {
      x: {
        type: 'linear',
      },
    },
  },
}
// </block:config>

module.exports = {
  config,
  choices: [{ path: 'data.datasets.0.gradient.backgroundColor.axis', values: ['x', 'y'], control: 'radio' }],
}
```
