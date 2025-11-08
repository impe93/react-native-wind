import { colorStyleBuilder } from '../../helpers/color-style-builder';

type BorderColorReactNativeNames =
  | 'borderColor'
  | 'borderEndColor'
  | 'borderStartColor'
  | 'borderRightColor'
  | 'borderLeftColor'
  | 'borderTopColor'
  | 'borderBottomColor'
  | 'borderBlockColor'
  | 'borderBlockEndColor'
  | 'borderBlockStartColor';

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
  '-block',
  '-block-e',
  '-block-s',
] as const;

const borderColorPositionsPair: BorderColorPositionPairType = {
  '': 'borderColor',
  '-e': 'borderEndColor',
  '-s': 'borderStartColor',
  '-r': 'borderRightColor',
  '-l': 'borderLeftColor',
  '-b': 'borderBottomColor',
  '-t': 'borderTopColor',
  '-block': 'borderBlockColor',
  '-block-e': 'borderBlockEndColor',
  '-block-s': 'borderBlockStartColor',
} as const;

export type BorderColorStyles = {
  [key: string]:
    | { borderColor: string }
    | { borderTopColor: string }
    | { borderBottomColor: string }
    | { borderLeftColor: string }
    | { borderRightColor: string }
    | { borderEndColor: string }
    | { borderStartColor: string }
    | { borderBlockColor: string }
    | { borderBlockEndColor: string }
    | { borderBlockStartColor: string };
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
