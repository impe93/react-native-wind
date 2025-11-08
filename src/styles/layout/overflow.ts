export const overflow = {
  'overflow-visible': {
    overflow: 'visible',
  },
  'overflow-hidden': {
    overflow: 'hidden',
  },
  'overflow-scroll': {
    overflow: 'scroll',
  },
} as const;

export type OverflowClass = keyof typeof overflow;
