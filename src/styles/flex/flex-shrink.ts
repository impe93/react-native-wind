export const flexShrink = {
  'flex-shrink-0': {
    flexShrink: 0,
  },
  'flex-shrink': {
    flexShrink: 1,
  },
} as const;

export type FlexShrinkClass = keyof typeof flexShrink;
