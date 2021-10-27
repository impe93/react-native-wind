import { colorStyleBuilder } from '../../helpers/color-style-builder';

export type TextColorClass = `text-${string}-${string}` | `text-${string}`;
export type TextColorStyles = {
  [key: TextColorClass]: { color: string };
};

export const buildTextColorStyles = (): TextColorStyles => {
  let textColorsStyle: TextColorStyles = {};
  textColorsStyle = colorStyleBuilder('text', 'color') as TextColorStyles;
  return textColorsStyle;
};
