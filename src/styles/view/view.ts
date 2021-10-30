import { buildBackgroundColorStyles } from './background-color';
import {
  BorderRadiusClass,
  BorderRadiusStyles,
  buildBorderRadiusStyles,
} from './border-radius';
import { borderWidths } from './border-width';

export type ViewClaesses = BorderRadiusClass | keyof typeof borderWidths;

export type ViewStyle = BorderRadiusStyles & typeof borderWidths;

export const buildView = (): ViewStyle => {
  return {
    ...buildBackgroundColorStyles(),
    ...buildBorderRadiusStyles(),
    ...borderWidths,
  } as const;
};
