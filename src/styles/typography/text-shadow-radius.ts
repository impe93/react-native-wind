/**
 * Text Shadow Radius Styles
 * 
 * Sets the blur radius for text shadows.
 * 
 * Following TailwindCSS shadow scale conventions.
 * 
 * Classes:
 * - text-shadow-radius-none
 * - text-shadow-radius-sm
 * - text-shadow-radius (default)
 * - text-shadow-radius-md
 * - text-shadow-radius-lg
 * - text-shadow-radius-xl
 * - text-shadow-radius-2xl
 * 
 * Examples: text-shadow-radius-sm, text-shadow-radius-lg
 */

import { Valueof } from '../../types';

export const textShadowRadiusScale = {
  none: 0,
  sm: 1,
  DEFAULT: 3,
  md: 5,
  lg: 8,
  xl: 12,
  '2xl': 16,
} as const;

export type TextShadowRadiusClass = 
  | 'text-shadow-radius-none'
  | 'text-shadow-radius-sm'
  | 'text-shadow-radius'
  | 'text-shadow-radius-md'
  | 'text-shadow-radius-lg'
  | 'text-shadow-radius-xl'
  | 'text-shadow-radius-2xl';

export type TextShadowRadiusStyles = {
  [key in TextShadowRadiusClass]: {
    textShadowRadius: Valueof<typeof textShadowRadiusScale>;
  };
};

export const buildTextShadowRadiusStyles = (): TextShadowRadiusStyles => {
  const styles = {} as TextShadowRadiusStyles;

  // Handle special case for 'DEFAULT' -> 'text-shadow-radius'
  Object.keys(textShadowRadiusScale).forEach((key) => {
    const className = key === 'DEFAULT' ? 'text-shadow-radius' : `text-shadow-radius-${key}`;
    styles[className as TextShadowRadiusClass] = {
      textShadowRadius: textShadowRadiusScale[key as keyof typeof textShadowRadiusScale],
    };
  });

  return styles;
};

