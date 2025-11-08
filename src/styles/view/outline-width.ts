/**
 * Outline Width (New Architecture)
 * Sets the width of an element's outline. Does not affect layout.
 *
 * Platform: New Architecture only
 * @see https://reactnative.dev/docs/view-style-props#outlinewidth
 */

export const outlineWidth = {
  'outline-0': {
    outlineWidth: 0,
  },
  'outline-1': {
    outlineWidth: 1,
  },
  'outline-2': {
    outlineWidth: 2,
  },
  'outline-4': {
    outlineWidth: 4,
  },
  'outline-8': {
    outlineWidth: 8,
  },
} as const;

export type OutlineWidthClass = keyof typeof outlineWidth;

