import { colorStyleBuilder } from '../../helpers/color-style-builder';

/**
 * Shadow Color Styles
 * 
 * Sets the drop shadow color.
 * Platform: iOS and Android (API 28+)
 * 
 * Classes: shadow-{color}-{shade} or shadow-{color}
 * Examples: shadow-blue-500, shadow-red-600, shadow-black
 */

export type ShadowColorClass = `shadow-${string}-${string}` | `shadow-${string}`;

export type ShadowColorStyles = Record<string, { shadowColor: string }>;

export const buildShadowColorStyles = (): ShadowColorStyles => {
  return colorStyleBuilder('shadow', 'shadowColor') as ShadowColorStyles;
};

