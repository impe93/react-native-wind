/**
 * Box Shadow (New Architecture)
 * Adds shadow effects to elements with control over position, color, size, and blur.
 * Supports multiple shadows and inset shadows.
 *
 * Platform: New Architecture only
 * Android: Outset shadows require Android 9+, inset shadows require Android 10+
 *
 * @see https://reactnative.dev/docs/view-style-props#boxshadow
 */

/**
 * Box shadow scale inspired by TailwindCSS
 * Following the format: offsetX offsetY blurRadius spreadRadius color
 */
export const boxShadow = {
  'shadow-none': {
    boxShadow: 'none',
  },
  'shadow-sm': {
    boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
  },
  shadow: {
    boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1)',
  },
  'shadow-md': {
    boxShadow: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -2px rgba(0, 0, 0, 0.1)',
  },
  'shadow-lg': {
    boxShadow: '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -4px rgba(0, 0, 0, 0.1)',
  },
  'shadow-xl': {
    boxShadow: '0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 8px 10px -6px rgba(0, 0, 0, 0.1)',
  },
  'shadow-2xl': {
    boxShadow: '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },
  'shadow-inner': {
    boxShadow: 'inset 0px 2px 4px 0px rgba(0, 0, 0, 0.05)',
  },
} as const;

export type BoxShadowClass = keyof typeof boxShadow;

