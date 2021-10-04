import { defualtSizes, sizes } from './sizes';

export type MinHeightStyle = {
  [key in MinHeightClass]: {
    minHeight: string | number;
  };
};

export type MinHeightClass = `min-h-${keyof typeof defualtSizes}`;

export const buildMinHeights = (): MinHeightStyle => {
  const minHeight: MinHeightStyle = {} as MinHeightStyle;
  Object.keys(sizes).forEach((s) => {
    minHeight[`min-h-${s}`] = {
      minHeight: sizes[s],
    };
  });
  return minHeight;
};
