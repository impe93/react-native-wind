export const backfaceVisibility = {
  'backface-visible': {
    backfaceVisibility: 'visible',
  },
  'backface-hidden': {
    backfaceVisibility: 'hidden',
  },
} as const;

export type BackfaceVisibilityClass = keyof typeof backfaceVisibility;

