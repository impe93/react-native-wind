export const objectFit = {
  'object-cover': {
    objectFit: 'cover',
  },
  'object-contain': {
    objectFit: 'contain',
  },
  'object-fill': {
    objectFit: 'fill',
  },
  'object-scale-down': {
    objectFit: 'scale-down',
  },
} as const;

export type ObjectFitClass = keyof typeof objectFit;

