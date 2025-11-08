import { buildBackgroundColorStyles } from './background-color';
import { buildBorderColorStyles } from './border-color';
import {
  BorderRadiusClass,
  BorderRadiusStyles,
  buildBorderRadiusStyles,
} from './border-radius';
import { borderStyles } from './border-style';
import { borderWidths } from './border-width';
import { borderCurve, BorderCurveClass } from './border-curve';
import { buildOverlayColorStyles } from './overlay-color';
import { buildTintColorStyles } from './tint-color';
import {
  ElevationClass,
  ElevationStyles,
  buildElevationStyles,
} from './elevation';
import {
  ShadowColorClass,
  buildShadowColorStyles,
} from './shadow-color';
import {
  ShadowOffsetXClass,
  ShadowOffsetYClass,
  buildShadowOffsetStyles,
} from './shadow-offset';
import {
  ShadowOpacityClass,
  ShadowOpacityStyles,
  buildShadowOpacityStyles,
} from './shadow-opacity';
import {
  ShadowRadiusClass,
  ShadowRadiusStyles,
  buildShadowRadiusStyles,
} from './shadow-radius';
import { boxShadow, BoxShadowClass } from './box-shadow';
import { buildOutlineColorStyles } from './outline-color';
import { outlineStyle, OutlineStyleClass } from './outline-style';
import { outlineWidth, OutlineWidthClass } from './outline-width';
import { outlineOffset, OutlineOffsetClass } from './outline-offset';
import { FilterClass, FilterStyles, buildFilterStyles } from './filter';

export type ViewClaesses =
  | BorderRadiusClass
  | keyof typeof borderWidths
  | keyof typeof borderStyles
  | BorderCurveClass
  | ElevationClass
  | ShadowColorClass
  | ShadowOffsetXClass
  | ShadowOffsetYClass
  | ShadowOpacityClass
  | ShadowRadiusClass
  | BoxShadowClass
  | OutlineStyleClass
  | OutlineWidthClass
  | OutlineOffsetClass
  | FilterClass;

export type ViewStyle = BorderRadiusStyles &
  typeof borderWidths &
  typeof borderStyles &
  typeof borderCurve &
  ElevationStyles &
  ShadowOpacityStyles &
  ShadowRadiusStyles &
  typeof boxShadow &
  typeof outlineStyle &
  typeof outlineWidth &
  typeof outlineOffset &
  FilterStyles;

export const buildView = (): ViewStyle => {
  return {
    ...buildBackgroundColorStyles(),
    ...buildBorderRadiusStyles(),
    ...buildBorderColorStyles(),
    ...borderWidths,
    ...borderStyles,
    ...borderCurve,
    ...buildTintColorStyles(),
    ...buildOverlayColorStyles(),
    ...buildElevationStyles(),
    ...buildShadowColorStyles(),
    ...buildShadowOffsetStyles(),
    ...buildShadowOpacityStyles(),
    ...buildShadowRadiusStyles(),
    ...boxShadow,
    ...buildOutlineColorStyles(),
    ...outlineStyle,
    ...outlineWidth,
    ...outlineOffset,
    ...buildFilterStyles(),
  } as const;
};
