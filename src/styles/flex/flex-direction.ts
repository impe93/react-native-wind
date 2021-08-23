export const flexDirections = {
  'flex-row': {
    flexDirection: 'row',
  },
  'flex-row-reverse': {
    flexDirection: 'row-reverse',
  },
  'flex-col': {
    flexDirection: 'column',
  },
  'flex-col-reverse': {
    flexDirection: 'column-reverse',
  },
} as const;

export type FlexDirectionsClass = keyof typeof flexDirections;
