import { defualtSizes, sizes } from '../sizing/sizes';

export type FlexBasisStyle = {
  [key in FlexBasisClass]: {
    flexBasis: string | number;
  };
};

export type FlexBasisClass = `basis-${keyof typeof defualtSizes}`;

export const buildFlexBasis = (): FlexBasisStyle => {
  const flexBasis: FlexBasisStyle = {} as FlexBasisStyle;
  Object.keys(sizes).forEach((s) => {
    flexBasis[`basis-${s}`] = {
      flexBasis: sizes[s],
    };
  });
  return flexBasis;
};

