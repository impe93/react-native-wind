import { fontSizes } from './font-size';
import { fontStyles } from './font-style';
import { fontWeights } from './font-weight';
import { fontVariants } from './font-variant';

export type TypographyClass =
  | keyof typeof fontSizes
  | keyof typeof fontStyles
  | keyof typeof fontWeights
  | keyof typeof fontVariants;

export type TypographyStyle = typeof fontSizes &
  typeof fontStyles &
  typeof fontWeights &
  typeof fontVariants;

export const buildTypography = (): TypographyStyle => {
  return {
    ...fontSizes,
    ...fontStyles,
    ...fontWeights,
    ...fontVariants,
  } as const;
};
