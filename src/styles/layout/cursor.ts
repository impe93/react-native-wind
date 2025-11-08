/**
 * Cursor (iOS 17+)
 * Enables hover effects when a pointer (trackpad, stylus, or gaze on visionOS) is over the view.
 *
 * Platform: iOS 17+ only
 * @see https://reactnative.dev/docs/view-style-props#cursor
 */

export const cursor = {
  'cursor-auto': {
    cursor: 'auto',
  },
  'cursor-pointer': {
    cursor: 'pointer',
  },
} as const;

export type CursorClass = keyof typeof cursor;

