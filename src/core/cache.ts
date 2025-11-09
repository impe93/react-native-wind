import { StyleProp } from 'react-native';

/**
 * LRU (Least Recently Used) Cache for style results
 *
 * Implements an efficient cache with automatic eviction of least recently used entries
 * when the maximum size is reached.
 *
 * Performance characteristics:
 * - get: O(1)
 * - set: O(1)
 * - clear: O(1)
 */
export class LRUCache<K, V> {
  private cache: Map<K, V>;
  private readonly maxSize: number;

  constructor(maxSize: number = 1000) {
    this.cache = new Map();
    this.maxSize = maxSize;
  }

  /**
   * Retrieves a value from the cache
   * If the key exists, it's marked as recently used (moved to end)
   */
  get(key: K): V | undefined {
    const value = this.cache.get(key);

    if (value !== undefined) {
      // Mark as recently used by deleting and re-inserting (moves to end)
      this.cache.delete(key);
      this.cache.set(key, value);
    }

    return value;
  }

  /**
   * Adds or updates a value in the cache
   * If max size is reached, removes the least recently used entry
   */
  set(key: K, value: V): void {
    // If key exists, delete it first (will be re-added at end)
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxSize) {
      // Cache is full, evict least recently used (first entry)
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    this.cache.set(key, value);
  }

  /**
   * Clears all entries from the cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Returns the current number of entries in the cache
   */
  get size(): number {
    return this.cache.size;
  }

  /**
   * Checks if a key exists in the cache
   */
  has(key: K): boolean {
    return this.cache.has(key);
  }
}

/**
 * Global style cache instance
 * Caches the results of the s() function to avoid re-computing identical style combinations
 */
export const styleCache = new LRUCache<string, StyleProp<any>>(1000);

/**
 * Clears the global style cache
 * Should be called when the theme is customized via customize()
 */
export function clearStyleCache(): void {
  styleCache.clear();
}
