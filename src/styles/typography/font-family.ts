/**
 * Font Family Styles
 * 
 * Sets the font family for text.
 * Customizable via theme.
 * 
 * Default generic families (iOS):
 * - font-system (system-ui)
 * - font-sans (ui-sans-serif)
 * - font-serif (ui-serif)
 * - font-mono (ui-monospace)
 * - font-rounded (ui-rounded)
 * 
 * Custom font families can be added via customize({ theme: { fontFamily: {...} } })
 * Examples: font-custom, font-helvetica, font-roboto
 */

import { customStylesDefined } from '../../core/customize';

export type DefaultFontFamilies = typeof defaultFontFamilies;
export type CustomFontFamilies = Record<string, string>;
export type MergedFontFamilies =
  | (DefaultFontFamilies & CustomFontFamilies)
  | DefaultFontFamilies;

// Default generic font families for iOS
export const defaultFontFamilies = {
  system: 'system-ui',
  sans: 'ui-sans-serif',
  serif: 'ui-serif',
  mono: 'ui-monospace',
  rounded: 'ui-rounded',
} as const;

const getCustomFontFamilies = (): CustomFontFamilies | undefined =>
  customStylesDefined?.theme?.fontFamily;

export const mergeFontFamilies = (): void => {
  const customFontFamilies = getCustomFontFamilies();

  fontFamilies = {
    ...defaultFontFamilies,
    ...customFontFamilies,
  } as const;
};

export let fontFamilies: MergedFontFamilies;

export type FontFamilyClass = `font-${keyof typeof defaultFontFamilies}` | `font-${string}`;

export type FontFamilyStyles = {
  [key: string]: { fontFamily: string };
};

export const buildFontFamilyStyles = (): FontFamilyStyles => {
  const styles: FontFamilyStyles = {};

  Object.keys(fontFamilies).forEach((key) => {
    styles[`font-${key}`] = {
      fontFamily: fontFamilies[key as keyof typeof fontFamilies],
    };
  });

  return styles;
};

