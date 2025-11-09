/**
 * Integration tests for s() function with platform-specific styles
 */
import { s } from './createStyle';
import { clearStyleCache } from './cache';

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

describe('s() function with platform-specific styles', () => {
  beforeEach(() => {
    // Clear cache before each test for accurate results
    clearStyleCache();
  });

  describe('iOS platform (Platform.OS = ios)', () => {
    it('should apply ios-prefixed classes', () => {
      const result = s`ios:m-4`;
      expect(result).toHaveProperty('margin', 16); // m-4 = 16
    });

    it('should ignore android-prefixed classes', () => {
      const result = s`android:m-4`;
      expect(result).toEqual({});
    });

    it('should apply multiple ios-prefixed classes', () => {
      const result = s`ios:m-4 ios:p-2`;
      expect(result).toHaveProperty('margin', 16);
      expect(result).toHaveProperty('padding', 8);
    });

    it('should ignore multiple android-prefixed classes', () => {
      const result = s`android:m-4 android:p-2`;
      expect(result).toEqual({});
    });

    it('should mix ios and android classes correctly', () => {
      const result = s`ios:m-4 android:m-2`;
      expect(result).toHaveProperty('margin', 16); // Only ios:m-4 applies
      expect(result).not.toHaveProperty('margin', 8); // android:m-2 ignored
    });
  });

  describe('Platform-specific precedence rules', () => {
    it('should let platform-specific classes override regular classes', () => {
      // Platform-specific should always win over regular classes
      const result = s`m-4 ios:m-2`;
      expect(result).toHaveProperty('margin', 8); // ios:m-2 wins (8)
    });

    it('should let platform-specific classes override even when appearing first', () => {
      // Platform-specific should always win, regardless of order
      const result = s`ios:m-2 m-4`;
      expect(result).toHaveProperty('margin', 8); // ios:m-2 still wins (8)
    });

    it('should handle multiple platform-specific overrides', () => {
      const result = s`m-4 android:m-2 ios:m-1`;
      // m-4 = 16, android:m-2 ignored, ios:m-1 wins = 4
      expect(result).toHaveProperty('margin', 4);
    });

    it('should let ignored platform classes not interfere', () => {
      const result = s`android:p-4 m-2`;
      // android:p-4 ignored, m-2 applies
      expect(result).toHaveProperty('margin', 8);
      expect(result).not.toHaveProperty('padding');
    });

    it('should handle complex precedence with multiple properties', () => {
      const result = s`m-4 p-4 ios:m-2 android:p-2`;
      // m-4 overridden by ios:m-2, p-4 stands (android:p-2 ignored)
      expect(result).toHaveProperty('margin', 8); // ios:m-2
      expect(result).toHaveProperty('padding', 16); // p-4
    });
  });

  describe('Platform-specific arbitrary values', () => {
    it('should handle ios arbitrary value for spacing', () => {
      const result = s`ios:mt-[10]`;
      expect(result).toEqual({ marginTop: 10 });
    });

    it('should handle ios arbitrary value for colors', () => {
      const result = s`ios:bg-[#ff0000]`;
      expect(result).toEqual({ backgroundColor: '#ff0000' });
    });

    it('should ignore android arbitrary values on ios platform', () => {
      const result = s`android:mt-[10]`;
      expect(result).toEqual({});
    });

    it('should ignore android arbitrary color values on ios platform', () => {
      const result = s`android:bg-[#ff0000]`;
      expect(result).toEqual({});
    });

    it('should handle negative platform-specific arbitrary values', () => {
      const result = s`ios:-mt-[10]`;
      expect(result).toEqual({ marginTop: -10 });
    });

    it('should ignore negative android arbitrary values on ios', () => {
      const result = s`android:-mt-[10]`;
      expect(result).toEqual({});
    });

    it('should mix platform-specific arbitrary and regular values', () => {
      const result = s`m-4 ios:mt-[20]`;
      // m-4 sets all margins to 16, then ios:mt-[20] overrides marginTop
      expect(result).toHaveProperty('margin', 16);
      expect(result).toHaveProperty('marginTop', 20);
    });

    it('should handle platform-specific arbitrary values with precedence', () => {
      const result = s`mt-[10] ios:mt-[20]`;
      // Platform-specific should win
      expect(result).toHaveProperty('marginTop', 20);
    });

    it('should handle percentage arbitrary values with platform prefix', () => {
      const result = s`ios:w-[85%]`;
      expect(result).toEqual({ width: '85%' });
    });
  });

  describe('Mixed regular and platform-specific classes', () => {
    it('should combine non-conflicting classes', () => {
      const result = s`m-4 ios:p-2 bg-blue-500`;
      expect(result).toHaveProperty('margin', 16);
      expect(result).toHaveProperty('padding', 8);
      expect(result).toHaveProperty('backgroundColor');
    });

    it('should handle whitespace correctly with platform prefixes', () => {
      const result = s`m-4   ios:p-2    bg-blue-500`;
      expect(result).toHaveProperty('margin', 16);
      expect(result).toHaveProperty('padding', 8);
    });

    it('should handle empty platform-specific sections', () => {
      const result = s`m-4 android:p-4`;
      // android:p-4 ignored on ios
      expect(result).toHaveProperty('margin', 16);
      expect(result).not.toHaveProperty('padding');
    });
  });

  describe('Interpolation with platform-specific classes', () => {
    it('should handle interpolated platform-specific classes', () => {
      const dynamicClass = 'ios:bg-blue-500';
      const result = s`m-4 ${dynamicClass}`;
      expect(result).toHaveProperty('margin', 16);
      expect(result).toHaveProperty('backgroundColor');
    });

    it('should handle multiple interpolated platform classes', () => {
      const iosClass = 'ios:m-4';
      const androidClass = 'android:m-2';
      const result = s`${iosClass} ${androidClass}`;
      expect(result).toHaveProperty('margin', 16); // ios:m-4 applies
    });

    it('should handle precedence with interpolated classes', () => {
      const platformClass = 'ios:m-2';
      const result = s`m-4 ${platformClass}`;
      expect(result).toHaveProperty('margin', 8); // ios:m-2 wins
    });
  });

  describe('Cache behavior with platform-specific styles', () => {
    it('should cache platform-specific styles separately', () => {
      clearStyleCache();

      const result1 = s`ios:m-4`;
      const result2 = s`ios:m-4`;

      // Should return same cached result
      expect(result1).toEqual(result2);
    });

    it('should cache different platform prefixes separately', () => {
      clearStyleCache();

      const iosResult = s`ios:m-4`;
      const androidResult = s`android:m-4`;

      // Different results (android returns empty on ios)
      expect(iosResult).toHaveProperty('margin', 16);
      expect(androidResult).toEqual({});
    });

    it('should cache mixed platform and regular classes', () => {
      clearStyleCache();

      const result1 = s`m-4 ios:p-2`;
      const result2 = s`m-4 ios:p-2`;

      expect(result1).toEqual(result2);
      expect(result1).toHaveProperty('margin', 16);
      expect(result1).toHaveProperty('padding', 8);
    });
  });

  describe('Edge cases', () => {
    it('should handle empty classes gracefully', () => {
      const result = s``;
      expect(result).toEqual({});
    });

    it('should handle only platform-specific classes for other platforms', () => {
      const result = s`android:m-4 android:p-2 android:bg-blue-500`;
      // All android classes ignored on ios
      expect(result).toEqual({});
    });

    it('should handle malformed platform prefixes gracefully', () => {
      const result = s`ios:`;
      // Invalid class, should be ignored
      expect(result).toEqual({});
    });

    it('should handle unknown classes with platform prefix', () => {
      const result = s`ios:unknown-class-123`;
      // Unknown class, should be ignored
      expect(result).toEqual({});
    });

    it('should handle platform-specific classes with extra whitespace', () => {
      const result = s`  ios:m-4   android:p-2   `;
      expect(result).toHaveProperty('margin', 16);
      expect(result).not.toHaveProperty('padding');
    });
  });

  describe('Real-world scenarios', () => {
    it('should handle typical button styles with platform differences', () => {
      const result = s`bg-blue-500 text-white px-4 py-2 rounded-md ios:py-3 android:py-1`;
      // ios:py-3 should override py-2
      expect(result).toHaveProperty('backgroundColor');
      expect(result).toHaveProperty('color');
      expect(result).toHaveProperty('paddingHorizontal', 16);
      expect(result).toHaveProperty('paddingVertical', 12); // ios:py-3
    });

    it('should handle responsive layout with platform-specific spacing', () => {
      const result = s`flex flex-row items-center p-4 ios:p-6 android:p-2`;
      expect(result).toHaveProperty('flexDirection', 'row');
      expect(result).toHaveProperty('alignItems', 'center');
      expect(result).toHaveProperty('padding', 24); // ios:p-6 overrides p-4
    });

    it('should handle card component with platform-specific shadows', () => {
      const result = s`bg-white rounded-lg p-4 ios:shadow-md android:elevation-2`;
      expect(result).toHaveProperty('backgroundColor');
      expect(result).toHaveProperty('padding', 16);
      // shadow-md should apply on ios
    });
  });
});
