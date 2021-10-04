import { defualtSizes, sizes } from './sizes';

export type MaxWidthStyle = {
  [key in MaxWidthClass]: {
    maxWidth: string | number;
  };
};

export type MaxWidthClass = `max-w-${keyof typeof defualtSizes}`;

export const buildMaxWidths = (): MaxWidthStyle => {
  const maxWidths: MaxWidthStyle = {} as MaxWidthStyle;
  Object.keys(sizes).forEach((s) => {
    maxWidths[`max-w-${s}`] = {
      maxWidths: sizes[s],
    };
  });
  return maxWidths;
};
