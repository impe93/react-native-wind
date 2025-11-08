/**
 * Line Height Styles
 * 
 * Controls the vertical spacing between lines of text.
 * Standalone line height utilities independent of fontSize.
 * 
 * Following TailwindCSS naming convention with 'leading-' prefix.
 * 
 * Classes:
 * - leading-none (1)
 * - leading-tight (1.25)
 * - leading-snug (1.375)
 * - leading-normal (1.5)
 * - leading-relaxed (1.625)
 * - leading-loose (2)
 * - leading-{number} (numeric values using spacing scale)
 * 
 * Examples: leading-normal, leading-4, leading-8
 */

import { spaces } from '../spacing/spaces';

// Relative line height values (multipliers)
export const relativeLineHeights = {
  'leading-none': {
    lineHeight: 1,
  },
  'leading-tight': {
    lineHeight: 1.25,
  },
  'leading-snug': {
    lineHeight: 1.375,
  },
  'leading-normal': {
    lineHeight: 1.5,
  },
  'leading-relaxed': {
    lineHeight: 1.625,
  },
  'leading-loose': {
    lineHeight: 2,
  },
} as const;

export type RelativeLineHeightClass = keyof typeof relativeLineHeights;

export type LineHeightClass = 
  | RelativeLineHeightClass
  | `leading-${keyof typeof spaces}`;

export type LineHeightStyles = typeof relativeLineHeights & {
  [key: string]: { lineHeight: number };
};

export const buildLineHeightStyles = (): LineHeightStyles => {
  const styles: LineHeightStyles = { ...relativeLineHeights } as LineHeightStyles;

  // Add numeric line heights from spacing scale
  Object.keys(spaces).forEach((key) => {
    styles[`leading-${key}`] = {
      lineHeight: spaces[key],
    };
  });

  return styles;
};

