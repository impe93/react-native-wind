import { StyleSheet } from 'react-native';
import { mainStyles } from './mainStyles';
import { Styles, StyleKeys } from '../types';

export const s = (...classes: StyleKeys[]): Styles => {
  const flattenClasses = classes.reduce<Styles[]>((pv, cv) => [...pv, mainStyles[cv]], []);
  return StyleSheet.flatten(flattenClasses)
};
