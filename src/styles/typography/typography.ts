import { fontSizes } from './font-size';
import { fontStyles } from './font-style';
import { fontWeights } from './font-weight';
import { fontVariants } from './font-variant';
import { letterSpacing } from './letter-spacing';
import { textAlign } from './text-align';
import { textAlignVertical } from './text-align-vertical';
import { textDecorationStyle } from './text-decoration-style';
import { textDecorationLine } from './text-decoration-line';
import { textTransform } from './text-transform';
import { buildTextColorStyles } from './text-color';

export type TypographyClass =
  | keyof typeof fontSizes
  | keyof typeof fontStyles
  | keyof typeof fontWeights
  | keyof typeof fontVariants
  | keyof typeof letterSpacing
  | keyof typeof textAlignVertical
  | keyof typeof textDecorationStyle
  | keyof typeof textDecorationLine
  | keyof typeof textTransform
  | keyof typeof textAlign;

export type TypographyStyle = typeof fontSizes &
  typeof fontStyles &
  typeof fontWeights &
  typeof fontVariants &
  typeof textAlign &
  typeof textAlignVertical &
  typeof textDecorationStyle &
  typeof textDecorationLine &
  typeof textTransform &
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
    ...textDecorationLine,
    ...textTransform,
    ...buildTextColorStyles(),
  } as const;
};
