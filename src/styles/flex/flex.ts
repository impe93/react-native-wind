export const flex = {
  'flex-1': {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '0%',
  },
  'flex-auto': {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
  },
  'flex-initial': {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 'auto',
  },
  'flex-none': {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 'auto',
  },
} as const;
