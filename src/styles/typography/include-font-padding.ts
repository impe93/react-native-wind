/**
 * Include Font Padding Styles
 * 
 * Controls whether to include extra font padding intended to make space 
 * for certain ascenders / descenders.
 * Platform: Android only
 * 
 * Classes:
 * - font-padding (includes extra padding - default)
 * - no-font-padding (removes extra padding for better vertical centering)
 */

export const includeFontPadding = {
  'font-padding': {
    includeFontPadding: true,
  },
  'no-font-padding': {
    includeFontPadding: false,
  },
} as const;

