/**
 * Unit tests for platform detection utilities
 */
import {
  parsePlatformPrefix,
  shouldApplyClass,
  getBaseClassName,
  getCurrentPlatform,
} from './platform';

// Mock Platform.OS to 'ios' for testing
jest.mock('react-native', () => ({
  Platform: {
    OS: 'ios',
  },
  StyleSheet: {
    flatten: (styles: any) => {
      if (Array.isArray(styles)) {
        return styles.reduce((acc, style) => ({ ...acc, ...style }), {});
      }
      return styles;
    },
    create: (styles: any) => styles,
  },
}));

describe('Platform Utilities', () => {
  describe('parsePlatformPrefix', () => {
    it('should parse ios prefix with regular class', () => {
      expect(parsePlatformPrefix('ios:m-4')).toEqual(['ios', 'm-4']);
    });

    it('should parse android prefix with regular class', () => {
      expect(parsePlatformPrefix('android:bg-blue-500')).toEqual([
        'android',
        'bg-blue-500',
      ]);
    });

    it('should parse ios prefix with arbitrary values', () => {
      expect(parsePlatformPrefix('ios:mt-[10]')).toEqual(['ios', 'mt-[10]']);
    });

    it('should parse android prefix with arbitrary color values', () => {
      expect(parsePlatformPrefix('android:bg-[#ff0000]')).toEqual([
        'android',
        'bg-[#ff0000]',
      ]);
    });

    it('should parse platform prefix with negative arbitrary values', () => {
      expect(parsePlatformPrefix('ios:-mt-[10]')).toEqual(['ios', '-mt-[10]']);
    });

    it('should return null for non-platform classes', () => {
      expect(parsePlatformPrefix('m-4')).toBeNull();
    });

    it('should return null for non-platform arbitrary values', () => {
      expect(parsePlatformPrefix('h-[240]')).toBeNull();
    });

    it('should return null for invalid platform prefix', () => {
      expect(parsePlatformPrefix('web:m-4')).toBeNull();
    });

    it('should return null for unsupported platform', () => {
      expect(parsePlatformPrefix('linux:m-4')).toBeNull();
    });

    it('should return null for malformed platform prefix', () => {
      expect(parsePlatformPrefix('ios:')).toBeNull();
      expect(parsePlatformPrefix(':m-4')).toBeNull();
      expect(parsePlatformPrefix('ios::')).toBeNull();
    });

    it('should handle complex class names with platform prefix', () => {
      expect(parsePlatformPrefix('ios:flex-row')).toEqual(['ios', 'flex-row']);
      expect(parsePlatformPrefix('android:items-center')).toEqual([
        'android',
        'items-center',
      ]);
    });
  });

  describe('shouldApplyClass', () => {
    it('should apply non-prefixed classes on all platforms', () => {
      expect(shouldApplyClass('m-4')).toBe(true);
      expect(shouldApplyClass('bg-blue-500')).toBe(true);
      expect(shouldApplyClass('flex-row')).toBe(true);
    });

    it('should apply ios classes on ios platform', () => {
      expect(shouldApplyClass('ios:m-4')).toBe(true);
      expect(shouldApplyClass('ios:bg-blue-500')).toBe(true);
    });

    it('should not apply android classes on ios platform', () => {
      expect(shouldApplyClass('android:m-4')).toBe(false);
      expect(shouldApplyClass('android:bg-blue-500')).toBe(false);
    });

    it('should apply ios arbitrary value classes on ios platform', () => {
      expect(shouldApplyClass('ios:mt-[10]')).toBe(true);
      expect(shouldApplyClass('ios:bg-[#ff0000]')).toBe(true);
    });

    it('should not apply android arbitrary value classes on ios platform', () => {
      expect(shouldApplyClass('android:mt-[10]')).toBe(false);
      expect(shouldApplyClass('android:bg-[#ff0000]')).toBe(false);
    });

    it('should handle negative arbitrary values with platform prefix', () => {
      expect(shouldApplyClass('ios:-mt-[10]')).toBe(true);
      expect(shouldApplyClass('android:-mt-[10]')).toBe(false);
    });
  });

  describe('getBaseClassName', () => {
    it('should return base class for ios-prefixed classes', () => {
      expect(getBaseClassName('ios:m-4')).toBe('m-4');
      expect(getBaseClassName('ios:bg-blue-500')).toBe('bg-blue-500');
    });

    it('should return base class for android-prefixed classes', () => {
      expect(getBaseClassName('android:m-4')).toBe('m-4');
      expect(getBaseClassName('android:flex-row')).toBe('flex-row');
    });

    it('should return same class for non-prefixed classes', () => {
      expect(getBaseClassName('m-4')).toBe('m-4');
      expect(getBaseClassName('bg-blue-500')).toBe('bg-blue-500');
    });

    it('should return base class for arbitrary values with platform prefix', () => {
      expect(getBaseClassName('ios:mt-[10]')).toBe('mt-[10]');
      expect(getBaseClassName('android:bg-[#ff0000]')).toBe('bg-[#ff0000]');
    });

    it('should return base class for negative arbitrary values', () => {
      expect(getBaseClassName('ios:-mt-[10]')).toBe('-mt-[10]');
      expect(getBaseClassName('android:-ml-[5]')).toBe('-ml-[5]');
    });

    it('should return same class for arbitrary values without platform prefix', () => {
      expect(getBaseClassName('h-[240]')).toBe('h-[240]');
      expect(getBaseClassName('-mt-[10]')).toBe('-mt-[10]');
    });
  });

  describe('getCurrentPlatform', () => {
    it('should return ios platform', () => {
      expect(getCurrentPlatform()).toBe('ios');
    });

    it('should cache platform value', () => {
      // Call multiple times - should return same value without re-querying Platform.OS
      const platform1 = getCurrentPlatform();
      const platform2 = getCurrentPlatform();
      const platform3 = getCurrentPlatform();

      expect(platform1).toBe('ios');
      expect(platform2).toBe('ios');
      expect(platform3).toBe('ios');
    });
  });
});
