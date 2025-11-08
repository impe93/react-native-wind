import { StyleProp, StyleSheet } from 'react-native';
import { mainStyles } from './mainStyles';
import { StyleValue } from '../types';

export const s = (
  classes: TemplateStringsArray,
  ...args: string[]
): StyleProp<any> => {
  const flattenClasses = classes
    .reduce((pv, cv, i) => {
      return `${pv}${cv}${i !== args.length ? args[i] : ''}`;
    }, '') // Merge classes list with arg list
    .replace(/\s+/g, ' ') // Remove extra spaces
    .trim()
    .split(' ')
    .reduce<StyleValue[]>((pv, cv) => [...pv, mainStyles[cv]] as StyleValue[], []);
  return StyleSheet.flatten(flattenClasses as any);
};
