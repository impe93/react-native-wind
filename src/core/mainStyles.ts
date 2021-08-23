import { buildHeights } from '../styles/sizing/heights';
import { buildMargins } from '../styles/spacing/margins';
import { buildPaddings } from '../styles/spacing/paddings';
import { Styles } from '../types';

const composeStyles = (...styles: Styles[]) => {
  const composedStyles = styles.reduce((pv, cv) => ({ ...pv, ...cv }), {});
  return composedStyles;
};

export const mainStyles = composeStyles(
  buildMargins(),
  buildPaddings(),
  buildHeights(),
);
