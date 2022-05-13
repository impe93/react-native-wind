import { defualtSizes, sizes } from './sizes';

export type MaxHeightStyle = {
  [key in MaxHeightClass]: {
    maxHeight: string | number;
  };
};

export type MaxHeightClass = `max-h-${keyof typeof defualtSizes}`;

export const buildMaxHeights = (): MaxHeightStyle => {
  const maxHeight: MaxHeightStyle = {} as MaxHeightStyle;
  Object.keys(sizes).forEach((s) => {
    maxHeight[`max-h-${s}`] = {
      maxHeight: sizes[s],
    };
  });
  return maxHeight;
};
