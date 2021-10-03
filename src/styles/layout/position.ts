export const position = {
  'relative': {
    position: 'relative',
  },
  'absolute': {
    position: 'absolute',
  }
} as const;

export type PositionClass = keyof typeof position;
