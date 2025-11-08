import { Valueof } from '../../types';

/**
 * Shadow Opacity Styles
 * 
 * Sets the drop shadow opacity (multiplied by the color's alpha component).
 * Platform: iOS only
 * 
 * Following TailwindCSS opacity scale (0-100 percentage)
 * Converted to React Native's 0.0-1.0 range
 * 
 * Classes: shadow-opacity-{0|5|10|...|100}
 * Examples: shadow-opacity-50, shadow-opacity-75
 */

export const shadowOpacityScale = {
  0: 0,
  5: 0.05,
  10: 0.1,
  15: 0.15,
  20: 0.2,
  25: 0.25,
  30: 0.3,
  35: 0.35,
  40: 0.4,
  45: 0.45,
  50: 0.5,
  55: 0.55,
  60: 0.6,
  65: 0.65,
  70: 0.7,
  75: 0.75,
  80: 0.8,
  85: 0.85,
  90: 0.9,
  95: 0.95,
  100: 1,
} as const;

export type ShadowOpacityClass = `shadow-opacity-${keyof typeof shadowOpacityScale}`;

export type ShadowOpacityStyles = {
  [key in ShadowOpacityClass]: {
    shadowOpacity: Valueof<typeof shadowOpacityScale>;
  };
};

export const buildShadowOpacityStyles = (): ShadowOpacityStyles => {
  const styles = {} as ShadowOpacityStyles;

  Object.keys(shadowOpacityScale).forEach((key) => {
    styles[`shadow-opacity-${key}`] = {
      shadowOpacity: shadowOpacityScale[key],
    };
  });

  return styles;
};

