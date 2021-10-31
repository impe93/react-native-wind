import { colorStyleBuilder } from '../../helpers/color-style-builder';

type BorderColorReactNativeNames =
  | 'borderColor'
  | 'borderEndColor'
  | 'borderStartColor'
  | 'borderRightColor'
  | 'borderLeftColor'
  | 'borderTopColor'
  | 'borderBottomColor';

type BorderColorPositionPairType = {
  [key in typeof borderColorPositions[number]]: BorderColorReactNativeNames;
};

export const borderColorPositions = [
  '',
  '-e',
  '-s',
  '-l',
  '-r',
  '-t',
  '-b',
] as const;

const borderColorPositionsPair: BorderColorPositionPairType = {
  '': 'borderColor',
  '-e': 'borderEndColor',
  '-s': 'borderStartColor',
  '-r': 'borderRightColor',
  '-l': 'borderLeftColor',
  '-b': 'borderBottomColor',
  '-t': 'borderTopColor',
} as const;

export type BorderColorStyles = {
  [key: string]:
    | { borderColor: string }
    | { borderTopColor: string }
    | { borderBottomColor: string }
    | { borderLeftColor: string }
    | { borderRightColor: string }
    | { borderEndColor: string }
    | { borderStartColor: string };
};

export const buildBorderColorStyles = (): BorderColorStyles => {
  let borderColorStyles = {} as BorderColorStyles;

  borderColorPositions.forEach((p) => {
    const borderColors = colorStyleBuilder(
      `border${p}`,
      borderColorPositionsPair[p],
    );
    borderColorStyles = {
      ...borderColorStyles,
      ...borderColors,
    } as BorderColorStyles;
  });

  return borderColorStyles;
};
