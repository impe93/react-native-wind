import { defualtSizes, sizes } from './sizes';

// Static predefined aspect ratios
const staticAspectRatios = {
  'aspect-auto': {
    aspectRatio: 'auto',
  },
  'aspect-square': {
    aspectRatio: 1,
  },
  'aspect-video': {
    aspectRatio: 16 / 9,
  },
} as const;

export type StaticAspectRatioClass = keyof typeof staticAspectRatios;
export type DynamicAspectRatioClass = `aspect-${keyof typeof defualtSizes}`;
export type AspectRatioClass = StaticAspectRatioClass | DynamicAspectRatioClass;

export type AspectRatioStyle = {
  [key in AspectRatioClass]: {
    aspectRatio: number | string;
  };
};

export const buildAspectRatio = (): AspectRatioStyle => {
  const aspectRatios: Partial<AspectRatioStyle> = { ...staticAspectRatios };
  
  // Generate dynamic aspect ratios from sizes scale
  Object.keys(sizes).forEach((s) => {
    const value = sizes[s];
    // For fraction strings (like '1/2', '3/4'), keep as string
    // For numeric values, use as-is
    aspectRatios[`aspect-${s}`] = {
      aspectRatio: value,
    };
  });
  
  return aspectRatios as AspectRatioStyle;
};

