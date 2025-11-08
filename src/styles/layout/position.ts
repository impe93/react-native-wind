export const position = {
  'relative': {
    position: 'relative',
  },
  'absolute': {
    position: 'absolute',
  },
  'static': {
    position: 'static',
  },
} as const;

export type PositionClass = keyof typeof position;
