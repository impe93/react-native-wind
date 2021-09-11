import { StyleProp, StyleSheet } from 'react-native';
import { mainStyles } from './mainStyles';
import { Styles } from '../types';

export const s = (classes: string): StyleProp<any> => {
  const flattenClasses = classes.split(' ').reduce<Styles[]>(
    (pv, cv) => [...pv, mainStyles[cv]] as Styles[],
    [],
  );
  return StyleSheet.flatten(flattenClasses);
};
