export const display = {
  flex: {
    display: 'flex',
  },
  none: {
    display: 'none',
  },
  contents: {
    display: 'contents',
  },
} as const;

export type DisplayClass = keyof typeof display;
