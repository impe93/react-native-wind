/**
 * Border Curve (iOS 13+)
 * Changes the corner curve style of borders.
 *
 * Platform: iOS 13+ only
 * @see https://reactnative.dev/docs/view-style-props#bordercurve
 */

export const borderCurve = {
  'border-curve-circular': {
    borderCurve: 'circular',
  },
  'border-curve-continuous': {
    borderCurve: 'continuous',
  },
} as const;

export type BorderCurveClass = keyof typeof borderCurve;

