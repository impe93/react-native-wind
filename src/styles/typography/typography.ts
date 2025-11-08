import { buildFontSizes, FontSizeClass, FontSizeStyle } from './font-size';
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
import { buildFontFamilyStyles, FontFamilyClass } from './font-family';
import { includeFontPadding } from './include-font-padding';
import {
  buildTextDecorationColorStyles,
  TextDecorationColorClass,
} from './text-decoration-color';
import {
  buildTextShadowColorStyles,
  TextShadowColorClass,
} from './text-shadow-color';
import {
  buildTextShadowOffsetStyles,
  TextShadowOffsetXClass,
  TextShadowOffsetYClass,
} from './text-shadow-offset';
import {
  buildTextShadowRadiusStyles,
  TextShadowRadiusClass,
} from './text-shadow-radius';
import { verticalAlign } from './vertical-align';
import { writingDirection } from './writing-direction';
import { userSelect } from './user-select';
import { buildLineHeightStyles, LineHeightClass } from './line-height';

export type TypographyClass =
  | FontSizeClass
  | FontFamilyClass
  | LineHeightClass
  | TextDecorationColorClass
  | TextShadowColorClass
  | TextShadowOffsetXClass
  | TextShadowOffsetYClass
  | TextShadowRadiusClass
  | keyof typeof fontStyles
  | keyof typeof fontWeights
  | keyof typeof fontVariants
  | keyof typeof letterSpacing
  | keyof typeof textAlign
  | keyof typeof textAlignVertical
  | keyof typeof textDecorationStyle
  | keyof typeof textDecorationLine
  | keyof typeof textTransform
  | keyof typeof includeFontPadding
  | keyof typeof verticalAlign
  | keyof typeof writingDirection
  | keyof typeof userSelect;

export type TypographyStyle = FontSizeStyle &
  typeof fontStyles &
  typeof fontWeights &
  typeof fontVariants &
  typeof textAlign &
  typeof textAlignVertical &
  typeof textDecorationStyle &
  typeof textDecorationLine &
  typeof textTransform &
  typeof letterSpacing &
  typeof includeFontPadding &
  typeof verticalAlign &
  typeof writingDirection &
  typeof userSelect;

export const buildTypography = (): TypographyStyle => {
  return {
    ...fontStyles,
    ...fontWeights,
    ...fontVariants,
    ...letterSpacing,
    ...textAlign,
    ...textAlignVertical,
    ...textDecorationStyle,
    ...textDecorationLine,
    ...textTransform,
    ...includeFontPadding,
    ...verticalAlign,
    ...writingDirection,
    ...userSelect,
    ...buildFontSizes(),
    ...buildTextColorStyles(),
    ...buildFontFamilyStyles(),
    ...buildTextDecorationColorStyles(),
    ...buildTextShadowColorStyles(),
    ...buildTextShadowOffsetStyles(),
    ...buildTextShadowRadiusStyles(),
    ...buildLineHeightStyles(),
  } as const;
};
