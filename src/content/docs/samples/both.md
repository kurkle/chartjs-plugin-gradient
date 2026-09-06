---
title: Both
description: Gradient background and border colors combined on the same chart.
---

```js chart-editor
// <block:data:1>
const data = {
  datasets: [
    {
      label: 'Gradient background and border',
      data: Utils.gen(),
      fill: true,
      pointBackgroundColor: 'white',
      gradient: {
        borderColor: {
          axis: 'y',
          colors: {
            0: 'green',
            50: 'orange',
            100: 'red',
          },
        },
        backgroundColor: {
          axis: 'x',
          colors: {
            0: 'black',
            9: 'silver',
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
