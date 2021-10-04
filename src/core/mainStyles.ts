import { buildFlex } from '../styles/flex/flex-style';
import { buildLayout } from '../styles/layout/layout';
import { buildHeights } from '../styles/sizing/heights';
import { buildMaxHeights } from '../styles/sizing/max-height';
import { buildMaxWidths } from '../styles/sizing/max-width';
import { buildMinHeights } from '../styles/sizing/min-height';
import { buildMinWidths } from '../styles/sizing/min-width';
import { buildWidths } from '../styles/sizing/widths';
import { buildMargins } from '../styles/spacing/margins';
import { buildPaddings } from '../styles/spacing/paddings';
import { Styles } from '../types';

const composeStyles = (...styles: Styles[]) => {
  const composedStyles = styles.reduce((pv, cv) => ({ ...pv, ...cv }), {});
  return composedStyles;
};

export const mainStyles = composeStyles(
  buildHeights(),
  buildWidths(),
  buildLayout(),
  buildMaxHeights(),
  buildMinHeights(),
  buildMaxWidths(),
  buildMinWidths(),
  buildMargins(),
  buildPaddings(),
  buildFlex(),
);
