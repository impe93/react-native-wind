/**
 * Performance Regression Tests for the s() function
 *
 * These tests ensure that the s() function maintains acceptable performance
 * characteristics and doesn't regress over time.
 *
 * Unlike benchmarks, these tests will fail if performance drops below
 * acceptable thresholds.
 */

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

import { s } from './createStyle';
import { styleCache, clearStyleCache } from './cache';

/**
 * Measures average execution time over multiple iterations
 */
function measurePerformance(fn: () => void, iterations = 1000): number {
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    fn();
  }
  const end = performance.now();
  return (end - start) / iterations;
}

describe('Performance Regression Tests', () => {
  beforeEach(() => {
    clearStyleCache();
  });

  describe('Basic Performance Thresholds', () => {
    it('should process single class in under 0.1ms', () => {
      const avgTime = measurePerformance(() => {
        s`m-4`;
      }, 1000);

      expect(avgTime).toBeLessThan(0.1);
    });

    it('should process 5 classes in under 0.15ms', () => {
      const avgTime = measurePerformance(() => {
        s`m-4 p-2 bg-blue-500 text-white flex`;
      }, 1000);

      expect(avgTime).toBeLessThan(0.15);
    });

    it('should process 10 classes in under 0.25ms', () => {
      const avgTime = measurePerformance(() => {
        s`m-4 p-2 bg-blue-500 text-white flex flex-row items-center justify-between rounded-lg shadow-md`;
      }, 1000);

      expect(avgTime).toBeLessThan(0.25);
    });
  });

  describe('Arbitrary Value Performance', () => {
    it('should process arbitrary values efficiently', () => {
      const avgTime = measurePerformance(() => {
        s`h-[240] w-[350] bg-[#f1354a]`;
      }, 1000);

      // Arbitrary values are more expensive but should still be fast
      expect(avgTime).toBeLessThan(0.3);
    });

    it('should process negative arbitrary values efficiently', () => {
      const avgTime = measurePerformance(() => {
        s`-mt-[10] -ml-[5]`;
      }, 1000);

      expect(avgTime).toBeLessThan(0.2);
    });
  });

  describe('Cache Performance', () => {
    it('should cache results and hit cache on repeated calls', () => {
      clearStyleCache();

      // First call - should cache the result
      const result1 = s`flex items-center justify-center p-4 bg-white`;
      expect(styleCache.size).toBe(1);

      // Second call with same template - should hit cache
      const result2 = s`flex items-center justify-center p-4 bg-white`;
      expect(styleCache.size).toBe(1); // No new entry

      // Results should be identical
      expect(result2).toEqual(result1);

      // Warm cache execution should still be fast
      const warmTime = measurePerformance(() => {
        s`flex items-center justify-center p-4 bg-white`;
      }, 1000);
      expect(warmTime).toBeLessThan(0.1); // Should be very fast
    });

    it('should maintain cache within size limits', () => {
      clearStyleCache();

      // Create more unique styles than cache limit
      for (let i = 0; i < 1500; i++) {
        s`h-[${String(i)}] w-[${String(i)}]`;
      }

      // Cache should not exceed max size (1000)
      expect(styleCache.size).toBeLessThanOrEqual(1000);
    });

    it('should clear cache when requested', () => {
      s`m-4`;
      s`p-2`;
      s`bg-blue-500`;

      expect(styleCache.size).toBeGreaterThan(0);

      clearStyleCache();

      expect(styleCache.size).toBe(0);
    });
  });

  describe('Memory Leak Prevention', () => {
    it('should not leak memory with repeated calls', () => {
      clearStyleCache();
      const initialSize = styleCache.size;

      // Make many calls with the same styles
      for (let i = 0; i < 1000; i++) {
        s`m-4 p-2 bg-blue-500`;
        s`flex flex-row items-center`;
        s`text-white text-base`;
      }

      // Cache should only contain 3 entries (one per unique style)
      expect(styleCache.size).toBe(3);
    });

    it('should evict old entries when cache is full', () => {
      clearStyleCache();

      // Fill cache to limit
      for (let i = 0; i < 1000; i++) {
        s`m-[${String(i)}]`;
      }

      const sizeAtLimit = styleCache.size;
      expect(sizeAtLimit).toBeLessThanOrEqual(1000);

      // Add more entries
      for (let i = 1000; i < 1100; i++) {
        s`m-[${String(i)}]`;
      }

      // Cache size should still be at limit (LRU eviction working)
      expect(styleCache.size).toBeLessThanOrEqual(1000);
    });
  });

  describe('Edge Cases Performance', () => {
    it('should handle empty classes gracefully', () => {
      const avgTime = measurePerformance(() => {
        s``;
      }, 1000);

      expect(avgTime).toBeLessThan(0.05);
    });

    it('should handle whitespace-only classes gracefully', () => {
      const avgTime = measurePerformance(() => {
        s`   `;
      }, 1000);

      expect(avgTime).toBeLessThan(0.05);
    });

    it('should handle extra whitespace efficiently', () => {
      const avgTime = measurePerformance(() => {
        s`m-4    p-2     bg-blue-500`;
      }, 1000);

      expect(avgTime).toBeLessThan(0.15);
    });

    it('should handle unknown classes without performance impact', () => {
      const avgTime = measurePerformance(() => {
        s`m-4 unknown-class-123 p-2 another-unknown`;
      }, 1000);

      // Unknown classes should be filtered out efficiently
      expect(avgTime).toBeLessThan(0.15);
    });
  });

  describe('Interpolation Performance', () => {
    it('should handle single interpolation efficiently', () => {
      const dynamicClass = 'bg-blue-500';
      const avgTime = measurePerformance(() => {
        s`m-4 ${dynamicClass} p-2`;
      }, 1000);

      expect(avgTime).toBeLessThan(0.15);
    });

    it('should handle multiple interpolations efficiently', () => {
      const class1 = 'bg-blue-500';
      const class2 = 'text-white';
      const class3 = 'rounded-lg';

      const avgTime = measurePerformance(() => {
        s`m-4 ${class1} p-2 ${class2} ${class3}`;
      }, 1000);

      expect(avgTime).toBeLessThan(0.2);
    });
  });

  describe('Real-World Scenarios', () => {
    it('should handle typical button styles efficiently', () => {
      const avgTime = measurePerformance(() => {
        s`bg-blue-500 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-600`;
      }, 1000);

      expect(avgTime).toBeLessThan(0.25);
    });

    it('should handle typical card styles efficiently', () => {
      const avgTime = measurePerformance(() => {
        s`bg-white rounded-lg shadow-md p-4 mb-4 flex flex-col gap-2`;
      }, 1000);

      expect(avgTime).toBeLessThan(0.25);
    });

    it('should handle typical layout container efficiently', () => {
      const avgTime = measurePerformance(() => {
        s`flex flex-row items-center justify-between w-full h-full p-4`;
      }, 1000);

      expect(avgTime).toBeLessThan(0.2);
    });
  });

  describe('Platform-Specific Performance', () => {
    it('should process single platform-specific class efficiently', () => {
      const avgTime = measurePerformance(() => {
        s`ios:m-4`;
      }, 1000);

      // Should add minimal overhead over regular classes
      expect(avgTime).toBeLessThan(0.12); // vs <0.1ms for regular
    });

    it('should process multiple platform-specific classes efficiently', () => {
      const avgTime = measurePerformance(() => {
        s`ios:m-4 ios:p-2 ios:bg-blue-500`;
      }, 1000);

      // Should add minimal overhead (~5-10%)
      expect(avgTime).toBeLessThan(0.16); // vs <0.15ms for regular
    });

    it('should process mixed platform/regular classes efficiently', () => {
      const avgTime = measurePerformance(() => {
        s`m-4 ios:p-2 android:p-4 bg-blue-500`;
      }, 1000);

      // Two-pass approach adds overhead but should still be fast
      expect(avgTime).toBeLessThan(0.2);
    });

    it('should process platform-specific arbitrary values efficiently', () => {
      const avgTime = measurePerformance(() => {
        s`ios:h-[240] ios:w-[350] ios:bg-[#f1354a]`;
      }, 1000);

      // Arbitrary values with platform prefix
      expect(avgTime).toBeLessThan(0.35); // vs <0.3ms for regular arbitrary
    });

    it('should efficiently skip non-matching platform classes', () => {
      const avgTime = measurePerformance(() => {
        s`android:m-4 android:p-2 android:bg-blue-500`;
      }, 1000);

      // Skipping classes should be very fast (no style lookup needed)
      expect(avgTime).toBeLessThan(0.1);
    });

    it('should cache platform-specific styles correctly', () => {
      clearStyleCache();

      // First call - cold cache
      s`ios:m-4 ios:p-2`;
      expect(styleCache.size).toBe(1);

      // Second call - should hit cache
      s`ios:m-4 ios:p-2`;
      expect(styleCache.size).toBe(1); // No new entry

      // Third call with different platform - separate cache entry
      s`android:m-4 android:p-2`;
      expect(styleCache.size).toBe(2);
    });

    it('should handle realistic platform-specific component styles', () => {
      const avgTime = measurePerformance(() => {
        s`flex flex-row items-center p-4 bg-white ios:p-6 android:p-2`;
      }, 1000);

      // Real-world mixed usage
      expect(avgTime).toBeLessThan(0.3);
    });

    it('should maintain performance with platform precedence rules', () => {
      const avgTime = measurePerformance(() => {
        s`m-4 p-4 bg-blue-500 ios:m-2 android:m-1 ios:p-6`;
      }, 1000);

      // Two-pass with overrides should still be fast
      expect(avgTime).toBeLessThan(0.25);
    });
  });
});
