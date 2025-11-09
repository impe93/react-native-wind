import { Platform } from 'react-native';

export type PlatformType = 'ios' | 'android';

/**
 * Gets the current platform
 * Cached for performance - Platform.OS doesn't change at runtime
 */
let currentPlatform: PlatformType | null = null;

export function getCurrentPlatform(): PlatformType {
  if (currentPlatform === null) {
    currentPlatform = Platform.OS as PlatformType;
  }
  return currentPlatform;
}

/**
 * Checks if a class name has a platform prefix
 * Returns [platform, className] if match, null otherwise
 *
 * Examples:
 * - 'ios:m-4' -> ['ios', 'm-4']
 * - 'android:bg-blue-500' -> ['android', 'bg-blue-500']
 * - 'm-4' -> null
 */
export function parsePlatformPrefix(
  className: string,
): [PlatformType, string] | null {
  // Pattern: platform:classname (e.g., "ios:m-4", "android:bg-[#fff]")
  // The class name must start with a letter or number (not another colon)
  const regex = /^(ios|android):([a-zA-Z0-9-].+)$/;
  const match = regex.exec(className);

  if (!match) {
    return null;
  }

  return [match[1] as PlatformType, match[2]];
}

/**
 * Checks if a class should be applied on the current platform
 *
 * Examples (when Platform.OS === 'ios'):
 * - 'ios:m-4' -> true
 * - 'android:m-4' -> false
 * - 'm-4' -> true (no prefix = apply on all platforms)
 */
export function shouldApplyClass(className: string): boolean {
  const parsed = parsePlatformPrefix(className);

  if (!parsed) {
    // No platform prefix, apply on all platforms
    return true;
  }

  const [platform, _] = parsed;
  return platform === getCurrentPlatform();
}

/**
 * Extracts the base class name without platform prefix
 *
 * Examples:
 * - 'ios:m-4' -> 'm-4'
 * - 'android:bg-[#fff]' -> 'bg-[#fff]'
 * - 'm-4' -> 'm-4'
 */
export function getBaseClassName(className: string): string {
  const parsed = parsePlatformPrefix(className);
  return parsed ? parsed[1] : className;
}
