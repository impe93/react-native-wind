import { buildBackgroundColorStyles } from './background-color';
import { BorderRadiusStyles, buildBorderRadiusStyles } from './border-radius';

export type ViewStyle = BorderRadiusStyles;

export const buildView = (): ViewStyle => {
  return {
    ...buildBackgroundColorStyles(),
    ...buildBorderRadiusStyles(),
  } as const;
};
