export const direction = {
  'dir-inherit': {
    direction: 'inherit',
  },
  'dir-ltr': {
    direction: 'ltr',
  },
  'dir-rtl': {
    direction: 'rtl',
  },
} as const;

export type DirectionClass = keyof typeof direction;

