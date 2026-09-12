/**
 * The specification of the color gradient from 0 to 100 with as many steps in between as needed.
 *
 * @example gradient from red to green.
 * {
 *   0: 'red',
 *   50: 'yellow',
 *   100: 'green'
 * }
 *
 * @example gradient transitioning through the opacity of a color.
 * {
 *   100: "rgb(187, 184, 184)",
 *   80: "rgba(187, 184, 184, 0.58)",
 *   20: "rgba(187, 184, 184, 0.34)",
 *   0: "rgba(187, 184, 184, 0.18)",
 * }
 *
 * @since 0.5.0
 */
interface Gradient {
  [key: number]: string
}

/**
 * The color specification of the x, y or r axis further described within the colors property.
 *
 * @since 0.5.0
 */
interface ColorSpecification {
  axis: 'x' | 'y' | 'r'
  colors: Gradient
}

/**
 * `false` or `null` opts a dataset out of a gradient configured at a less
 * specific level (chart options or `Chart.defaults`) for the same key.
 *
 * @since 0.8.0
 */
export interface Options {
  backgroundColor?: ColorSpecification | false | null
  borderColor?: ColorSpecification | false | null
  hoverBackgroundColor?: ColorSpecification | false | null
  hoverBorderColor?: ColorSpecification | false | null
  pointBackgroundColor?: ColorSpecification | false | null
  pointBorderColor?: ColorSpecification | false | null
  pointHoverBackgroundColor?: ColorSpecification | false | null
  pointHoverBorderColor?: ColorSpecification | false | null
  [key: string]: ColorSpecification | false | null | undefined
}
