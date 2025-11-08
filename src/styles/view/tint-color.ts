import { colorStyleBuilder } from '../../helpers/color-style-builder';

export type TintColorClass = `tint-${string}-${string}` | `tint-${string}`;
export type TintColorStyles = {
  [key: string]: { tintColor: string };
};

export const buildTintColorStyles = (): TintColorStyles => {
  let tintColorStyles: TintColorStyles = {};
  tintColorStyles = colorStyleBuilder(
    'tint',
    'tintColor',
  ) as TintColorStyles;

  return tintColorStyles;
};

