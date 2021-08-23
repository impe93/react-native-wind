import { CustomConfig } from '../types';

export let customStylesDefined: CustomConfig | undefined;

export const customize = (customStyles: CustomConfig): void => {
  customStylesDefined = customStyles;
};
