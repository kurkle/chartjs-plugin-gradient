---
title: Chart options
description: One gradient background configured once under options.gradient, applied to every dataset.
---

```js chart-editor
// <block:data:1>
const data = {
  datasets: [
    {
      label: 'Dataset 1',
      data: Utils.gen(),
    },
    {
      label: 'Dataset 2',
      data: Utils.gen(),
    },
    {
      label: 'Dataset 3',
      data: Utils.gen(),
    },
  ],
}
// </block:data>

// <block:config:0>
const config = {
  type: 'line',
  data,
  options: {
    elements: {
      line: {
        fill: true,
      },
    },
    gradient: {
      backgroundColor: {
        axis: 'y',
        colors: {
          0: 'green',
          50: 'yellow',
          100: 'red',
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
