import { StyleProp, StyleSheet } from 'react-native';
import { mainStyles } from './mainStyles';
import { StyleValue } from '../types';
import { parseArbitraryValue } from './arbitraryParser';
import { styleCache } from './cache';
import { shouldApplyClass, getBaseClassName, parsePlatformPrefix } from './platform';

export const s = (
  classes: TemplateStringsArray,
  ...args: string[]
): StyleProp<any> => {
  // Create cache key from template strings and interpolated args
  const cacheKey = classes.raw.join('§') + (args.length ? '§' + args.join('§') : '');

  // Check cache first
  const cached = styleCache.get(cacheKey);
  if (cached !== undefined) {
    return cached;
  }

  // Fast path: single class with no interpolation
  // Optimization: Skip string concatenation overhead for simple cases
  let classString: string;
  if (classes.length === 1 && args.length === 0) {
    classString = classes[0].trim();
  } else {
    // Optimized string concatenation using array parts
    const parts: string[] = [];
    for (let i = 0; i < classes.length; i++) {
      parts.push(classes[i]);
      if (i < args.length) {
        parts.push(args[i]);
      }
    }
    classString = parts.join('').replace(/\s+/g, ' ').trim();
  }

  // Split classes and build style array
  const classNames = classString.split(' ');
  const styleValues: StyleValue[] = [];

  // Two-pass approach to ensure platform-specific classes always override regular classes
  // Pass 1: Process non-platform-specific classes first
  for (let i = 0; i < classNames.length; i++) {
    const className = classNames[i];

    // Skip platform-specific classes in first pass
    if (parsePlatformPrefix(className)) {
      continue;
    }

    // Check mainStyles first (O(1) hash lookup), then parse arbitrary values
    const styleValue = mainStyles[className] || parseArbitraryValue(className);
    if (styleValue) {
      styleValues.push(styleValue);
    }
  }

  // Pass 2: Process platform-specific classes (these override conflicts from pass 1)
  for (let i = 0; i < classNames.length; i++) {
    const className = classNames[i];

    // Only process platform-specific classes that apply to current platform
    if (!shouldApplyClass(className)) {
      continue;
    }

    // Skip non-platform-specific classes in second pass
    if (!parsePlatformPrefix(className)) {
      continue;
    }

    // Extract base class name (without platform prefix)
    const baseClassName = getBaseClassName(className);

    // Check mainStyles first (O(1) hash lookup), then parse arbitrary values
    const styleValue = mainStyles[baseClassName] || parseArbitraryValue(baseClassName);
    if (styleValue) {
      styleValues.push(styleValue);
    }
  }

  const result = StyleSheet.flatten(styleValues as any);

  // Store in cache before returning
  styleCache.set(cacheKey, result);

  return result;
};
