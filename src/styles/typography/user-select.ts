/**
 * User Select Styles
 * 
 * Controls whether the user can select text and use native copy/paste.
 * Has precedence over the `selectable` prop.
 * 
 * Classes:
 * - select-auto
 * - select-text (allows text selection)
 * - select-none (prevents selection - default)
 * - select-contain
 * - select-all
 */

export const userSelect = {
  'select-auto': {
    userSelect: 'auto',
  },
  'select-text': {
    userSelect: 'text',
  },
  'select-none': {
    userSelect: 'none',
  },
  'select-contain': {
    userSelect: 'contain',
  },
  'select-all': {
    userSelect: 'all',
  },
} as const;

