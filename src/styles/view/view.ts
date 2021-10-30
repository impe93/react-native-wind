import {
  BackgroundColorStyles,
  buildBackgroundColorStyles,
} from './background-color';

export type ViewStyle = BackgroundColorStyles;

export const buildView = (): ViewStyle => {
  return {
    ...buildBackgroundColorStyles,
  } as const;
};
