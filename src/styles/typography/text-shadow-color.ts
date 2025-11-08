/**
 * Text Shadow Color Styles
 * 
 * Sets the shadow color for text.
 * Uses the color palette to generate classes.
 * 
 * Classes: text-shadow-{color}-{shade} or text-shadow-{color}
 * Examples: text-shadow-blue-500, text-shadow-red-600, text-shadow-black
 */

import { colorStyleBuilder } from '../../helpers/color-style-builder';

export type TextShadowColorClass =
  | `text-shadow-${string}-${string}`
  | `text-shadow-${string}`;

export type TextShadowColorStyles = {
  [key: string]: { textShadowColor: string };
};

export const buildTextShadowColorStyles = (): TextShadowColorStyles => {
  return colorStyleBuilder(
    'text-shadow',
    'textShadowColor'
  ) as TextShadowColorStyles;
};

