/**
 * Outline Offset (New Architecture)
 * Sets the amount of space between an outline and the bounds of an element.
 * Does not affect layout.
 *
 * Platform: New Architecture only
 * @see https://reactnative.dev/docs/view-style-props#outlineoffset
 */

export const outlineOffset = {
  'outline-offset-0': {
    outlineOffset: 0,
  },
  'outline-offset-1': {
    outlineOffset: 1,
  },
  'outline-offset-2': {
    outlineOffset: 2,
  },
  'outline-offset-4': {
    outlineOffset: 4,
  },
  'outline-offset-8': {
    outlineOffset: 8,
  },
} as const;

export type OutlineOffsetClass = keyof typeof outlineOffset;

