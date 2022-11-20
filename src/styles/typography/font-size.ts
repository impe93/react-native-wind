import { customStylesDefined } from '../../core/customize';

export type DefualtFontSizes = typeof defaultFontSizes;
export type CustomFontSizes = Record<
  string | number,
  {
    fontSize: number | string;
    lineHeight?: number | string;
  }
>;
export type MergedFontSizes = DefualtFontSizes & CustomFontSizes;

export const defaultFontSizes = {
  xs: {
    fontSize: 12,
    lineHeight: 16,
  },
  sm: {
    fontSize: 14,
    lineHeight: 20,
  },
  base: {
    fontSize: 16,
    lineHeight: 24,
  },
  lg: {
    fontSize: 18,
    lineHeight: 28,
  },
  xl: {
    fontSize: 20,
    lineHeight: 28,
  },
  '2xl': {
    fontSize: 24,
    lineHeight: 32,
  },
  '3xl': {
    fontSize: 26,
    lineHeight: 36,
  },
  '4xl': {
    fontSize: 36,
    lineHeight: 40,
  },
  '5xl': {
    fontSize: 48,
  },
  '6xl': {
    fontSize: 60,
  },
  '7xl': {
    fontSize: 72,
  },
  '8xl': {
    fontSize: 96,
  },
  '9xl': {
    fontSize: 128,
  },
} as const;

const getCustomFontSizes = (): CustomFontSizes | undefined =>
  customStylesDefined?.fontSize;

export const mergeFontSizes = (): void => {
  const customFontSizes = getCustomFontSizes();

  fontSizes = {
    ...defaultFontSizes,
    ...customFontSizes,
  } as const;
};

let fontSizes: MergedFontSizes;

export type FontSizeStyle = {
  [key in FontSizeClass]: {
    fontSize: number | string;
    lineHeight?: number | string;
  };
};

export type FontSizeClass = `text-${keyof typeof defaultFontSizes}`;

export const buildFontSizes = (): FontSizeStyle => {
  const sizes: FontSizeStyle = {} as FontSizeStyle;
  Object.keys(fontSizes).forEach((s) => {
    sizes[`text-${s}`] = fontSizes[s];
  });
  return sizes;
};
