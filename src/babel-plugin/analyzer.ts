/**
 * Template literal analyzer
 * Determines optimization strategy for s`...` tagged templates
 */

import * as t from '@babel/types';
import { TemplateAnalysis } from './types';
import { getStaticTemplateString, isStaticTemplate, getStaticParts } from './utils/ast';

/**
 * Analyzes a template literal to determine optimization strategy
 *
 * @param quasi - The TemplateLiteral node from s`...`
 * @returns Analysis result with optimization type and metadata
 */
export function analyzeTemplate(quasi: t.TemplateLiteral): TemplateAnalysis {
  // Check if fully static (no interpolations)
  const isStatic = isStaticTemplate(quasi);

  if (isStatic) {
    const classString = getStaticTemplateString(quasi)!;
    return {
      type: 'static',
      classString,
      staticParts: [classString],
      interpolationCount: 0,
      hasPlatformPrefix: hasPlatformSpecific(classString),
      hasArbitraryValues: hasArbitrarySyntax(classString),
    };
  }

  // Has interpolations - determine if partial or fully dynamic
  const staticParts = getStaticParts(quasi);
  const interpolationCount = quasi.expressions.length;

  // If all static parts are empty, it's fully dynamic
  const allEmpty = staticParts.every((part) => part.trim() === '');
  if (allEmpty) {
    return {
      type: 'dynamic',
      staticParts,
      interpolationCount,
      hasPlatformPrefix: false,
      hasArbitraryValues: false,
    };
  }

  // Partial static - has both static and dynamic parts
  const combinedStatic = staticParts.join(' ');
  return {
    type: 'partial',
    staticParts,
    interpolationCount,
    hasPlatformPrefix: hasPlatformSpecific(combinedStatic),
    hasArbitraryValues: hasArbitrarySyntax(combinedStatic),
  };
}

/**
 * Checks if a class string contains platform-specific prefixes
 *
 * @param classString - The class string to check
 * @returns True if contains ios: or android: prefix
 */
export function hasPlatformSpecific(classString: string): boolean {
  return /\b(ios|android):/.test(classString);
}

/**
 * Checks if a class string contains arbitrary value syntax
 *
 * @param classString - The class string to check
 * @returns True if contains [...] syntax
 */
export function hasArbitrarySyntax(classString: string): boolean {
  return /\[[^\]]+\]/.test(classString);
}

/**
 * Determines if a template should be optimized based on analysis
 *
 * @param analysis - The template analysis result
 * @param options - Plugin options
 * @returns True if the template should be transformed
 */
export function shouldOptimize(
  analysis: TemplateAnalysis,
  options: { extractStatic?: boolean; extractPartial?: boolean },
): boolean {
  if (analysis.type === 'static') {
    return options.extractStatic !== false;
  }

  if (analysis.type === 'partial') {
    return options.extractPartial !== false;
  }

  // Never optimize fully dynamic templates
  return false;
}

/**
 * Extracts individual class names from a class string
 *
 * @param classString - The full class string (e.g., "flex items-center p-4")
 * @returns Array of individual class names
 */
export function extractClassNames(classString: string): string[] {
  return classString
    .trim()
    .split(/\s+/)
    .filter((c) => c.length > 0);
}

/**
 * Estimates the performance improvement from optimization
 *
 * @param analysis - The template analysis result
 * @returns Estimated improvement percentage (0-100)
 */
export function estimateImprovement(analysis: TemplateAnalysis): number {
  if (analysis.type === 'static') {
    // Static templates get ~95% improvement
    return 95;
  }

  if (analysis.type === 'partial') {
    // Partial optimization depends on static vs dynamic ratio
    const staticCount = analysis.staticParts!.filter(
      (p) => p.trim().length > 0,
    ).length;
    const totalParts = staticCount + analysis.interpolationCount;
    const staticRatio = staticCount / totalParts;

    // Linear interpolation: 30% to 70% improvement
    return Math.round(30 + staticRatio * 40);
  }

  // Dynamic templates don't get optimized
  return 0;
}
