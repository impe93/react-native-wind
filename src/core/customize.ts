import { CustomConfig } from '../types';
import { composeStyles } from './mainStyles';
import { clearStyleCache } from './cache';

export let customStylesDefined: CustomConfig | undefined;

export const customize = (customStyles: CustomConfig): void => {
  customStylesDefined = customStyles;

  // Warn if build-time optimization is likely enabled
  if (process.env.NODE_ENV !== 'production') {
    console.warn(
      '[react-native-wind] Warning: customize() called with potential build-time optimization enabled. ' +
      'Build-time optimizations will not reflect runtime customizations. ' +
      'Consider one of the following:\n' +
      '  1. Disable the Babel plugin (remove from babel.config.js)\n' +
      '  2. Rebuild after calling customize()\n' +
      '  3. Call customize() before any styles are used\n' +
      'For more information, see: https://reactnativewind.com/docs/optimization'
    );
  }

  composeStyles();
  // Clear cache after recomposing styles to ensure fresh lookups
  clearStyleCache();

  // Clear build-time optimization cache if available
  try {
    const { clearPrecomputedCache } = require('../babel-plugin/__generated__/styles');
    const { _rnw_clearCache } = require('../babel-plugin/__generated__/runtime');
    clearPrecomputedCache();
    _rnw_clearCache();
  } catch {
    // Build-time optimization not in use, ignore
  }
};
