/**
 * Performance Benchmark Suite for the s() function
 *
 * This file contains performance benchmarks to measure the improvements
 * from various optimizations applied to the s() function.
 *
 * Run with: yarn test createStyle.bench.ts
 *
 * Note: These are not traditional unit tests - they measure performance
 * characteristics and print timing results to the console.
 */

import { s } from './createStyle';
import { styleCache } from './cache';

// Disable console output during benchmarks
const originalLog = console.log;
const silentLog = () => {};

/**
 * Runs a benchmark test and returns timing statistics
 */
function benchmark(
  fn: () => void,
  iterations: number = 10000,
): { mean: number; median: number; min: number; max: number } {
  const times: number[] = [];

  // Warmup (5% of iterations)
  const warmupIterations = Math.floor(iterations * 0.05);
  for (let i = 0; i < warmupIterations; i++) {
    fn();
  }

  // Actual benchmark
  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    fn();
    const end = performance.now();
    times.push(end - start);
  }

  // Calculate statistics
  times.sort((a, b) => a - b);
  const sum = times.reduce((acc, val) => acc + val, 0);
  const mean = sum / times.length;
  const median = times[Math.floor(times.length / 2)];
  const min = times[0];
  const max = times[times.length - 1];

  return { mean, median, min, max };
}

