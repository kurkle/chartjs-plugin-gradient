---
title: Hover
description: Gradient border color with a matching gradient on the hovered point.
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
        label: 'Gradient border with hover',
        data: values,
        pointHoverRadius: 8,
        pointRadius: 4,
        gradient: {
          borderColor: {
            axis: 'y',
            colors: {
              0: 'green',
              50: 'orange',
              100: 'red',
            },
          },
          hoverBackgroundColor: {
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
