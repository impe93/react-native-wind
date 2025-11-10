/**
 * Code transformer
 * Transforms s`...` template literals into optimized code
 */

import * as t from '@babel/types';
import { NodePath } from '@babel/core';
import { TemplateAnalysis } from './types';
import {
  createComputedMemberExpression,
  createMemberExpression,
  createCallExpression,
  addComment,
} from './utils/ast';
import { generateStyleId } from './utils/hash';
import { extractClassNames } from './analyzer';
import { lookupStyles } from './registry';

/**
 * Transforms a fully static template into an inline style object
 *
 * Example transformation:
 * s`flex items-center p-4`
 * →
 * { display: 'flex', alignItems: 'center', padding: 16 }
 *
 * @param path - The TaggedTemplateExpression path
 * @param analysis - The template analysis result
 * @returns The replacement node
 */
export function transformStaticTemplate(
  path: NodePath<t.TaggedTemplateExpression>,
  analysis: TemplateAnalysis,
): t.Expression {
  const classString = analysis.classString!;
  const classNames = extractClassNames(classString);

  // Look up styles at build time and generate inline object
  const combinedStyle = lookupStyles(classNames);

  // Create inline object expression
  const properties = Object.entries(combinedStyle).map(([key, value]) =>
    t.objectProperty(
      t.identifier(key),
      typeof value === 'string'
        ? t.stringLiteral(value)
        : typeof value === 'number'
        ? t.numericLiteral(value)
        : typeof value === 'boolean'
        ? t.booleanLiteral(value)
        : t.identifier('undefined'),
    ),
  );

  const replacement = t.objectExpression(properties);

  // Add comment for debugging
  addComment(replacement, `@rnw-static: ${classString}`);

  return replacement;
}

/**
 * Transforms a partial template (with interpolations) into optimized code
 *
 * Example transformation:
 * s`flex ${dynamic} p-4`
 * →
 * _rnw.partial([_rnw.static['flex'], _rnw.static['p-4']], [dynamic])
 *
 * @param path - The TaggedTemplateExpression path
 * @param analysis - The template analysis result
 * @returns The replacement node
 */
export function transformPartialTemplate(
  path: NodePath<t.TaggedTemplateExpression>,
  analysis: TemplateAnalysis,
): t.Expression {
  const { staticParts, interpolationCount } = analysis;
  const quasi = path.node.quasi;

  // Extract static classes from each static part
  const staticClassArrays = staticParts!.map((part) => extractClassNames(part));

  // Flatten and get unique static classes
  const allStaticClasses = Array.from(new Set(staticClassArrays.flat()));

  // Pre-compute static styles at build time
  const staticStyles: t.Expression[] = [];

  if (allStaticClasses.length > 0) {
    // Look up each static class and create a style object literal
    const combinedStyle = lookupStyles(allStaticClasses);

    // Create object literal for the combined static styles
    staticStyles.push(t.objectExpression(
      Object.entries(combinedStyle).map(([key, value]) =>
        t.objectProperty(
          t.identifier(key),
          typeof value === 'string'
            ? t.stringLiteral(value)
            : typeof value === 'number'
            ? t.numericLiteral(value)
            : t.identifier('undefined'),
        ),
      ),
    ));
  }

  // Extract dynamic expressions from the template
  const dynamicExpressions = quasi.expressions.map((expr) => {
    // Handle TypeScript TSAsExpression
    if (t.isTSAsExpression(expr) || t.isTSTypeAssertion(expr)) {
      return (expr as any).expression;
    }
    return expr as t.Expression;
  });

  // Create: _rnw._rnw_partial([staticStyle1, staticStyle2, ...], [dynamic1, dynamic2, ...])
  const partialCall = createMemberExpression('_rnw', '_rnw_partial');
  const staticArray = t.arrayExpression(staticStyles);
  const dynamicArray = t.arrayExpression(dynamicExpressions);

  const replacement = createCallExpression(partialCall, [staticArray, dynamicArray]);

  // Add comment for debugging
  const staticInfo = allStaticClasses.join(' ');
  addComment(replacement, `@rnw-partial: static=[${staticInfo}] dynamic=${interpolationCount}`);

  return replacement;
}

