import { fontSizes } from './font-size';
import { fontStyles } from './font-style';

export type TypographyClass = keyof typeof fontSizes | keyof typeof fontStyles;

export type TypographyStyle = typeof fontSizes & typeof fontStyles;

export const buildLayout = (): TypographyStyle => {
  return {
    ...fontSizes,
    ...fontStyles,
  } as const;
};
