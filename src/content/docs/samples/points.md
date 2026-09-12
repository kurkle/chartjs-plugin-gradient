---
title: Points
description: Gradient border, point background and point hover background colors along the y-axis.
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
        label: 'Gradient points',
        data: values,
        borderWidth: 2,
        pointRadius: 10,
        pointBorderColor: 'white',
        gradient: {
          borderColor: {
            axis: 'y',
            colors: {
              0: 'red',
              50: 'yellow',
              100: 'green',
            },
          },
          pointBackgroundColor: {
            axis: 'y',
            colors: {
              0: 'red',
              50: 'yellow',
              100: 'green',
            },
          },
          pointHoverBackgroundColor: {
            axis: 'y',
            colors: {
              0: 'red',
              50: 'yellow',
              100: 'green',
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
