/**
 * @typedef { import("chart.js").Chart } Chart
 * @typedef { import("chart.js").Scale } Scale
 */

/**
 * check if the area is consistent
 * @param {Object} area - area to check
 * @returns {boolean}
 */
export const areaIsValid = (area) => area && area.right > area.left && area.bottom > area.top;

/**
 * Create a canvas gradient
 * @param {CanvasRenderingContext2D} ctx - chart canvas context
 * @param {string} axis - axis type of scale
 * @param {Scale} scale - scale instance
 * @returns {CanvasGradient} created gradient
 */
export function createGradient(ctx, axis, scale) {
  if (axis === 'r') {
    return ctx.createRadialGradient(scale.xCenter, scale.yCenter, 0, scale.xCenter, scale.yCenter, scale.drawingArea);
  }
  if (axis === 'y') {
    return ctx.createLinearGradient(0, scale.bottom, 0, scale.top);
  }
  return ctx.createLinearGradient(scale.left, 0, scale.right, 0);
}

/**
 * Add color stop to a gradient
 * @param {CanvasGradient} gradient - gradient instance
 * @param {Array} colors - all colors to add
 */
export function applyColors(gradient, colors) {
  colors.forEach(function(item) {
    gradient.addColorStop(
      item.stop, item.color.rgbString()
    );
  });
}

/**
 * Get the gradient plugin configuration from the state for a specific dataset option
 * @param {Object} state - state of the plugin
 * @param {{key: string, legendItemKey: string}} keyOption - option of the dataset where the gradient is applied
 * @param {number} datasetIndex - dataset index
 * @returns {Object} gradient plugin configuration from the state for a specific dataset option
 */
export function getGradientData(state, keyOption, datasetIndex) {
  if (state.options.has(keyOption.key)) {
    const option = state.options.get(keyOption.key);
    const gradientData = option.filter((el) => el.datasetIndex === datasetIndex);
    if (gradientData.length) {
      return gradientData[0];
    }
  }
}
