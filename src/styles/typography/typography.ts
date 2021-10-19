import { fontSizes } from './font-size';
import { fontStyles } from './font-style';
import { fontWeights } from './font-weight';
import { fontVariants } from './font-variant';
import { letterSpacing } from './letter-spacing';
import { textAlign } from './text-align';
import { textAlignVertical } from './text-align-vertical';
import { textDecorationStyle } from './text-decoration-style';

export type TypographyClass =
  | keyof typeof fontSizes
  | keyof typeof fontStyles
  | keyof typeof fontWeights
  | keyof typeof fontVariants
  | keyof typeof letterSpacing
  | keyof typeof textAlignVertical
  | keyof typeof textDecorationStyle
  | keyof typeof textAlign;

export type TypographyStyle = typeof fontSizes &
  typeof fontStyles &
  typeof fontWeights &
  typeof fontVariants &
  typeof textAlign &
  typeof textAlignVertical &
  typeof textDecorationStyle &
  typeof letterSpacing;

export const buildTypography = (): TypographyStyle => {
  return {
    ...fontSizes,
    ...fontStyles,
    ...fontWeights,
    ...fontVariants,
    ...letterSpacing,
    ...textAlign,
    ...textAlignVertical,
    ...textDecorationStyle,
  } as const;
};
