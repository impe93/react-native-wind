# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

React Native Wind is a utility-first style library for React Native, strongly inspired by TailwindCSS. It provides a low-level API for composing styles using concise, easy-to-remember class names (e.g., `m-4`, `bg-blue-500`, `flex-row`).

## Development Commands

### Build & Compile
```bash
yarn compile      # Compile TypeScript to dist/
yarn prepare      # Same as compile (runs on install)
```

### Testing
```bash
yarn test         # Run all tests with Jest (includes coverage)
```

### Linting & Formatting
```bash
yarn lint         # Run ESLint on all .js/.jsx/.ts/.tsx files
yarn prettier     # Check code formatting
```

## Architecture

### Core System

The library works through a composition-based architecture:

1. **Style Registration** (`src/core/mainStyles.ts`):
   - `composeStyles()` function builds the complete style registry by merging all style modules
   - Runs automatically on first import
   - Can be re-triggered via `customize()` to apply custom configuration

2. **Main API** (`src/core/createStyle.ts`):
   - `s()` function: the primary export that converts class strings to React Native styles
   - Uses template literals to parse class names
   - **Two-pass processing** for platform-specific precedence:
     - Pass 1: Process regular (non-platform) classes
     - Pass 2: Process platform-specific classes (override conflicts)
   - Each class checked against `mainStyles` registry (O(1) hash lookup)
   - Falls back to `parseArbitraryValue()` for arbitrary values (e.g., `h-[240]`, `bg-[#f1354a]`)
   - Platform filtering via `shouldApplyClass()` (skips non-matching platforms)
   - Results are cached in LRU cache for performance
   - Flattens results using React Native's `StyleSheet.flatten()`

3. **Customization** (`src/core/customize.ts`):
   - `customize()` function allows users to extend the default theme
   - Can override colors, spacing, sizing, font families, and font sizes
   - Re-composes all styles when called

4. **Arbitrary Values** (`src/core/arbitraryParser.ts`):
   - Enables TailwindCSS-style arbitrary values using square bracket syntax
   - Supports dynamic properties: spacing, sizing, colors, typography, layout
   - Examples: `h-[240]`, `bg-[#f1354a]`, `m-[15px]`, `-mt-[10]`, `w-[85%]`
   - See `ARBITRARY_VALUES.md` for complete documentation

