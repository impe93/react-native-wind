import { spaces } from '../spacing/spaces';

/**
 * Shadow Offset Styles
 * 
 * Sets the drop shadow offset (x and y positioning).
 * Platform: iOS only
 * 
 * Uses the spacing scale for offset values.
 * 
 * Classes: 
 * - shadow-offset-x-{value} (horizontal offset)
 * - shadow-offset-y-{value} (vertical offset)
 * 
 * Examples: shadow-offset-x-2, shadow-offset-y-4
 */

export type ShadowOffsetXClass = `shadow-offset-x-${string}`;
export type ShadowOffsetYClass = `shadow-offset-y-${string}`;

export type ShadowOffsetStyles = Record<string, { 
  shadowOffset: { 
    width: number | string; 
    height: number | string;
  };
}>;

export const buildShadowOffsetStyles = (): ShadowOffsetStyles => {
  const styles: ShadowOffsetStyles = {};

  // Shadow offset X (width)
  Object.keys(spaces).forEach((key) => {
    styles[`shadow-offset-x-${key}`] = {
      shadowOffset: {
        width: spaces[key],
        height: 0,
      },
    };
  });

  // Shadow offset Y (height)
  Object.keys(spaces).forEach((key) => {
    styles[`shadow-offset-y-${key}`] = {
      shadowOffset: {
        width: 0,
        height: spaces[key],
      },
    };
  });

  return styles;
};

