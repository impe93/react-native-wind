/**
 * React Native Wind Babel Plugin
 *
 * Transforms s`...` template literals into optimized build-time code
 * for maximum runtime performance.
 *
 * Usage in babel.config.js:
 * module.exports = {
 *   plugins: [
 *     'react-native-wind/babel'
 *   ]
 * };
 *
 * Or with options:
 * module.exports = {
 *   plugins: [
 *     ['react-native-wind/babel', {
 *       extractStatic: true,
 *       extractPartial: true,
 *       commonPatterns: true,
 *     }]
 *   ]
 * };
 */

import { declare } from '@babel/helper-plugin-utils';
import { PluginObj, PluginPass } from '@babel/core';
import { PluginOptions, PluginState } from './types';
import { createVisitor } from './visitor';
import { generateRegistry } from './registry';

export default declare<PluginOptions, PluginObj>((api, options) => {
  // Validate Babel version
  api.assertVersion(7);

  // Default options
  const defaultOptions: PluginOptions = {
    extractStatic: true,
    extractPartial: true,
    commonPatterns: true,
    warnOnCustomize: process.env.NODE_ENV !== 'production',
  };

  const finalOptions = { ...defaultOptions, ...options };

  return {
    name: 'react-native-wind-extract',

    /**
     * Pre-hook: Runs once before transforming any files
     * Generates the style registry for the entire build
     */
    pre(this: PluginPass) {
      // Generate style registry once per build
      try {
        generateRegistry();
      } catch (error) {
        // Log warning but don't fail the build
        console.warn(
          '[react-native-wind/babel] Failed to generate style registry:',
          error,
        );
      }
    },

    /**
     * Visitor: Runs for each file
     * Creates file-specific state and visitor
     */
    visitor: {
      Program(path, state) {
        // Initialize plugin state for this file
        const pluginState: PluginState = {
          hasStyleImport: false,
          styleFunctionName: null,
          hasCustomizeImport: false,
          staticTemplates: new Map(),
          partialTemplates: new Map(),
          opts: finalOptions,
        };

        // Create and apply the visitor
        const visitor = createVisitor(pluginState);

        // Traverse the file with our visitor
        path.traverse(visitor, state);
      },
    },

    /**
     * Post-hook: Runs once after transforming all files
     * Can be used for cleanup or final reporting
     */
    post(this: PluginPass) {
      // Cleanup or reporting could go here
    },
  };
});

// Also export a CommonJS default for older Node versions
module.exports = declare<PluginOptions, PluginObj>((api, options) => {
  api.assertVersion(7);

  const defaultOptions: PluginOptions = {
    extractStatic: true,
    extractPartial: true,
    commonPatterns: true,
    warnOnCustomize: process.env.NODE_ENV !== 'production',
  };

  const finalOptions = { ...defaultOptions, ...options };

  return {
    name: 'react-native-wind-extract',

    pre(this: PluginPass) {
      try {
        generateRegistry();
      } catch (error) {
        console.warn(
          '[react-native-wind/babel] Failed to generate style registry:',
          error,
        );
      }
    },

    visitor: {
      Program(path, state) {
        const pluginState: PluginState = {
          hasStyleImport: false,
          styleFunctionName: null,
          hasCustomizeImport: false,
          staticTemplates: new Map(),
          partialTemplates: new Map(),
          opts: finalOptions,
        };

        const visitor = createVisitor(pluginState);
        path.traverse(visitor, state);
      },
    },

    post(this: PluginPass) {
      // Cleanup or reporting
    },
  };
});
