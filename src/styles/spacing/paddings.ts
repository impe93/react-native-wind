import { Valueof } from '../../types';
import { positions } from './positions';
import { MergedSpaces, spaces } from './spaces';

type PaddingReactNativeNames =
  | 'paddingTop'
  | 'paddingBottom'
  | 'paddingLeft'
  | 'paddingRight'
  | 'paddingHorizontal'
  | 'paddingVertical'
  | 'padding';

export type PaddingStyles = {
  [key in PaddingClass]: {
    [k in PaddingReactNativeNames]?: Valueof<MergedSpaces>;
  };
};

type PaddingPositionPairType = {
  [key in typeof positions[number]]: PaddingReactNativeNames;
};

const paddingPositionsPair: PaddingPositionPairType = {
  '': 'padding',
  b: 'paddingBottom',
  t: 'paddingTop',
  l: 'paddingLeft',
  r: 'paddingRight',
  x: 'paddingHorizontal',
  y: 'paddingVertical',
};

export type PaddingClass = `p${typeof positions[number]}-${keyof typeof spaces}`;

export const buildPaddings = (): PaddingStyles => {
  const paddings: PaddingStyles = {} as PaddingStyles;
  positions.forEach((p) => {
    Object.keys(spaces).forEach((s) => {
      paddings[`p${p}-${s}`] = {
        [paddingPositionsPair[p]]: spaces[s],
      };
    });
  });
  return paddings;
};
