---
title: Background
description: Gradient background fill along the y-axis.
---

```js chart-editor
// <block:data:1>
const data = {
  datasets: [
    {
      label: 'Gradient background',
      data: Utils.gen(),
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
