import { fontSizes } from './font-size';
import { fontStyles } from './font-style';
import { fontWeights } from './font-weight';
import { fontVariants } from './font-variant';
import { letterSpacing } from './letter-spacing';

export type TypographyClass =
  | keyof typeof fontSizes
  | keyof typeof fontStyles
  | keyof typeof fontWeights
  | keyof typeof fontVariants
  | keyof typeof letterSpacing;

export type TypographyStyle = typeof fontSizes &
  typeof fontStyles &
  typeof fontWeights &
  typeof fontVariants &
  typeof letterSpacing;

export const buildTypography = (): TypographyStyle => {
  return {
    ...fontSizes,
    ...fontStyles,
    ...fontWeights,
    ...fontVariants,
    ...letterSpacing,
  } as const;
};
