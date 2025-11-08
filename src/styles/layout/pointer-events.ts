/**
 * Pointer Events
 * Controls whether the View can be the target of touch events.
 *
 * @see https://reactnative.dev/docs/view-style-props#pointerevents
 */

export const pointerEvents = {
  'pointer-events-auto': {
    pointerEvents: 'auto',
  },
  'pointer-events-none': {
    pointerEvents: 'none',
  },
  'pointer-events-box-none': {
    pointerEvents: 'box-none',
  },
  'pointer-events-box-only': {
    pointerEvents: 'box-only',
  },
} as const;

export type PointerEventsClass = keyof typeof pointerEvents;

