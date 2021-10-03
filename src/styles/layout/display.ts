export const display = {
  flex: {
    display: 'flex',
  },
  none: {
    display: 'none',
  },
} as const;

export type DisplayClass = keyof typeof display;