/**
 * Transforms a platform-specific static template
 *
 * Example transformation:
 * s`m-4 ios:p-4 android:p-2`
 * →
 * Platform.OS === 'ios' ? { margin: 16, padding: 16 } : { margin: 16, padding: 8 }
 *
 * @param path - The TaggedTemplateExpression path
 * @param analysis - The template analysis result
 * @returns The replacement node
 */
export function transformPlatformTemplate(
  path: NodePath<t.TaggedTemplateExpression>,
  analysis: TemplateAnalysis,
): t.Expression {
  if (!analysis.hasPlatformPrefix) {
    // No platform-specific classes, use regular static transform
    return transformStaticTemplate(path, analysis);
  }

  const classString = analysis.classString!;
  const classNames = extractClassNames(classString);

  // Separate classes into regular, ios-specific, and android-specific
  const regularClasses: string[] = [];
  const iosClasses: string[] = [];
  const androidClasses: string[] = [];

  for (const className of classNames) {
    if (className.startsWith('ios:')) {
      iosClasses.push(className.substring(4)); // Remove 'ios:' prefix
    } else if (className.startsWith('android:')) {
      androidClasses.push(className.substring(8)); // Remove 'android:' prefix
    } else {
      regularClasses.push(className);
    }
  }

  // Build iOS style object
  const iosAllClasses = [...regularClasses, ...iosClasses];
  const iosStyle = lookupStyles(iosAllClasses);
  const iosProperties = Object.entries(iosStyle).map(([key, value]) =>
    t.objectProperty(
      t.identifier(key),
      typeof value === 'string'
        ? t.stringLiteral(value)
        : typeof value === 'number'
        ? t.numericLiteral(value)
        : typeof value === 'boolean'
        ? t.booleanLiteral(value)
        : t.identifier('undefined'),
    ),
  );
  const iosObject = t.objectExpression(iosProperties);

  // Build Android style object
  const androidAllClasses = [...regularClasses, ...androidClasses];
  const androidStyle = lookupStyles(androidAllClasses);
  const androidProperties = Object.entries(androidStyle).map(([key, value]) =>
    t.objectProperty(
      t.identifier(key),
      typeof value === 'string'
        ? t.stringLiteral(value)
        : typeof value === 'number'
        ? t.numericLiteral(value)
        : typeof value === 'boolean'
        ? t.booleanLiteral(value)
        : t.identifier('undefined'),
    ),
  );
  const androidObject = t.objectExpression(androidProperties);

  // Create: Platform.OS === 'ios' ? iosObject : androidObject
  const platformCheck = t.binaryExpression(
    '===',
    t.memberExpression(
      t.identifier('Platform'),
      t.identifier('OS'),
    ),
    t.stringLiteral('ios'),
  );

  const replacement = t.conditionalExpression(platformCheck, iosObject, androidObject);

  const iosClassString = iosAllClasses.join(' ');
  const androidClassString = androidAllClasses.join(' ');
  addComment(replacement, `@rnw-platform: ios=[${iosClassString}] android=[${androidClassString}]`);

  return replacement;
}

/**
 * Creates import statement for _rnw runtime
 *
 * Adds at the top of the file:
 * import * as _rnw from 'react-native-wind/dist/runtime';
 *
 * Uses explicit dist path for Metro compatibility (Metro doesn't fully support package.json "exports")
 *
 * @returns ImportDeclaration node
 */
export function createRuntimeImport(): t.ImportDeclaration {
  return t.importDeclaration(
    [t.importNamespaceSpecifier(t.identifier('_rnw'))],
    t.stringLiteral('react-native-wind/dist/runtime'),
  );
}

/**
 * Creates Platform import if not already imported
 *
 * import { Platform } from 'react-native';
 *
 * @returns ImportDeclaration node
 */
export function createPlatformImport(): t.ImportDeclaration {
  return t.importDeclaration(
    [t.importSpecifier(t.identifier('Platform'), t.identifier('Platform'))],
    t.stringLiteral('react-native'),
  );
}
