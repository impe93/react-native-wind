import { fontSizes } from './font-size';
import { fontStyles } from './font-style';
import { fontWeights } from './font-weight';
import { fontVariants } from './font-variant';
import { letterSpacing } from './letter-spacing';
import { textAlign } from './text-align';

export type TypographyClass =
  | keyof typeof fontSizes
  | keyof typeof fontStyles
  | keyof typeof fontWeights
  | keyof typeof fontVariants
  | keyof typeof letterSpacing
  | keyof typeof textAlign;

export type TypographyStyle = typeof fontSizes &
  typeof fontStyles &
  typeof fontWeights &
  typeof fontVariants &
  typeof textAlign &
  typeof letterSpacing;

export const buildTypography = (): TypographyStyle => {
  return {
    ...fontSizes,
    ...fontStyles,
    ...fontWeights,
    ...fontVariants,
    ...letterSpacing,
    ...textAlign,
  } as const;
};
