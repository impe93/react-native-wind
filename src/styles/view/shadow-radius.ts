import { Valueof } from '../../types';

/**
 * Shadow Radius Styles
 * 
 * Sets the drop shadow blur radius.
 * Platform: iOS only
 * 
 * Following TailwindCSS shadow scale conventions
 * 
 * Classes: shadow-radius-{size}
 * Examples: shadow-radius-sm, shadow-radius-md, shadow-radius-lg, shadow-radius-xl
 */

export const shadowRadiusScale = {
  none: 0,
  sm: 1,
  DEFAULT: 3,
  md: 5,
  lg: 8,
  xl: 12,
  '2xl': 16,
} as const;

export type ShadowRadiusClass = 
  | 'shadow-radius-none'
  | 'shadow-radius-sm'
  | 'shadow-radius'
  | 'shadow-radius-md'
  | 'shadow-radius-lg'
  | 'shadow-radius-xl'
  | 'shadow-radius-2xl';

export type ShadowRadiusStyles = {
  [key in ShadowRadiusClass]: {
    shadowRadius: Valueof<typeof shadowRadiusScale>;
  };
};

export const buildShadowRadiusStyles = (): ShadowRadiusStyles => {
  const styles = {} as ShadowRadiusStyles;

  // Handle special case for 'DEFAULT' -> 'shadow-radius'
  Object.keys(shadowRadiusScale).forEach((key) => {
    const className = key === 'DEFAULT' ? 'shadow-radius' : `shadow-radius-${key}`;
    styles[className] = {
      shadowRadius: shadowRadiusScale[key],
    };
  });

  return styles;
};

