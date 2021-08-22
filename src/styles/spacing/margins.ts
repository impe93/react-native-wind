import { Valueof } from '../../types';
import { positions } from './positions';
import { MergedSpaces, spaces } from './spaces';

type MarginReactNativeNames =
  | 'marginTop'
  | 'marginBottom'
  | 'marginLeft'
  | 'marginRight'
  | 'marginHorizontal'
  | 'marginVertical'
  | 'margin';

export type MarginStyles = {
  [key in MarginClass]: {
    [k in MarginReactNativeNames]?: Valueof<MergedSpaces>;
  };
};

type MarginPositionPairType = {
  [key in typeof positions[number]]: MarginReactNativeNames;
};

const marginPositionsPair: MarginPositionPairType = {
  '': 'margin',
  b: 'marginBottom',
  t: 'marginTop',
  l: 'marginLeft',
  r: 'marginRight',
  x: 'marginHorizontal',
  y: 'marginVertical',
};

export type MarginClass = `m${typeof positions[number]}-${keyof typeof spaces}`;

export const buildMargins = (): MarginStyles => {
  const margins: MarginStyles = {} as MarginStyles;
  positions.forEach((p) => {
    Object.keys(spaces).forEach((s) => {
      margins[`m${p}-${s}`] = {
        [marginPositionsPair[p]]: spaces[s],
      };
    });
  });
  return margins;
};
