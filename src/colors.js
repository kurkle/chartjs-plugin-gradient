import {color} from 'chart.js/helpers';
import {getGradientData, getPixelStop} from './helpers';

// IEC 61966-2-1:1999
const toRGBs = (l) => l <= 0.0031308 ? l * 12.92 : Math.pow(l, 1.0 / 2.4) * 1.055 - 0.055;
// IEC 61966-2-1:1999
const fromRGBs = (srgb) => srgb <= 0.04045 ? srgb / 12.92 : Math.pow((srgb + 0.055) / 1.055, 2.4);

function interpolate(percent, startColor, endColor) {
  const start = startColor.color.rgb;
  const startR = fromRGBs(start.r / 255);
  const startG = fromRGBs(start.g / 255);
  const startB = fromRGBs(start.b / 255);

  const end = endColor.color.rgb;
  const endR = fromRGBs(end.r / 255);
  const endG = fromRGBs(end.g / 255);
  const endB = fromRGBs(end.b / 255);

  return color({
    r: Math.round(toRGBs(startR + percent * (endR - startR)) * 255),
    g: Math.round(toRGBs(startG + percent * (endG - startG)) * 255),
    b: Math.round(toRGBs(startB + percent * (endB - startB)) * 255),
    a: 1
  });
}

/**
 * Calculate a color from gradient stop color by a value of the dataset.
 * @param {Object} state - state of the plugin
 * @param {{key: string, legendItemKey: string}} keyOption - option of the dataset where the gradient is applied
 * @param {number} datasetIndex - dataset index
 * @param {number} value - value used for searching the color
 * @returns {Object} calculated color
 */
export function getInterpolatedColorByValue(state, keyOption, datasetIndex, value) {
  const data = getGradientData(state, keyOption, datasetIndex);
  if (!data || !data.stopColors.length) {
    return;
  }
  const {stop: percent} = getPixelStop(data.scale, value);
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
