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

export type ViewClaesses =
  | BorderRadiusClass
  | keyof typeof borderWidths
  | keyof typeof borderStyles;

export type ViewStyle = BorderRadiusStyles &
  typeof borderWidths &
  typeof borderStyles;

export const buildView = (): ViewStyle => {
  return {
    ...buildBackgroundColorStyles(),
    ...buildBorderRadiusStyles(),
    ...buildBorderColorStyles(),
    ...borderWidths,
    ...borderStyles,
    ...buildTintColorStyles(),
    ...buildOverlayColorStyles(),
  } as const;
};
