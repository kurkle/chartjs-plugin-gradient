import {color} from 'chart.js/helpers';

const rgbs = (c) => Math.round(c._rgb.a * 255) << 24 | c._rgb.r << 16 | c._rgb.g << 8 | c._rgb.b;
// IEC 61966-2-1:1999
const toRGBs = (l) => l <= 0.0031308 ? l * 12.92 : Math.pow(l, 1.0 / 2.4) * 1.055 - 0.055;
// IEC 61966-2-1:1999
const fromRGBs = (srgb) => srgb <= 0.04045 ? srgb / 12.92 : Math.pow((srgb + 0.055) / 1.055, 2.4);

function interpolate(percent, startColor, endColor) {
  const startRGBs = rgbs(startColor.color);
  const startR = fromRGBs(((startRGBs >> 16) & 0xff) / 255);
  const startG = fromRGBs(((startRGBs >> 8) & 0xff) / 255);
  const startB = fromRGBs((startRGBs & 0xff) / 255);

  const endRGBs = rgbs(endColor.color);
  const endR = fromRGBs(((endRGBs >> 16) & 0xff) / 255);
  const endG = fromRGBs(((endRGBs >> 8) & 0xff) / 255);
  const endB = fromRGBs((endRGBs & 0xff) / 255);

  const r = Math.round(toRGBs(startR + percent * (endR - startR)) * 255);
  const g = Math.round(toRGBs(startG + percent * (endG - startG)) * 255);
  const b = Math.round(toRGBs(startB + percent * (endB - startB)) * 255);

  return color({r, g, b, a: 1});
}

export function getInterpolatedColorByValue(state, keyOption, datasetIndex, value) {
  if (state.options.has(keyOption.key)) {
    const option = state.options.get(keyOption.key);
    const gradientData = option.filter((el) => el.datasetIndex === datasetIndex);
    if (gradientData.length === 1) {
      const data = gradientData[0];
      const percent = value / data.scale.max;
      let startColor, endColor;
      for (const stopColor of data.stopColors) {
        if (stopColor.stop === percent) {
          return stopColor.color;
        }
        if (stopColor.stop < percent) {
          startColor = stopColor;
        } else if (stopColor.stop > percent && !endColor) {
          endColor = stopColor;
        }
      }
      if (!endColor) {
        return startColor;
      }
      return interpolate(percent, startColor, endColor);
    }
  }
}
