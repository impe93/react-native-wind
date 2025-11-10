/**
 * Style registry generator
 * Generates pre-computed style registry at build time
 */

import { StyleValue, Styles } from '../types';
import { StyleRegistryEntry } from './types';
import { generateStyleId, normalizeClassKey } from './utils/hash';

// We'll import the actual mainStyles at runtime when the plugin runs
// This allows us to generate the registry with the current style definitions
let cachedRegistry: Map<string, StyleRegistryEntry> | null = null;
let registryHash: string | null = null;

/**
 * Generates the complete style registry by importing and composing all styles
 *
 * This function runs at build time when the Babel plugin is loaded
 * It creates a comprehensive map of className → style object
 *
 * @returns Map of style registry entries
 */
export function generateRegistry(): Map<string, StyleRegistryEntry> {
  // Return cached registry if available
  if (cachedRegistry) {
    return cachedRegistry;
  }

  try {
    // Dynamic require to get mainStyles at build time
    // This works because the Babel plugin runs in Node.js environment
    const { mainStyles } = require('../core/mainStyles');

    const registry = new Map<string, StyleRegistryEntry>();

    // Iterate through all predefined styles
    for (const [className, style] of Object.entries(mainStyles as Styles)) {
      const entry: StyleRegistryEntry = {
        className,
        style: style as StyleValue,
        id: generateStyleId(className),
      };

      registry.set(className, entry);

      // Also store by normalized key for lookup
      const normalizedKey = normalizeClassKey(className);
      if (normalizedKey !== className) {
        registry.set(normalizedKey, entry);
      }
    }

    cachedRegistry = registry;
    registryHash = generateRegistryHash(registry);

    return registry;
  } catch (error) {
    // If we can't generate registry, return empty map
    // This can happen during development or if module resolution fails
    console.warn(
      '[react-native-wind/babel] Could not generate style registry:',
      error,
    );
    return new Map();
  }
}

/**
 * Generates a hash of the entire registry for cache invalidation
 *
 * @param registry - The style registry
 * @returns Hash string representing the registry state
 */
function generateRegistryHash(registry: Map<string, StyleRegistryEntry>): string {
  const crypto = require('crypto');
  const sortedEntries = Array.from(registry.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, entry]) => `${key}:${JSON.stringify(entry.style)}`)
    .join('|');

  return crypto.createHash('md5').update(sortedEntries).digest('hex').substring(0, 8);
}

/**
 * Gets the current registry hash
 * Used for cache invalidation
 */
export function getRegistryHash(): string | null {
  if (!registryHash && !cachedRegistry) {
    generateRegistry();
  }
  return registryHash;
}

/**
 * Clears the cached registry
 * Useful for testing or when styles are customized
 */
export function clearRegistry(): void {
  cachedRegistry = null;
  registryHash = null;
}

/**
 * Looks up a class name in the registry
 *
 * @param className - The class name to look up (e.g., "m-4", "flex")
 * @returns The style object, or null if not found
 */
export function lookupStyle(className: string): StyleValue | null {
  const registry = generateRegistry();
  const entry = registry.get(className);
  return entry ? entry.style : null;
}

/**
 * Looks up multiple class names and returns combined style
 *
 * @param classNames - Array of class names
 * @returns Combined style object
 */
export function lookupStyles(classNames: string[]): StyleValue {
  const registry = generateRegistry();
  const styles: StyleValue[] = [];

  for (const className of classNames) {
    const entry = registry.get(className);
    if (entry) {
      styles.push(entry.style);
    }
  }

  // Flatten styles manually (can't use StyleSheet.flatten at build time)
  return styles.reduce((acc, style) => Object.assign(acc, style), {} as any) as StyleValue;
}

/**
 * Gets all registry entries as a plain object for serialization
 *
 * @returns Object mapping className → style object
 */
export function getRegistryObject(): Record<string, StyleValue> {
  const registry = generateRegistry();
  const obj: Record<string, StyleValue> = {};

  for (const [className, entry] of registry.entries()) {
    obj[className] = entry.style;
  }

  return obj;
}

/**
 * Identifies the most commonly used single classes
 * These get special fast-path optimization
 *
 * @param count - Number of common patterns to return
 * @returns Array of most common class names
 */
export function getCommonPatterns(count: number = 50): string[] {
  // Hard-coded list of most common single classes based on typical usage
  // In a production implementation, this could be analyzed from actual usage data
  const common = [
    'flex',
    'flex-1',
    'flex-row',
    'flex-col',
    'items-center',
    'items-start',
    'items-end',
    'justify-center',
    'justify-between',
    'justify-start',
    'justify-end',
    'absolute',
    'relative',
    'w-full',
    'h-full',
    'p-4',
    'p-2',
    'm-4',
    'm-2',
    'mt-2',
    'mt-4',
    'mb-2',
    'mb-4',
    'rounded',
    'rounded-md',
    'rounded-lg',
    'bg-white',
    'bg-black',
    'bg-transparent',
    'text-black',
    'text-white',
    'text-base',
    'text-sm',
    'text-lg',
    'text-center',
    'font-bold',
    'font-medium',
    'shadow-sm',
    'shadow-md',
    'shadow-lg',
    'border',
    'border-2',
    'overflow-hidden',
    'z-10',
    'z-20',
    'opacity-50',
    'opacity-75',
    'gap-2',
    'gap-4',
    'px-4',
    'py-2',
  ];

  return common.slice(0, count);
}
