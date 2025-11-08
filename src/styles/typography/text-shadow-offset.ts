/**
 * Text Shadow Offset Styles
 * 
 * Sets the shadow offset (x and y positioning) for text.
 * Uses the spacing scale for offset values.
 * 
 * Classes:
 * - text-shadow-offset-x-{value} (horizontal offset)
 * - text-shadow-offset-y-{value} (vertical offset)
 * 
 * Examples: text-shadow-offset-x-2, text-shadow-offset-y-4
 */

import { spaces } from '../spacing/spaces';

export type TextShadowOffsetXClass = `text-shadow-offset-x-${string}`;
export type TextShadowOffsetYClass = `text-shadow-offset-y-${string}`;

export type TextShadowOffsetStyles = Record<
  string,
  {
    textShadowOffset: {
      width: number | string;
      height: number | string;
    };
  }
>;

export const buildTextShadowOffsetStyles = (): TextShadowOffsetStyles => {
  const styles: TextShadowOffsetStyles = {};

  // Text shadow offset X (width)
  Object.keys(spaces).forEach((key) => {
    styles[`text-shadow-offset-x-${key}`] = {
      textShadowOffset: {
        width: spaces[key],
        height: 0,
      },
    };
  });

  // Text shadow offset Y (height)
  Object.keys(spaces).forEach((key) => {
    styles[`text-shadow-offset-y-${key}`] = {
      textShadowOffset: {
        width: 0,
        height: spaces[key],
      },
    };
  });

  return styles;
};

