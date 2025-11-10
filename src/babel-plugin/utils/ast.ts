/**
 * AST (Abstract Syntax Tree) utility functions for Babel transformations
 */

import * as t from '@babel/types';
import { NodePath } from '@babel/core';

/**
 * Checks if a node is an identifier with a specific name
 *
 * @param node - The AST node to check
 * @param name - The expected identifier name
 * @returns True if the node is an Identifier with the given name
 */
export function isIdentifier(node: t.Node, name: string): boolean {
  return t.isIdentifier(node) && node.name === name;
}

/**
 * Checks if an import declaration imports from react-native-wind
 *
 * @param path - The ImportDeclaration node path
 * @returns True if importing from 'react-native-wind'
 */
export function isReactNativeWindImport(
  path: NodePath<t.ImportDeclaration>,
): boolean {
  return path.node.source.value === 'react-native-wind';
}

/**
 * Extracts the local name of the 's' function from an import
 *
 * @param path - The ImportDeclaration node path
 * @returns The local name of 's', or null if not found
 *
 * @example
 * import { s } from 'react-native-wind' → 's'
 * import { s as style } from 'react-native-wind' → 'style'
 */
export function getStyleFunctionName(
  path: NodePath<t.ImportDeclaration>,
): string | null {
  for (const specifier of path.node.specifiers) {
    if (t.isImportSpecifier(specifier)) {
      const imported = specifier.imported;
      if (t.isIdentifier(imported) && imported.name === 's') {
        return specifier.local.name;
      }
    }
  }
  return null;
}

/**
 * Checks if an import declaration imports 'customize' function
 *
 * @param path - The ImportDeclaration node path
 * @returns True if 'customize' is imported
 */
export function hasCustomizeImport(
  path: NodePath<t.ImportDeclaration>,
): boolean {
  return path.node.specifiers.some((specifier) => {
    if (t.isImportSpecifier(specifier)) {
      const imported = specifier.imported;
      return t.isIdentifier(imported) && imported.name === 'customize';
    }
    return false;
  });
}

/**
 * Creates a member expression for accessing nested properties
 *
 * @param object - Object name (e.g., '_rnw')
 * @param property - Property name (e.g., 'static')
 * @returns MemberExpression AST node
 *
 * @example
 * createMemberExpression('_rnw', 'static') → _rnw.static
 */
export function createMemberExpression(
  object: string,
  property: string,
): t.MemberExpression {
  return t.memberExpression(t.identifier(object), t.identifier(property));
}

/**
 * Creates a computed member expression for accessing with dynamic key
 *
 * @param object - Object name (e.g., '_rnw')
 * @param property - Property name (e.g., 'static')
 * @param key - String literal key
 * @returns MemberExpression with computed property
 *
 * @example
 * createComputedMemberExpression('_rnw', 'static', 'abc123')
 * → _rnw.static['abc123']
 */
export function createComputedMemberExpression(
  object: string,
  property: string,
  key: string,
): t.MemberExpression {
  return t.memberExpression(
    createMemberExpression(object, property),
    t.stringLiteral(key),
    true, // computed
  );
}

/**
 * Checks if a template literal is fully static (no interpolations)
 *
 * @param quasi - The TemplateLiteral node
 * @returns True if template has no dynamic expressions
 */
export function isStaticTemplate(quasi: t.TemplateLiteral): boolean {
  return quasi.expressions.length === 0;
}

/**
 * Extracts the static string from a fully static template literal
 *
 * @param quasi - The TemplateLiteral node
 * @returns The concatenated static string, or null if not static
 */
export function getStaticTemplateString(
  quasi: t.TemplateLiteral,
): string | null {
  if (!isStaticTemplate(quasi)) {
    return null;
  }

  return quasi.quasis[0].value.raw;
}

/**
 * Extracts static parts from a template literal with interpolations
 *
 * @param quasi - The TemplateLiteral node
 * @returns Array of static strings between interpolations
 */
export function getStaticParts(quasi: t.TemplateLiteral): string[] {
  return quasi.quasis.map((q) => q.value.raw);
}

/**
 * Creates a call expression node
 *
 * @param callee - Function to call (e.g., '_rnw.partial')
 * @param args - Array of argument nodes
 * @returns CallExpression AST node
 */
export function createCallExpression(
  callee: t.Expression,
  args: t.Expression[],
): t.CallExpression {
  return t.callExpression(callee, args);
}

/**
 * Adds a comment to an AST node
 *
 * @param node - The node to add a comment to
 * @param comment - The comment text
 */
export function addComment(node: t.Node, comment: string): void {
  if (!node.leadingComments) {
    node.leadingComments = [];
  }
  node.leadingComments.push({
    type: 'CommentBlock',
    value: ` ${comment} `,
  });
}
