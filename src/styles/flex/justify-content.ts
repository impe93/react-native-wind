export const justifyContent = {
  'justify-start': {
    justifyContent: 'flex-start',
  },
  'justify-end': {
    justifyContent: 'flex-end',
  },
  'justify-center': {
    justifyContent: 'center',
  },
  'justify-between': {
    justifyContent: 'space-between',
  },
  'justify-around': {
    justifyContent: 'space-around',
  },
  'justify-evenly': {
    justifyContent: 'space-evenly',
  },
} as const;

export type JustifyContentClass = keyof typeof justifyContent;
