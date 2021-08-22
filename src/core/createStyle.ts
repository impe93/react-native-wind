import { StyleProp, StyleSheet } from 'react-native';
import { mainStyles } from './mainStyles';
import { StyleClass, Styles } from '../types';

export const s = (...classes: StyleClass[]): StyleProp<any> => {
  const flattenClasses = classes.reduce<Styles[]>(
    (pv, cv) => [...pv, mainStyles[cv]] as Styles[],
    [],
  );
  return StyleSheet.flatten(flattenClasses);
};