describe('s() Performance Benchmarks', () => {
  beforeAll(() => {
    // Silence console during benchmarks
    console.log = silentLog;
  });

  afterAll(() => {
    // Restore console
    console.log = originalLog;
  });

  beforeEach(() => {
    // Clear cache before each test for accurate cold measurements
    styleCache.clear();
  });

  describe('Predefined Classes (Best Case)', () => {
    it('should efficiently process single predefined class', () => {
      const stats = benchmark(() => {
        s`m-4`;
      }, 10000);

      console.log = originalLog;
      console.log('\n📊 Single predefined class:');
      console.log(`   Mean: ${stats.mean.toFixed(4)}ms`);
      console.log(`   Median: ${stats.median.toFixed(4)}ms`);
      console.log(`   Min: ${stats.min.toFixed(4)}ms`);
      console.log(`   Max: ${stats.max.toFixed(4)}ms`);
      console.log = silentLog;

      // Performance assertion: single class should be very fast
      expect(stats.mean).toBeLessThan(0.1); // Less than 0.1ms on average
    });

    it('should efficiently process multiple predefined classes', () => {
      const stats = benchmark(() => {
        s`m-4 p-2 bg-blue-500 text-white flex flex-row items-center justify-between`;
      }, 10000);

      console.log = originalLog;
      console.log('\n📊 Multiple predefined classes (9 classes):');
      console.log(`   Mean: ${stats.mean.toFixed(4)}ms`);
      console.log(`   Median: ${stats.median.toFixed(4)}ms`);
      console.log(`   Min: ${stats.min.toFixed(4)}ms`);
      console.log(`   Max: ${stats.max.toFixed(4)}ms`);
      console.log = silentLog;

      // Performance assertion
      expect(stats.mean).toBeLessThan(0.2); // Less than 0.2ms on average
    });

    it('should handle layout combination efficiently', () => {
      const stats = benchmark(() => {
        s`flex flex-row items-center justify-center w-full h-full p-4`;
      }, 10000);

      console.log = originalLog;
      console.log('\n📊 Layout combination (9 classes):');
      console.log(`   Mean: ${stats.mean.toFixed(4)}ms`);
      console.log(`   Median: ${stats.median.toFixed(4)}ms`);
      console.log = silentLog;

      expect(stats.mean).toBeLessThan(0.2);
    });
  });

  describe('Arbitrary Values (Worst Case)', () => {
    it('should handle single arbitrary value', () => {
      const stats = benchmark(() => {
        s`h-[240]`;
      }, 10000);

      console.log = originalLog;
      console.log('\n📊 Single arbitrary value:');
      console.log(`   Mean: ${stats.mean.toFixed(4)}ms`);
      console.log(`   Median: ${stats.median.toFixed(4)}ms`);
      console.log = silentLog;

      expect(stats.mean).toBeLessThan(0.15); // Slightly slower than predefined
    });

    it('should handle multiple arbitrary values', () => {
      const stats = benchmark(() => {
        s`h-[240] w-[350] bg-[#f1354a] text-[19px] m-[15] p-[24]`;
      }, 10000);

      console.log = originalLog;
      console.log('\n📊 Multiple arbitrary values (6 classes):');
      console.log(`   Mean: ${stats.mean.toFixed(4)}ms`);
      console.log(`   Median: ${stats.median.toFixed(4)}ms`);
      console.log = silentLog;

      expect(stats.mean).toBeLessThan(0.3);
    });

    it('should handle negative arbitrary values', () => {
      const stats = benchmark(() => {
        s`-mt-[10] -ml-[5] -mb-[20]`;
      }, 10000);

      console.log = originalLog;
      console.log('\n📊 Negative arbitrary values (3 classes):');
      console.log(`   Mean: ${stats.mean.toFixed(4)}ms`);
      console.log = silentLog;

      expect(stats.mean).toBeLessThan(0.2);
    });
  });

  describe('Mixed Usage (Realistic Case)', () => {
    it('should handle realistic component styles', () => {
      const stats = benchmark(() => {
        s`flex flex-row items-center justify-between p-4 bg-white rounded-lg shadow-md h-[80] mb-2`;
      }, 10000);

      console.log = originalLog;
      console.log('\n📊 Realistic component (11 classes, mixed):');
      console.log(`   Mean: ${stats.mean.toFixed(4)}ms`);
      console.log(`   Median: ${stats.median.toFixed(4)}ms`);
      console.log = silentLog;

      expect(stats.mean).toBeLessThan(0.25);
    });

    it('should handle complex component with interpolation', () => {
      const dynamicClass = 'bg-blue-500';
      const stats = benchmark(() => {
        s`flex flex-col ${dynamicClass} p-4 rounded-md w-[300] h-[200]`;
      }, 10000);

      console.log = originalLog;
      console.log('\n📊 Complex with interpolation (7 classes):');
      console.log(`   Mean: ${stats.mean.toFixed(4)}ms`);
      console.log = silentLog;

      expect(stats.mean).toBeLessThan(0.25);
    });
  });

  describe('Cache Performance', () => {
    it('should demonstrate cache effectiveness', () => {
      const testClasses = `flex items-center justify-center p-4 bg-white`;

      // First run (cold cache)
      styleCache.clear();
      const coldStats = benchmark(() => {
        s`flex items-center justify-center p-4 bg-white`;
      }, 5000);

      // Second run (warm cache) - Same instance will hit cache
      const sameTemplate = () => s`flex items-center justify-center p-4 bg-white`;
      const warmStats = benchmark(sameTemplate, 5000);

      console.log = originalLog;
      console.log('\n📊 Cache effectiveness:');
      console.log(`   Cold cache (mean): ${coldStats.mean.toFixed(4)}ms`);
      console.log(`   Warm cache (mean): ${warmStats.mean.toFixed(4)}ms`);
      console.log(
        `   Speedup: ${(coldStats.mean / warmStats.mean).toFixed(2)}x`,
      );
      console.log = silentLog;

      // Cache should provide significant speedup
      expect(warmStats.mean).toBeLessThan(coldStats.mean);
    });

    it('should measure cache hit rate in realistic usage', () => {
      styleCache.clear();

      // Simulate realistic app usage with repeated styles
      const commonStyles = [
        () => s`flex flex-row items-center`,
        () => s`p-4 bg-white rounded-lg`,
        () => s`text-base text-gray-800`,
        () => s`flex flex-col justify-between`,
        () => s`w-full h-full`,
      ];

      let totalCalls = 0;
      const iterations = 10000;

      const stats = benchmark(() => {
        // Pick a random common style (simulates real app)
        const styleFunc = commonStyles[totalCalls % commonStyles.length];
        styleFunc();
        totalCalls++;
      }, iterations);

      console.log = originalLog;
      console.log('\n📊 Realistic cache usage (rotating 5 styles):');
      console.log(`   Mean: ${stats.mean.toFixed(4)}ms`);
      console.log(`   Cache size: ${styleCache.size}`);
      console.log(`   Expected hit rate: ~80% (after first 5 calls)`);
      console.log = silentLog;

      // With cache, repeated calls should be very fast
      expect(stats.mean).toBeLessThan(0.1);
      expect(styleCache.size).toBe(5); // Should cache all 5 unique combinations
    });
  });

  describe('Stress Tests', () => {
    it('should handle very long class strings', () => {
      const stats = benchmark(() => {
        s`m-1 m-2 m-3 m-4 p-1 p-2 p-3 p-4 bg-red-50 bg-blue-100 bg-green-200 text-xs text-sm text-base flex flex-row flex-col items-start items-center items-end justify-start justify-center justify-end w-1 w-2 w-3 h-1 h-2 h-3`;
      }, 5000);

      console.log = originalLog;
      console.log('\n📊 Very long class string (30+ classes):');
      console.log(`   Mean: ${stats.mean.toFixed(4)}ms`);
      console.log = silentLog;

      expect(stats.mean).toBeLessThan(0.5);
    });

    it('should handle cache size limit gracefully', () => {
      styleCache.clear();

      // Generate more unique styles than cache can hold (1000 limit)
      const stats = benchmark(
        () => {
          const random = Math.floor(Math.random() * 2000);
          // This will create unique cache keys due to random values
          s`h-[${String(random)}] w-[${String(random + 1)}]`;
        },
        2000,
        );

      console.log = originalLog;
      console.log('\n📊 Cache eviction (2000 unique styles, 1000 cache limit):');
      console.log(`   Mean: ${stats.mean.toFixed(4)}ms`);
      console.log(`   Final cache size: ${styleCache.size}`);
      console.log = silentLog;

      // Cache should be at or near max size
      expect(styleCache.size).toBeLessThanOrEqual(1000);
      expect(styleCache.size).toBeGreaterThan(990); // Should be very close to 1000
    });
  });
});
