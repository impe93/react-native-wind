export const alignItems = {
  'items-center': {
    alignItems: 'center',
  },
  'items-start': {
    alignItems: 'flex-start',
  },
  'items-end': {
    alignItems: 'flex-end',
  },
  'items-baseline': {
    alignItems: 'baseline',
  },
  'items-stretch': {
    alignItems: 'stretch',
  },
} as const;

export type AlignItemsClass = keyof typeof alignItems;
