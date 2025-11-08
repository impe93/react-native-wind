/**
 * Outline Color (New Architecture)
 * Sets the color of an element's outline.
 *
 * Platform: New Architecture only
 * @see https://reactnative.dev/docs/view-style-props#outlinecolor
 */

import { colorStyleBuilder } from '../../helpers/color-style-builder';

export type OutlineColorStyles = {
  [key: string]: { outlineColor: string };
};

export const buildOutlineColorStyles = (): OutlineColorStyles => {
  return colorStyleBuilder('outline', 'outlineColor') as OutlineColorStyles;
};

