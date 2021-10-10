import { fontSizes } from './font-size';

export type TypographyClass = keyof typeof fontSizes;

export type TypographyStyle = typeof fontSizes;

export const buildLayout = (): TypographyStyle => {
  return {
    ...fontSizes,
  } as const;
};
