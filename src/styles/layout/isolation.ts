export const isolation = {
  'isolate': {
    isolation: 'isolate',
  },
  'isolation-auto': {
    isolation: 'auto',
  },
} as const;

export type IsolationClass = keyof typeof isolation;

