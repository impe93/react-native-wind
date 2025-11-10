/**
 * Babel visitor implementation
 * Defines how to traverse and transform the AST
 */

import * as t from '@babel/types';
import { NodePath, Visitor } from '@babel/core';
import { PluginState } from './types';
import {
  isReactNativeWindImport,
  getStyleFunctionName,
  hasCustomizeImport,
  isIdentifier,
} from './utils/ast';
import { analyzeTemplate, shouldOptimize } from './analyzer';
import {
  transformStaticTemplate,
  transformPartialTemplate,
  transformPlatformTemplate,
  createRuntimeImport,
  createPlatformImport,
} from './transformer';

/**
 * Creates the Babel visitor object
 *
 * @param state - Plugin state to track imports and transformations
 * @returns Visitor object for Babel
 */
export function createVisitor(state: PluginState): Visitor<any> {
  let hasAddedRuntimeImport = false;
  let hasAddedPlatformImport = false;
  let hasPlatformImport = false;

  return {
    /**
     * Tracks imports from 'react-native-wind'
     * Detects when 's' function is imported
     */
    ImportDeclaration(path: NodePath<any>) {
      // Check if importing from react-native-wind
      if (isReactNativeWindImport(path)) {
        // Track the 's' function import
        const styleFunctionName = getStyleFunctionName(path);
        if (styleFunctionName) {
          state.hasStyleImport = true;
          state.styleFunctionName = styleFunctionName;
        }

        // Track if customize is imported
        if (hasCustomizeImport(path)) {
          state.hasCustomizeImport = true;

          // Warn about customize() usage in development
          if (state.opts.warnOnCustomize !== false && process.env.NODE_ENV !== 'production') {
            console.warn(
              '[react-native-wind/babel] Warning: customize() detected. ' +
              'Build-time optimizations will not reflect runtime customizations. ' +
              'Consider disabling the Babel plugin or rebuilding after customization.',
            );
          }
        }
      }

      // Track if Platform is imported from react-native
      if (path.node.source.value === 'react-native') {
        for (const specifier of path.node.specifiers) {
          if (
            t.isImportSpecifier(specifier) &&
            isIdentifier(specifier.imported, 'Platform')
          ) {
            hasPlatformImport = true;
          }
        }
      }
    },

    /**
     * Transforms s`...` tagged template expressions
     * Main optimization logic happens here
     */
    TaggedTemplateExpression(path: NodePath<any>) {
      // Only process if 's' function was imported
      if (!state.hasStyleImport || !state.styleFunctionName) {
        return;
      }

      // Check if this is a call to the 's' function
      const tag = path.node.tag;
      if (!isIdentifier(tag, state.styleFunctionName)) {
        return;
      }

      // Analyze the template literal
      const quasi = path.node.quasi;
      const analysis = analyzeTemplate(quasi);

      // Check if we should optimize this template
      if (!shouldOptimize(analysis, state.opts)) {
        return;
      }

      // Transform based on template type
      let replacement: t.Expression;

      if (analysis.type === 'static') {
        // Fully static template
        if (analysis.hasPlatformPrefix) {
          // Platform-specific static template
          if (!hasPlatformImport && !hasAddedPlatformImport) {
            // Add Platform import
            const programPath = path.findParent((p) => p.isProgram()) as any;
            if (programPath) {
              programPath.unshiftContainer('body', createPlatformImport() as any);
              hasAddedPlatformImport = true;
            }
          }
          replacement = transformPlatformTemplate(path, analysis);
        } else {
          replacement = transformStaticTemplate(path, analysis);
        }

        // Track in state
        state.staticTemplates.set(analysis.classString!, analysis.classString!);
      } else if (analysis.type === 'partial') {
        // Partial template with interpolations

        // Add runtime import for partial templates (they need _rnw.partial function)
        if (!hasAddedRuntimeImport) {
          const programPath = path.findParent((p) => p.isProgram()) as any;
          if (programPath) {
            programPath.unshiftContainer('body', createRuntimeImport() as any);
            hasAddedRuntimeImport = true;
          }
        }

        replacement = transformPartialTemplate(path, analysis);

        // Track in state
        const key = analysis.staticParts!.join('{|}');
        state.partialTemplates.set(key, analysis.staticParts!);
      } else {
        // Fully dynamic - don't transform
        return;
      }

      // Replace the template expression with the optimized code
      path.replaceWith(replacement as any);
    },

    /**
     * Program exit hook
     * Final cleanup and reporting
     */
    Program: {
      exit(path: NodePath<any>, fileState: any) {
        // Log transformation stats in development
        if (process.env.NODE_ENV !== 'production' && state.opts.warnOnCustomize !== false) {
          const staticCount = state.staticTemplates.size;
          const partialCount = state.partialTemplates.size;
          const total = staticCount + partialCount;

          if (total > 0) {
            console.log(
              `[react-native-wind/babel] Optimized ${total} templates ` +
              `(${staticCount} static, ${partialCount} partial) in ${fileState.file.opts.filename}`,
            );
          }
        }
      },
    },
  };
}
