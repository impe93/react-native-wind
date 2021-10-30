import { Valueof } from '../../types';

type BorderRadiusReactNativeNames =
  | 'borderRadius'
  | 'borderTopEndRadius'
  | 'borderTopLeftRadius'
  | 'borderTopRightRadius'
  | 'borderTopStartRadius'
  | 'borderBottomEndRadius'
  | 'borderBottomLeftRadius'
  | 'borderBottomRightRadius'
  | 'borderBottomStartRadius';

type BorderRadiusPositionPairType = {
  [key in typeof borderRadiusPositions[number]]: BorderRadiusReactNativeNames;
};

export type BorderRadiusClass =
  `rounded${typeof borderRadiusPositions[number]}${keyof typeof radiusDimension}`;

export type BorderRadiusStyles = {
  [key in BorderRadiusClass]: {
    [k in BorderRadiusReactNativeNames]?: Valueof<typeof radiusDimension>;
  };
};

export const radiusDimension = {
  '-none': 0,
  '-sm': 2,
  '': 4,
  '-md': 6,
  '-lg': 8,
  '-xl': 12,
  '-2xl': 16,
  '-3xl': 24,
  '-full': 9999,
} as const;

export const borderRadiusPositions = [
  '',
  '-te',
  '-tl',
  '-tr',
  '-ts',
  '-be',
  '-bl',
  '-br',
  '-bs',
] as const;

const borderRadiusPositionsPair: BorderRadiusPositionPairType = {
  '': 'borderRadius',
  '-be': 'borderBottomEndRadius',
  '-br': 'borderBottomRightRadius',
  '-bl': 'borderBottomLeftRadius',
  '-bs': 'borderBottomStartRadius',
  '-te': 'borderTopEndRadius',
  '-tr': 'borderTopRightRadius',
  '-tl': 'borderTopLeftRadius',
  '-ts': 'borderTopStartRadius',
} as const;

export const buildBorderRadiusStyles = (): BorderRadiusStyles => {
  const styles = {} as BorderRadiusStyles;

  borderRadiusPositions.forEach((p) => {
    Object.keys(radiusDimension).forEach((dk) => {
      styles[`rounded${p}${dk}`] = {
        [borderRadiusPositionsPair[p]]: radiusDimension[dk],
      };
    });
  });

  return styles;
};
