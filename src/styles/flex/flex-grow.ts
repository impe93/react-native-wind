export const flexGrow = {
  'flex-grow-0': {
    flexGrow: 0,
  },
  'flex-grow': {
    flexGrow: 1,
  },
} as const;

export type FlexGrowClass = keyof typeof flexGrow;
