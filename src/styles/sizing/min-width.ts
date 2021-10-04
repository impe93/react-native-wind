import { defualtSizes, sizes } from './sizes';

export type MinWidthStyle = {
  [key in MinWidthClass]: {
    minWidth: string | number;
  };
};

export type MinWidthClass = `min-w-${keyof typeof defualtSizes}`;

export const buildMinWidths = (): MinWidthStyle => {
  const minWidths: MinWidthStyle = {} as MinWidthStyle;
  Object.keys(sizes).forEach((s) => {
    minWidths[`min-w-${s}`] = {
      minWidth: sizes[s],
    };
  });
  return minWidths;
};
