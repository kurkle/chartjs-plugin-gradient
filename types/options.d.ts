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
 * The color specification of either the x or the y axis further described within the colors property.
 *
 * @since 0.5.0
 */
interface ColorSpecification {
    axis: 'x' | 'y'
    colors: Gradient
}

export interface Options {
    backgroundColor?: ColorSpecification
    borderColor?: ColorSpecification
}
