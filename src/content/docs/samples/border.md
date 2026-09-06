---
title: Border
description: Gradient border color along the y-axis.
---

```js chart-editor
// <block:data:1>
const data = {
  datasets: [
    {
      label: 'Gradient border',
      data: Utils.gen(),
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
}
// </block:data>

// <block:config:0>
const config = {
  type: 'line',
  data,
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
