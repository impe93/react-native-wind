/**
 * Outline Style (New Architecture)
 * Sets the style of an element's outline.
 *
 * Platform: New Architecture only
 * @see https://reactnative.dev/docs/view-style-props#outlinestyle
 */

export const outlineStyle = {
  'outline-solid': {
    outlineStyle: 'solid',
  },
  'outline-dashed': {
    outlineStyle: 'dashed',
  },
  'outline-dotted': {
    outlineStyle: 'dotted',
  },
} as const;

export type OutlineStyleClass = keyof typeof outlineStyle;

