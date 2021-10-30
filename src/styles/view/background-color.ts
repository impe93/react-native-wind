import { colorStyleBuilder } from '../../helpers/color-style-builder';

export type BackgroundColorClass = `bg-${string}-${string}` | `bg-${string}`;
export type BackgroundColorStyles = {
  [key: string]: { backgroundColor: string };
};

export const buildBackgroundColorStyles = (): BackgroundColorStyles => {
  let backgroundColorsStyle: BackgroundColorStyles = {};
  backgroundColorsStyle = colorStyleBuilder(
    'bg',
    'backgroundColor',
  ) as BackgroundColorStyles;

  return backgroundColorsStyle;
};
