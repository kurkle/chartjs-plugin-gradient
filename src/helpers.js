export const areaIsValid = (area) => area && area.right > area.left && area.bottom > area.top;

export function createGradient(ctx, axis, scale) {
  if (axis === 'r') {
    return ctx.createRadialGradient(scale.xCenter, scale.yCenter, 0, scale.xCenter, scale.yCenter, scale.drawingArea);
  }
  if (axis === 'y') {
    return ctx.createLinearGradient(0, scale.bottom, 0, scale.top);
  }
  return ctx.createLinearGradient(scale.left, 0, scale.right, 0);
}

export function applyColors(gradient, colors) {
  colors.forEach(function(item) {
    gradient.addColorStop(
      item.stop, item.color.rgbString()
    );
  });
}
