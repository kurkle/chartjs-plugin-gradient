---
title: Border
description: Gradient border color along the y-axis.
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
        label: 'Gradient border',
        data: values,
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
}
```
