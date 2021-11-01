import { buildFlex } from '../styles/flex/flex-style';
import { buildLayout } from '../styles/layout/layout';
import { buildHeights } from '../styles/sizing/heights';
import { buildMaxHeights } from '../styles/sizing/max-height';
import { buildMaxWidths } from '../styles/sizing/max-width';
import { buildMinHeights } from '../styles/sizing/min-height';
import { buildMinWidths } from '../styles/sizing/min-width';
import { mergeSizes } from '../styles/sizing/sizes';
import { buildWidths } from '../styles/sizing/widths';
import { buildMargins } from '../styles/spacing/margins';
import { buildPaddings } from '../styles/spacing/paddings';
import { mergeSpaces } from '../styles/spacing/spaces';
import { buildTypography } from '../styles/typography/typography';
import { buildView } from '../styles/view/view';
import { buildColors } from '../theme/colors';
import { Styles } from '../types';

export const composeStyles = (): void => {
  mergeSizes();
  mergeSpaces();
  buildColors();

  const styles = [
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
    buildTypography(),
    buildView(),
  ];

  mainStyles = styles.reduce((pv, cv) => ({ ...pv, ...cv }), {}) as Styles;
};

export let mainStyles: Styles;

if (!mainStyles) {
  composeStyles();
}
