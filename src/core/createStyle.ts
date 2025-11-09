import { StyleProp, StyleSheet } from 'react-native';
import { mainStyles } from './mainStyles';
import { StyleValue } from '../types';
import { parseArbitraryValue } from './arbitraryParser';

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
    .reduce<StyleValue[]>((pv, cv) => {
      // Try to parse as arbitrary value first, then fall back to mainStyles lookup
      const styleValue = parseArbitraryValue(cv) || mainStyles[cv];
      return styleValue ? [...pv, styleValue] as StyleValue[] : pv;
    }, []);
  return StyleSheet.flatten(flattenClasses as any);
};
