export const boxSizing = {
  'box-border': {
    boxSizing: 'border-box',
  },
  'box-content': {
    boxSizing: 'content-box',
  },
} as const;

export type BoxSizingClass = keyof typeof boxSizing;

