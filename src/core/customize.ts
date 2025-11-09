import { CustomConfig } from '../types';
import { composeStyles } from './mainStyles';
import { clearStyleCache } from './cache';

export let customStylesDefined: CustomConfig | undefined;

export const customize = (customStyles: CustomConfig): void => {
  customStylesDefined = customStyles;
  composeStyles();
  // Clear cache after recomposing styles to ensure fresh lookups
  clearStyleCache();
};
