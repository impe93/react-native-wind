export const overflow = {
  'overflow-visible': {
    overflow: 'visible',
  },
  'overflow-hidden': {
    overflow: 'hidden',
  },
} as const;

export type OverflowClass = keyof typeof overflow;
