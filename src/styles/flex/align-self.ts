export const alignSelf = {
  'self-center': {
    alignSelf: 'center',
  },
  'self-start': {
    alignSelf: 'flex-start',
  },
  'self-end': {
    alignSelf: 'flex-end',
  },
  'self-baseline': {
    alignSelf: 'baseline',
  },
  'self-stretch': {
    alignSelf: 'stretch',
  },
  'self-auto': {
    alignSelf: 'auto',
  },
} as const;

export type AlignSelfClass = keyof typeof alignSelf;
