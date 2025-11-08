import { Valueof } from '../../types';

/**
 * Elevation Styles
 * 
 * Sets the elevation for Android shadow rendering.
 * Platform: Android only (API 21+)
 * 
 * Elevation is the Android alternative to iOS shadow properties.
 * Higher values create more pronounced shadows.
 * 
 * Classes: elevation-{0-24}
 * Examples: elevation-2, elevation-4, elevation-8
 */

export const elevationScale = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  8: 8,
  10: 10,
  12: 12,
  16: 16,
  20: 20,
  24: 24,
} as const;

export type ElevationClass = `elevation-${keyof typeof elevationScale}`;

export type ElevationStyles = {
  [key in ElevationClass]: {
    elevation: Valueof<typeof elevationScale>;
  };
};

export const buildElevationStyles = (): ElevationStyles => {
  const styles = {} as ElevationStyles;

  Object.keys(elevationScale).forEach((key) => {
    styles[`elevation-${key}`] = {
      elevation: elevationScale[key],
    };
  });

  return styles;
};

