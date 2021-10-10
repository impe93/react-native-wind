export type CustomFontSize = {
  [x: string]: string | number;
  [x: number]: string | number;
};

export const fontSizes = {
  'text-xs': {
    fontSize: 12,
    lineHeight: 16,
  },
  'text-sm': {
    fontSize: 14,
    lineHeight: 20,
  },
  'text-base': {
    fontSize: 16,
    lineHeight: 24,
  },
  'text-lg': {
    fontSize: 18,
    lineHeight: 28,
  },
  'text-xl': {
    fontSize: 20,
    lineHeight: 28,
  },
  'text-2xl': {
    fontSize: 24,
    lineHeight: 32,
  },
  'text-3xl': {
    fontSize: 26,
    lineHeight: 36,
  },
  'text-4xl': {
    fontSize: 36,
    lineHeight: 40,
  },
  'text-5xl': {
    fontSize: 48,
  },
  'text-6xl': {
    fontSize: 60,
  },
  'text-7xl': {
    fontSize: 72,
  },
  'text-8xl': {
    fontSize: 96,
  },
  'text-9xl': {
    fontSize: 128,
  },
} as const;
