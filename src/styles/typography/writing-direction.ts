/**
 * Writing Direction Styles
 * 
 * Controls the text writing direction (left-to-right, right-to-left).
 * Platform: iOS only
 * 
 * Classes:
 * - writing-auto (default - system determines direction)
 * - writing-ltr (left-to-right)
 * - writing-rtl (right-to-left)
 */

export const writingDirection = {
  'writing-auto': {
    writingDirection: 'auto',
  },
  'writing-ltr': {
    writingDirection: 'ltr',
  },
  'writing-rtl': {
    writingDirection: 'rtl',
  },
} as const;

