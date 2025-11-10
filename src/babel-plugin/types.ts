/**
 * TypeScript types for the Babel plugin
 */

import { StyleValue } from '../types';

/**
 * Plugin options that can be configured in babel.config.js
 */
export interface PluginOptions {
  /**
   * Enable static template extraction (fully static templates)
   * @default true
   */
  extractStatic?: boolean;

  /**
   * Enable partial template optimization (templates with interpolations)
   * @default true
   */
  extractPartial?: boolean;

  /**
   * Pre-compute common single-class patterns
   * @default true
   */
  commonPatterns?: boolean;

  /**
   * Show warnings when optimize() is called
   * @default true (only in development)
   */
  warnOnCustomize?: boolean;
}

/**
 * Internal plugin state used during transformation
 */
export interface PluginState {
  /**
   * Tracks if 's' function has been imported from react-native-wind
   */
  hasStyleImport: boolean;

  /**
   * Local name of the 's' function (could be renamed on import)
   */
  styleFunctionName: string | null;

  /**
   * Tracks if 'customize' function has been imported
   */
  hasCustomizeImport: boolean;

  /**
   * Collection of all static templates found in the file
   */
  staticTemplates: Map<string, string>;

  /**
   * Collection of all partial templates found in the file
   */
  partialTemplates: Map<string, string[]>;

  /**
   * Options passed to the plugin
   */
  opts: PluginOptions;
}

/**
 * Template literal analysis result
 */
export interface TemplateAnalysis {
  /**
   * Type of template detected
   */
  type: 'static' | 'partial' | 'dynamic';

  /**
   * Full class string (for static templates)
   */
  classString?: string;

  /**
   * Static parts of the template literal
   */
  staticParts?: string[];

  /**
   * Number of dynamic interpolations
   */
  interpolationCount: number;

  /**
   * Whether the template contains platform-specific classes
   */
  hasPlatformPrefix: boolean;

  /**
   * Whether the template contains arbitrary values
   */
  hasArbitraryValues: boolean;
}

/**
 * Style registry entry
 */
export interface StyleRegistryEntry {
  /**
   * Class name (e.g., "m-4", "flex", "ios:p-2")
   */
  className: string;

  /**
   * Computed React Native style object
   */
  style: StyleValue;

  /**
   * Hash ID for cache key
   */
  id: string;
}

/**
 * Generated runtime module structure
 */
export interface RuntimeModule {
  /**
   * Pre-computed static styles
   */
  precomputedStyles: Record<string, StyleValue>;

  /**
   * Common single-class shortcuts
   */
  commonStyles: Record<string, StyleValue>;

  /**
   * Partial template helper function
   */
  partial: (staticStyles: StyleValue[], dynamicClasses: string[]) => StyleValue;
}
