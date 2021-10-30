import { buildBackgroundColorStyles } from './background-color';
import {
  BorderRadiusClass,
  BorderRadiusStyles,
  buildBorderRadiusStyles,
} from './border-radius';
import { borderStyles } from './border-style';
import { borderWidths } from './border-width';

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
    ...borderWidths,
    ...borderStyles,
  } as const;
};
