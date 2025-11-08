import { colorStyleBuilder } from '../../helpers/color-style-builder';

export type OverlayColorClass = `overlay-${string}-${string}` | `overlay-${string}`;
export type OverlayColorStyles = {
  [key: string]: { overlayColor: string };
};

export const buildOverlayColorStyles = (): OverlayColorStyles => {
  let overlayColorStyles: OverlayColorStyles = {};
  overlayColorStyles = colorStyleBuilder(
    'overlay',
    'overlayColor',
  ) as OverlayColorStyles;

  return overlayColorStyles;
};

