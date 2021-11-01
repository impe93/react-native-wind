import { CustomConfig } from '../types';
import { composeStyles } from './mainStyles';

export let customStylesDefined: CustomConfig | undefined;

export const customize = (customStyles: CustomConfig): void => {
  customStylesDefined = customStyles;
  composeStyles();
};
