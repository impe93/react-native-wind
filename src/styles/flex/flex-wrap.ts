export const flexWrap = {
  'flex-wrap': {
    flexWrap: 'wrap',
  },
  'flex-nowrap': {
    flexWrap: 'nowrap',
  },
  'flex-wrap-reverse': {
    flexWrap: 'wrap-reverse',
  },
} as const;

export type FlexWrapClass = keyof typeof flexWrap;
