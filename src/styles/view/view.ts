import { buildBackgroundColorStyles } from './background-color';
import { buildBorderColorStyles } from './border-color';
import {
  BorderRadiusClass,
  BorderRadiusStyles,
  buildBorderRadiusStyles,
} from './border-radius';
import { borderStyles } from './border-style';
import { borderWidths } from './border-width';
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

export type ViewClaesses =
  | BorderRadiusClass
  | keyof typeof borderWidths
  | keyof typeof borderStyles
  | ElevationClass
  | ShadowColorClass
  | ShadowOffsetXClass
  | ShadowOffsetYClass
  | ShadowOpacityClass
  | ShadowRadiusClass;

export type ViewStyle = BorderRadiusStyles &
  typeof borderWidths &
  typeof borderStyles &
  ElevationStyles &
  ShadowOpacityStyles &
  ShadowRadiusStyles;

export const buildView = (): ViewStyle => {
  return {
    ...buildBackgroundColorStyles(),
    ...buildBorderRadiusStyles(),
    ...buildBorderColorStyles(),
    ...borderWidths,
    ...borderStyles,
    ...buildTintColorStyles(),
    ...buildOverlayColorStyles(),
    ...buildElevationStyles(),
    ...buildShadowColorStyles(),
    ...buildShadowOffsetStyles(),
    ...buildShadowOpacityStyles(),
    ...buildShadowRadiusStyles(),
  } as const;
};