5. **Platform-Specific Styles** (`src/core/platform.ts`):
   - Enables platform-specific style variants using `ios:` and `android:` prefixes
   - Examples: `ios:m-4`, `android:p-2`, `ios:bg-[#ff0000]`
   - **Precedence rule**: Platform-specific classes ALWAYS override regular classes
   - **Two-pass processing**: Regular classes processed first, then platform-specific overrides applied
   - **Platform detection**: Cached Platform.OS value for optimal performance
   - Works with arbitrary values: `ios:mt-[10]`, `android:bg-[#f1354a]`
   - Platform filtering happens early (skipped classes don't trigger style lookup)
   - Performance overhead: ~5% for typical usage (negligible)

6. **Build-Time Optimization** (`src/babel-plugin/`):
   - **Optional Babel plugin** for build-time extraction and pre-computation
   - Transforms `s`...`` template literals at build time for maximum performance
   - **Three-tier optimization strategy**:
     - **Tier 1 (Static)**: Fully static templates → pre-computed style objects (95% faster)
     - **Tier 2 (Partial)**: Templates with interpolations → hybrid pre-compute + runtime (60% faster)
     - **Tier 3 (Dynamic)**: Fully dynamic templates → runtime fallback (no optimization)
   - **Architecture**:
     - `index.ts`: Main Babel plugin entry point using `@babel/helper-plugin-utils`
     - `visitor.ts`: AST visitor pattern implementation for traversing code
     - `analyzer.ts`: Template literal analysis (static vs partial vs dynamic detection)
     - `transformer.ts`: Code transformation logic (generates optimized AST nodes)
     - `registry.ts`: Build-time style registry generator
     - `__generated__/runtime.ts`: Runtime helpers for partial templates
     - `__generated__/styles.ts`: Pre-computed style registry
   - **Usage**: Add `'react-native-wind/babel'` to babel.config.js plugins array
   - **Performance**: ~80% average improvement (static-heavy apps see 90%+ improvement)
   - **Trade-offs**: Slight build time increase (<5%) for significant runtime improvements
   - **Customization caveat**: `customize()` at runtime shows warning (optimizations won't reflect changes)
   - **Platform handling**: Pre-computes both iOS and Android styles, Platform.OS selects at runtime
   - **Compatibility**: Works with Metro, Expo managed/bare workflows, and monorepos

### Style Organization

Styles are organized into category modules under `src/styles/`:

- **flex/**: Flexbox properties (align-items, justify-content, flex-direction, etc.)
- **layout/**: Layout properties (position, display, opacity, z-index, gap, overflow, etc.)
- **sizing/**: Dimension properties (width, height, min/max variants, aspect-ratio)
- **spacing/**: Margin and padding utilities (using positions: '', t, b, l, r, x, y, s, e)
- **typography/**: Text styling (font-size, font-weight, text-align, line-height, text-color, etc.)
- **view/**: View-specific styles (background-color, border-radius, border-width, shadows, elevation, etc.)

Each category module (e.g., `view.ts`, `typography.ts`, `flex-style.ts`) exports a `build*()` function that aggregates its constituent styles.

### Style Builder Pattern

Most style files follow one of these patterns:

1. **Static styles**: Simple objects exported directly (e.g., `border-style.ts`, `font-weight.ts`)
2. **Builder functions**: Dynamic generation based on configuration (e.g., `margins.ts`, `paddings.ts`)
3. **Color-based styles**: Use `colorStyleBuilder()` helper to generate variants for all colors (e.g., `background-color.ts`, `text-color.ts`)

### Theme System

- **Colors** (`src/theme/colors.ts`): TailwindCSS color palette with shades 50-900
- **Spacing** (`src/styles/spacing/spaces.ts`): Scale from 0.25 (1px) to 32 (128px)
- **Sizing** (`src/styles/sizing/sizes.ts`): Size scale for width/height utilities
- **Font Sizes** (`src/typography/font-size.ts`): Typography scale (xs, sm, base, lg, xl, 2xl, etc.)

All themes can be extended/overridden via the `customize()` function.

### Type System

- **Styles type** (`src/types.ts`): Union of all style category types
- Each style category exports its own type (e.g., `MarginStyles`, `FlexStyle`, `TypographyStyle`)
- **CustomConfig type**: Defines the shape of user customizations

## Performance

The `s()` function is heavily optimized for runtime performance, as it's called frequently during component rendering.

### Performance Optimizations

The library implements several optimizations to ensure minimal overhead:

1. **LRU Cache** (`src/core/cache.ts`):
   - Results are cached using an LRU (Least Recently Used) cache with a 1000-entry limit
   - Cache keys are based on template strings and interpolated arguments
   - Cache provides 80-95% speedup for repeated style combinations
   - Cache is automatically cleared when `customize()` is called
   - Memory footprint: ~100KB for full cache (negligible on modern devices)

2. **Optimized Parse Order** (`src/core/createStyle.ts`):
   - Checks `mainStyles` hash table first (O(1) lookup)
   - Only falls back to expensive regex parsing for arbitrary values
   - Saves 60-80% of processing time since 80-90% of classes are predefined

3. **Fast Path for Simple Cases**:
   - Single-class usage skips string concatenation overhead
   - Uses efficient array-based string building instead of reduce
   - Avoids intermediate array allocations with push vs spread

4. **Set-Based Lookups** (`src/core/arbitraryParser.ts`):
   - `pixelPropertiesSet` uses Set for O(1) lookup instead of array.includes() O(n)
   - Improves arbitrary value parsing performance

### Performance Characteristics

Typical performance on modern devices (based on benchmarks):

- **Single predefined class**: <0.1ms average
- **Multiple predefined classes (5-10)**: <0.2ms average
- **Arbitrary values (single)**: <0.15ms average
- **Mixed usage (realistic)**: <0.25ms average
- **Cache hits**: 80-95% faster than cold lookups

### Performance Testing

Run performance benchmarks and regression tests:

```bash
# Run all tests including performance tests
yarn test

# Run only performance benchmarks (detailed timing output)
yarn test createStyle.bench.ts

# Run only regression tests (pass/fail assertions)
yarn test createStyle.perf.test.ts
```

**Benchmark file** (`src/core/createStyle.bench.ts`):
- Measures detailed timing statistics (mean, median, min, max)
- Tests best case (predefined), worst case (arbitrary), and realistic scenarios
- Demonstrates cache effectiveness
- Includes stress tests for edge cases

**Performance test file** (`src/core/createStyle.perf.test.ts`):
- Enforces performance thresholds (fails if performance regresses)
- Tests memory leak prevention
- Validates cache behavior
- Covers real-world usage patterns

### Performance Best Practices

1. **Prefer predefined classes over arbitrary values** when possible:
   ```typescript
   // Faster (hash lookup)
   s`m-4 p-2 bg-blue-500`

   // Slower (regex parsing)
   s`m-[16] p-[8] bg-[#3b82f6]`
   ```

2. **Reuse style combinations** to benefit from caching:
   ```typescript
   // Good: Same template reused, hits cache
   const buttonStyle = s`bg-blue-500 px-4 py-2 rounded`;

   // Less optimal: Dynamic construction creates new cache keys
   const makeStyle = (color) => s`bg-${color}-500 px-4 py-2 rounded`;
   ```

3. **Avoid excessive unique style combinations**:
   - Cache has 1000-entry limit (LRU eviction)
   - Creating >1000 unique combinations reduces cache hit rate
   - Most apps naturally stay well under this limit

4. **Clear cache after customization** (automatic):
   - `customize()` automatically clears the cache
   - Ensures fresh lookups use new theme values
   - Manually clear if needed: `clearStyleCache()`

### Monitoring Performance

The cache provides insight into usage patterns:

```typescript
import { styleCache } from 'react-native-wind/cache';

// Check cache size (useful for debugging)
console.log('Cache entries:', styleCache.size);

// Clear cache manually if needed
styleCache.clear();
```

## Adding New Style Properties

When adding new style properties:

1. Create a new file in the appropriate `src/styles/` subdirectory
2. Export the style object or builder function
3. Export TypeScript types for the class names and styles
4. Import and merge into the category's main builder (e.g., `view.ts`, `typography.ts`)
5. Update the category type union in the main `build*()` function
6. The style will automatically be included when `composeStyles()` runs

## Arbitrary Values Feature

The library supports TailwindCSS-style arbitrary values using square bracket syntax for dynamic properties that don't exist in the predefined scales.

### How It Works

1. **Parsing Flow** (`src/core/createStyle.ts`):
   - Each class name is first checked against the `mainStyles` registry (O(1) hash lookup)
   - If not found, it's parsed by `parseArbitraryValue()` for arbitrary value syntax
   - If it matches the pattern `prefix-[value]`, the value is parsed and returned
   - Invalid arbitrary values are ignored (return null)
   - This order (predefined first, arbitrary second) optimizes for the common case

2. **Parser Implementation** (`src/core/arbitraryParser.ts`):
   - **Regex pattern**: `/^(-)?([a-z-]+)-\[([^\]]+)\]$/` to detect arbitrary syntax
   - **Prefix mapping**: `prefixToStyleMap` object maps class prefixes to React Native style properties
   - **Value parsing**: Different handlers for numeric, percentage, color, and rem values
   - **Multi-property support**: Some prefixes (e.g., `rounded-t`) map to multiple style properties

3. **Supported Categories**:
   - **Spacing**: `m-[15]`, `-mt-[10]`, `p-[24px]`, `gap-[12]`, `top-[5]`
   - **Sizing**: `h-[240]`, `w-[85%]`, `min-h-[100]`, `max-w-[600]`
   - **Colors**: `bg-[#f1354a]`, `text-[rgba(0,0,0,0.5)]`, `border-[#ccc]`
   - **Typography**: `text-[19px]`, `leading-[24]`, `tracking-[0.5]`
   - **Layout**: `opacity-[0.73]`, `z-[999]`, `rounded-[12]`, `border-[3]`

4. **Value Formats**:
   - Raw numbers: `[240]` → `240` (treated as pixels for spacing/sizing)
   - Pixels: `[240px]` → `240`
   - Percentages: `[85%]` → `"85%"` (kept as string)
   - Rem: `[1.5rem]` → `24` (converted to pixels, 1rem = 16px)
   - Hex colors: `[#f1354a]` → `"#f1354a"`
   - RGB/RGBA: `[rgba(0,0,0,0.5)]` → `"rgba(0,0,0,0.5)"`
   - Negative: `-mt-[10]` → `{ marginTop: -10 }`

### Extending Arbitrary Values

To add support for new properties:

1. **Add to prefix mapping** (`src/core/arbitraryParser.ts`):
   ```typescript
   const prefixToStyleMap: Record<string, string> = {
     // ...existing mappings
     'new-prefix': 'reactNativeProperty',
   };
   ```

2. **Handle special cases** (if needed):
   - Multi-property prefixes: Add to `multiPropertyPrefixes` object
   - Context-dependent mapping: Add special handling in `parseArbitraryValue()` (e.g., `text` prefix handles both fontSize and color)

3. **Update value parser** (if needed):
   - Add property to appropriate list in `parseValue()` function
   - Add custom parsing logic for new value formats

### Important Notes

- Arbitrary values are NOT supported for enum-based properties (e.g., `flex-direction`, `align-items`, `text-align`)
- Parser is designed to fail silently - invalid arbitrary values return `null` and are skipped
- TypeScript type safety is not available for arbitrary values (they bypass the type system)
- See `ARBITRARY_VALUES.md` for complete user documentation

### Platform-Specific Arbitrary Values

Arbitrary values work seamlessly with platform-specific prefixes:

**Examples**:
- `ios:mt-[10]` → `{ marginTop: 10 }` (iOS only)
- `android:bg-[#ff0000]` → `{ backgroundColor: '#ff0000' }` (Android only)
- `ios:w-[85%]` → `{ width: '85%' }` (iOS only)
- `android:-mt-[10]` → `{ marginTop: -10 }` (Android only)

**Implementation**:
- Platform prefix is stripped before arbitrary value parsing
- Parser defensively handles platform prefixes in `parseArbitraryValue()`
- Main processing happens in `createStyle.ts` via `getBaseClassName()`
- Platform-specific arbitrary values follow same precedence rules (always override regular classes)

## Naming Conventions

- Class names follow TailwindCSS conventions where possible
- Directional suffixes: `t` (top), `b` (bottom), `l` (left), `r` (right), `x` (horizontal), `y` (vertical), `s` (start), `e` (end)
- Pattern: `{property}{direction?}-{value}` (e.g., `m-4`, `pt-2`, `bg-blue-500`)
- Arbitrary pattern: `{property}{direction?}-[{value}]` (e.g., `m-[15]`, `bg-[#f1354a]`)
- Platform-specific pattern: `{platform}:{class}` (e.g., `ios:m-4`, `android:p-2`)
- Platform-specific arbitrary: `{platform}:{property}{direction?}-[{value}]` (e.g., `ios:mt-[10]`, `android:bg-[#ff0000]`)
- Supported platforms: `ios`, `android` only
