/**
 * Utility functions for generating deterministic hash IDs
 */

import * as crypto from 'crypto';

/**
 * Generates a deterministic hash ID for a class string
 * Uses MD5 for speed (security not needed here)
 *
 * @param input - The string to hash (e.g., "flex items-center p-4")
 * @returns 8-character hexadecimal hash
 */
export function generateStyleId(input: string): string {
  return crypto
    .createHash('md5')
    .update(input)
    .digest('hex')
    .substring(0, 8);
}

/**
 * Generates a cache ID for partial templates based on static parts
 *
 * @param staticParts - Array of static template strings
 * @returns Deterministic hash for the pattern
 */
export function generateCacheId(staticParts: string[]): string {
  const pattern = staticParts.join('{|}');
  return generateStyleId(pattern);
}

/**
 * Creates a stable key for storing in the style registry
 * Normalizes whitespace and sorts classes for consistency
 *
 * @param classString - The class string (e.g., "m-4  p-2   flex")
 * @returns Normalized key (e.g., "flex_m-4_p-2")
 */
export function normalizeClassKey(classString: string): string {
  return classString
    .trim()
    .replace(/\s+/g, ' ')
    .split(' ')
    .sort()
    .join('_');
}
