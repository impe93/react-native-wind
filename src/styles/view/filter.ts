/**
 * Filter (New Architecture)
 * Applies graphical filters to views. Implies overflow: hidden.
 *
 * Platform: New Architecture only
 * Cross-platform: brightness, opacity
 * Android only: blur, contrast, dropShadow, grayscale, hueRotate, invert, sepia, saturate
 * Android: blur and dropShadow require Android 12+
 *
 * @see https://reactnative.dev/docs/view-style-props#filter
 */

/**
 * Brightness filter (Cross-platform)
 * Values: 0 = completely black, 1 = normal, 2 = twice as bright
 */
export const brightnessFilter = {
  'brightness-0': {
    filter: 'brightness(0)',
  },
  'brightness-50': {
    filter: 'brightness(0.5)',
  },
  'brightness-75': {
    filter: 'brightness(0.75)',
  },
  'brightness-90': {
    filter: 'brightness(0.9)',
  },
  'brightness-95': {
    filter: 'brightness(0.95)',
  },
  'brightness-100': {
    filter: 'brightness(1)',
  },
  'brightness-105': {
    filter: 'brightness(1.05)',
  },
  'brightness-110': {
    filter: 'brightness(1.1)',
  },
  'brightness-125': {
    filter: 'brightness(1.25)',
  },
  'brightness-150': {
    filter: 'brightness(1.5)',
  },
  'brightness-200': {
    filter: 'brightness(2)',
  },
} as const;

/**
 * Opacity filter (Cross-platform)
 * Note: Different from the opacity style property
 * Values: 0 = fully transparent, 1 = fully opaque
 */
export const opacityFilter = {
  'filter-opacity-0': {
    filter: 'opacity(0)',
  },
  'filter-opacity-5': {
    filter: 'opacity(0.05)',
  },
  'filter-opacity-10': {
    filter: 'opacity(0.1)',
  },
  'filter-opacity-20': {
    filter: 'opacity(0.2)',
  },
  'filter-opacity-25': {
    filter: 'opacity(0.25)',
  },
  'filter-opacity-30': {
    filter: 'opacity(0.3)',
  },
  'filter-opacity-40': {
    filter: 'opacity(0.4)',
  },
  'filter-opacity-50': {
    filter: 'opacity(0.5)',
  },
  'filter-opacity-60': {
    filter: 'opacity(0.6)',
  },
  'filter-opacity-70': {
    filter: 'opacity(0.7)',
  },
  'filter-opacity-75': {
    filter: 'opacity(0.75)',
  },
  'filter-opacity-80': {
    filter: 'opacity(0.8)',
  },
  'filter-opacity-90': {
    filter: 'opacity(0.9)',
  },
  'filter-opacity-95': {
    filter: 'opacity(0.95)',
  },
  'filter-opacity-100': {
    filter: 'opacity(1)',
  },
} as const;

/**
 * Blur filter (Android 12+ only)
 * Applies Gaussian blur with specified radius
 */
export const blurFilter = {
  'blur-none': {
    filter: 'blur(0)',
  },
  'blur-sm': {
    filter: 'blur(4)',
  },
  blur: {
    filter: 'blur(8)',
  },
  'blur-md': {
    filter: 'blur(12)',
  },
  'blur-lg': {
    filter: 'blur(16)',
  },
  'blur-xl': {
    filter: 'blur(24)',
  },
  'blur-2xl': {
    filter: 'blur(40)',
  },
  'blur-3xl': {
    filter: 'blur(64)',
  },
} as const;

/**
 * Contrast filter (Android only)
 * Values: 0 = no contrast, 1 = normal, 2 = twice the contrast
 */
export const contrastFilter = {
  'contrast-0': {
    filter: 'contrast(0)',
  },
  'contrast-50': {
    filter: 'contrast(0.5)',
  },
  'contrast-75': {
    filter: 'contrast(0.75)',
  },
  'contrast-100': {
    filter: 'contrast(1)',
  },
  'contrast-125': {
    filter: 'contrast(1.25)',
  },
  'contrast-150': {
    filter: 'contrast(1.5)',
  },
  'contrast-200': {
    filter: 'contrast(2)',
  },
} as const;

/**
 * Grayscale filter (Android only)
 * Values: 0 = no grayscale, 1 = completely grayscale
 */
export const grayscaleFilter = {
  'grayscale-0': {
    filter: 'grayscale(0)',
  },
  grayscale: {
    filter: 'grayscale(1)',
  },
} as const;

/**
 * Invert filter (Android only)
 * Values: 0 = no inversion, 1 = completely inverted
 */
export const invertFilter = {
  'invert-0': {
    filter: 'invert(0)',
  },
  invert: {
    filter: 'invert(1)',
  },
} as const;

/**
 * Sepia filter (Android only)
 * Values: 0 = no sepia, 1 = completely sepia
 */
export const sepiaFilter = {
  'sepia-0': {
    filter: 'sepia(0)',
  },
  sepia: {
    filter: 'sepia(1)',
  },
} as const;

/**
 * Saturate filter (Android only)
 * Values: 0 = completely unsaturated, 1 = normal, 2 = twice as saturated
 */
export const saturateFilter = {
  'saturate-0': {
    filter: 'saturate(0)',
  },
  'saturate-50': {
    filter: 'saturate(0.5)',
  },
  'saturate-100': {
    filter: 'saturate(1)',
  },
  'saturate-150': {
    filter: 'saturate(1.5)',
  },
  'saturate-200': {
    filter: 'saturate(2)',
  },
} as const;

/**
 * Hue Rotate filter (Android only)
 * Rotates the hue by the specified angle
 */
export const hueRotateFilter = {
  'hue-rotate-0': {
    filter: 'hueRotate(0deg)',
  },
  'hue-rotate-15': {
    filter: 'hueRotate(15deg)',
  },
  'hue-rotate-30': {
    filter: 'hueRotate(30deg)',
  },
  'hue-rotate-60': {
    filter: 'hueRotate(60deg)',
  },
  'hue-rotate-90': {
    filter: 'hueRotate(90deg)',
  },
  'hue-rotate-180': {
    filter: 'hueRotate(180deg)',
  },
} as const;

// Export all filter types
export type FilterClass =
  | keyof typeof brightnessFilter
  | keyof typeof opacityFilter
  | keyof typeof blurFilter
  | keyof typeof contrastFilter
  | keyof typeof grayscaleFilter
  | keyof typeof invertFilter
  | keyof typeof sepiaFilter
  | keyof typeof saturateFilter
  | keyof typeof hueRotateFilter;

// Combine all filter styles
export type FilterStyles = typeof brightnessFilter &
  typeof opacityFilter &
  typeof blurFilter &
  typeof contrastFilter &
  typeof grayscaleFilter &
  typeof invertFilter &
  typeof sepiaFilter &
  typeof saturateFilter &
  typeof hueRotateFilter;

export const buildFilterStyles = (): FilterStyles => {
  return {
    ...brightnessFilter,
    ...opacityFilter,
    ...blurFilter,
    ...contrastFilter,
    ...grayscaleFilter,
    ...invertFilter,
    ...sepiaFilter,
    ...saturateFilter,
    ...hueRotateFilter,
  } as const;
};

