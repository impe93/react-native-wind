/**
 * Text Decoration Color Styles
 * 
 * Sets the color of text decorations (underline, line-through).
 * Platform: iOS only
 * 
 * Uses the color palette to generate classes.
 * 
 * Classes: text-decoration-{color}-{shade} or text-decoration-{color}
 * Examples: text-decoration-blue-500, text-decoration-red-600, text-decoration-black
 */

import { colorStyleBuilder } from '../../helpers/color-style-builder';

export type TextDecorationColorClass =
  | `text-decoration-${string}-${string}`
  | `text-decoration-${string}`;

export type TextDecorationColorStyles = {
  [key: string]: { textDecorationColor: string };
};

export const buildTextDecorationColorStyles =
  (): TextDecorationColorStyles => {
    return colorStyleBuilder(
      'text-decoration',
      'textDecorationColor'
    ) as TextDecorationColorStyles;
  };

