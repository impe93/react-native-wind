import { defualtSizes, sizes } from './sizes';

export type WidthStyle = {
  [key in WidthClass]: {
    width: string | number;
  };
};

export type WidthClass = `w-${keyof typeof defualtSizes}`;

export const buildWidths = (): WidthStyle => {
  const widths: WidthStyle = {} as WidthStyle;
  Object.keys(sizes).forEach((s) => {
    widths[`w-${s}`] = {
      width: sizes[s],
    };
  });
  return widths;
};
