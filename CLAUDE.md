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
   - First attempts to parse arbitrary values (e.g., `h-[240]`, `bg-[#f1354a]`) via `parseArbitraryValue()`
   - Falls back to `mainStyles` registry lookup for predefined classes
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
   - Each class name is first checked against the arbitrary value parser
   - If it matches the pattern `prefix-[value]`, it's parsed by `parseArbitraryValue()`
   - If not, it falls back to the `mainStyles` registry lookup
   - Invalid arbitrary values are ignored (return null)

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

## Naming Conventions

- Class names follow TailwindCSS conventions where possible
- Directional suffixes: `t` (top), `b` (bottom), `l` (left), `r` (right), `x` (horizontal), `y` (vertical), `s` (start), `e` (end)
- Pattern: `{property}{direction?}-{value}` (e.g., `m-4`, `pt-2`, `bg-blue-500`)
- Arbitrary pattern: `{property}{direction?}-[{value}]` (e.g., `m-[15]`, `bg-[#f1354a]`)
