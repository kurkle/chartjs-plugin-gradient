---
title: Dataset type
description: A gradient border color configured once under options.datasets.line.gradient, applied to every line dataset and left off the bar dataset.
---

```js chart-editor
// <block:data:1>
const data = {
  datasets: [
    {
      label: 'Line A',
      data: Utils.gen(),
      type: 'line',
    },
    {
      label: 'Line B',
      data: Utils.gen(),
      type: 'line',
    },
    {
      label: 'Bar',
      data: Utils.gen(),
      type: 'bar',
    },
  ],
}
// </block:data>

// <block:config:0>
const config = {
  type: 'line',
  data,
  options: {
    datasets: {
      line: {
        gradient: {
          borderColor: {
            axis: 'y',
            colors: {
              0: 'green',
              50: 'orange',
              100: 'red',
            },
          },
        },
      },
    },
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
}
```
