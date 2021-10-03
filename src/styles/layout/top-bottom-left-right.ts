import { Valueof } from '../../types';

const sides = ['top', 'bottom', 'left', 'right'] as const;
const lengths = {
  0: 0,
  0.25: 1,
  0.5: 2,
  1: 4,
  1.5: 6,
  2: 8,
  2.5: 10,
  3: 12,
  3.5: 14,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  11: 44,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
  28: 112,
  32: 128,
  36: 144,
  40: 160,
  44: 176,
  48: 192,
  52: 208,
  56: 224,
  60: 240,
  64: 256,
  72: 288,
  80: 320,
  96: 384,
  '1/2': '50%',
  '1/3': '33.333333%',
  '2/3': '66,666667%',
  '1/4': '25%',
  '2/4': '50%',
  '3/4': '75%',
  '1/5': '20%',
  '2/5': '40%',
  '3/5': '60%',
  '4/5': '80%',
  '1/6': '16.666667%',
  '2/6': '33.333333%',
  '3/6': '50%',
  '4/6': '66,666667%',
  '5/6': '83.333333%',
  '1/12': '8.333333%',
  '2/12': '16.666667%',
  '3/12': '25%',
  '4/12': '33.333333%',
  '5/12': '41.666667%',
  '6/12': '50%',
  '7/12': '58.333333%',
  '8/12': '66.666667%',
  '9/12': '75%',
  '10/12': '83.333333%',
  '11/12': '91.666667%',
  full: '100%',
} as const;
const modes = {
  positive: '',
  negative: '-',
} as const;

export type TopBottomLeftRightStyle = {
  [key in TopBottomLeftRightClass]: {
    top?: string | number;
    bottom?: string | number;
    left?: string | number;
    right?: string | number;
  };
};

export type TopBottomLeftRightClass = `${Valueof<
  typeof modes
>}${typeof sides[number]}-${keyof typeof lengths}`;

export const buildTopBottomLeftRight = (): TopBottomLeftRightStyle => {
  const topBottomLeftRight = {} as TopBottomLeftRightStyle;
  sides.forEach((s) => {
    Object.keys(lengths).forEach((l) => {
      Object.keys(modes).forEach((m) => {
        const key = `${String(modes[m])}${s}-${l}`;
        if (typeof lengths[l] === 'number') {
          topBottomLeftRight[key] = {
            [s]: Number(String(modes[m]) + String(lengths[l])),
          };
        } else {
          topBottomLeftRight[key] = {
            [s]: String(modes[m]) + String(lengths[l]),
          };
        }
      });
    });
  });
  return topBottomLeftRight;
};
