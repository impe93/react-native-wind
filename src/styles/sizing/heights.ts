import { defualtSizes, sizes } from './sizes';

export type HeightStyle = {
  [key in HeightClass]: {
    height: string | number;
  };
};

export type HeightClass = `h-${keyof typeof defualtSizes}`;

export const buildHeights = (): HeightStyle => {
  const heights: HeightStyle = {} as HeightStyle;
  Object.keys(sizes).forEach((s) => {
    heights[`h-${s}`] = {
      height: sizes[s],
    };
  });
  return heights;
};
