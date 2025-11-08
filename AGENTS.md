# React Native Wind - Cursor Rules

## Project Overview

React Native Wind is a utility-first styling library for React Native, strongly inspired by TailwindCSS. It provides a low-level API for composing styles using short, memorable class names instead of writing individual style objects.

### Key Features
- Utility-first styling approach similar to TailwindCSS
- Type-safe style definitions with TypeScript
- Customizable theme (colors, spacing, sizing, fonts)
- Template literal syntax for applying multiple styles
- No runtime style generation - all styles are pre-built

### Main Exports
- `s` - Template literal function for applying styles (e.g., `s`flex-row items-center``)
- `customize` - Function to customize theme values (colors, spacing, sizing, font sizes)

---

## Project Structure

```
src/
├── core/                    # Core functionality
│   ├── createStyle.ts       # Main style function (s)
│   ├── customize.ts         # Theme customization
│   └── mainStyles.ts        # Style composition & initialization
├── styles/                  # Style definitions organized by category
│   ├── flex/               # Flexbox styles
│   ├── layout/             # Display, position, overflow, etc.
│   ├── sizing/             # Width, height, min/max sizing
│   ├── spacing/            # Margin, padding
│   ├── typography/         # Text styles
│   └── view/               # Background, borders
├── theme/                  # Theme configuration
│   └── colors.ts           # Color palette (TailwindCSS colors)
├── helpers/                # Utility functions
│   └── color-style-builder.ts  # Helper for color-based styles
├── types.ts                # Global type definitions
└── index.ts                # Main entry point
```

---

## Architecture Patterns

### 1. Style Definition Pattern

Each style category follows a consistent pattern:

```typescript
// 1. Define the style object (for static styles)
export const flexDirections = {
  'flex-row': { flexDirection: 'row' },
  'flex-col': { flexDirection: 'column' },
  // ...
} as const;

// 2. Define TypeScript types
export type FlexDirectionsClass = keyof typeof flexDirections;

// 3. For dynamic styles, create a builder function
export const buildMargins = (): MarginStyles => {
  const margins: MarginStyles = {} as MarginStyles;
  // Generate styles programmatically
  return margins;
};
```

### 2. Two Types of Style Definitions

**Static Styles** (simple, predefined):
- Defined as constant objects
- Used for styles with fixed values
- Examples: `flex-direction.ts`, `justify-content.ts`, `align-items.ts`

```typescript
export const flexDirections = {
  'flex-row': { flexDirection: 'row' },
  'flex-col': { flexDirection: 'column' },
} as const;
```

**Dynamic Styles** (generated from scales):
- Built using builder functions
- Generated from theme scales (spacing, sizing, colors)
- Examples: `margins.ts`, `paddings.ts`, `widths.ts`, `background-color.ts`

```typescript
export const buildMargins = (): MarginStyles => {
  const margins: MarginStyles = {} as MarginStyles;
  positions.forEach((p) => {
    Object.keys(spaces).forEach((s) => {
      margins[`m${p}-${s}`] = {
        [marginPositionsPair[p]]: spaces[s],
      };
    });
  });
  return margins;
};
```

### 3. Style Aggregation Pattern

Each style category (flex, layout, typography, etc.) has an aggregator file that:
1. Imports all individual style definitions
2. Combines them into a single type and object
3. Exports a `build*` function

```typescript
// Example: flex/flex-style.ts
export type FlexStyle = typeof alignItems & typeof flex & /* ... */;

export const buildFlex = (): FlexStyle => {
  return {
    ...alignItems,
    ...flex,
    // ... combine all flex-related styles
  } as const;
};
```

### 4. Theme System

**Default Themes:**
- `defaultSpaces` - spacing scale (0, 0.25, 0.5, 1, 1.5, 2, ..., 32)
- `defualtSizes` - sizing scale (percentages, fractions, viewport units, auto)
- `defaultColors` - TailwindCSS color palette
- `defaultFontSizes` - text size scale

**Customization Flow:**
1. User calls `customize({ theme: { spacing: {...}, colors: {...} } })`
2. Custom values are stored in `customStylesDefined`
3. `composeStyles()` is called to rebuild all styles
4. Theme merging functions (`mergeSpaces`, `mergeSizes`, `mergeFontSizes`, `buildColors`) merge custom with defaults
5. All builder functions regenerate styles with merged theme

### 5. Style Application Flow

```typescript
// User writes:
const style = s`flex-row items-center p-4 bg-blue-500`;

// Internally:
// 1. Template literal parsed into array of class names
// 2. Each class name looked up in mainStyles object
// 3. Style objects collected into array
// 4. StyleSheet.flatten() merges them into single style object
// 5. Returned to user
```

---

## Development Rules

### Naming Conventions

**Class Names:**
- Follow TailwindCSS naming conventions where applicable
- Use kebab-case: `flex-row`, `items-center`, `bg-blue-500`
- Use abbreviations for directions: `m` (margin), `p` (padding), `t` (top), `b` (bottom), `l` (left), `r` (right), `x` (horizontal), `y` (vertical)
- Color classes: `{prefix}-{color}-{shade}` (e.g., `bg-blue-500`, `text-red-600`)

**File Names:**
- Use kebab-case: `flex-direction.ts`, `align-items.ts`
- Use descriptive names matching the React Native property they configure

**Function Names:**
- Builder functions: `build{Category}` (e.g., `buildMargins`, `buildFlex`)
- Merge functions: `merge{Theme}` (e.g., `mergeSpaces`, `mergeFontSizes`)

**Type Names:**
- Style types: `{Category}Style` (e.g., `FlexStyle`, `LayoutStyle`)
- Class types: `{Feature}Class` (e.g., `MarginClass`, `FlexDirectionsClass`)
- Use PascalCase for types

### TypeScript Patterns

**1. Const Assertions:**
Always use `as const` for static style objects to ensure precise types:

```typescript
export const flexDirections = {
  'flex-row': { flexDirection: 'row' },
} as const;
```

**2. Template Literal Types:**
Use for generated class names:

```typescript
export type MarginClass = `m${typeof positions[number]}-${keyof typeof spaces}`;
// Generates: "m-0" | "m-1" | "mt-0" | "mt-1" | "mb-0" | ...
```

**3. Type-Safe Lookups:**
Use `keyof` and index types to maintain type safety:

```typescript
export type FlexDirectionsClass = keyof typeof flexDirections;
```

**4. Union Types for Styles:**
Combine all style types into a single union:

```typescript
export type Styles = 
  | MarginStyles 
  | PaddingStyles 
  | FlexStyle 
  | LayoutStyle;
```

### Code Organization

**1. One Style Feature Per File:**
Each React Native style property or group of related properties gets its own file:
- `flex-direction.ts` - flexDirection property
- `margins.ts` - all margin properties (margin, marginTop, marginBottom, etc.)
- `background-color.ts` - backgroundColor property

**2. Category Aggregation:**
Each category folder has an aggregator file:
- `flex/flex-style.ts` - combines all flex styles
- `layout/layout.ts` - combines all layout styles
- `spacing/positions.ts` - shared position constants

**3. Shared Constants:**
Extract shared values into separate files:
- `spacing/positions.ts` - position prefixes for margins/paddings
- `spacing/spaces.ts` - spacing scale
- `sizing/sizes.ts` - sizing scale

### Adding New Styles

#### For Static Styles:

1. Create new file in appropriate category folder (e.g., `styles/layout/new-style.ts`)
2. Define style object with `as const`
3. Export type using `keyof typeof`
4. Import and add to category aggregator (e.g., `layout.ts`)
5. Add type to aggregator's type union
6. Add builder call to `mainStyles.ts`
7. Update `types.ts` to include new style in `Styles` union

Example:

```typescript
// styles/layout/new-style.ts
export const newStyles = {
  'new-class': { /* React Native style */ },
} as const;

export type NewStyleClass = keyof typeof newStyles;

// styles/layout/layout.ts
import { newStyles, NewStyleClass } from './new-style';

export type LayoutStyle = typeof display & typeof newStyles & /* ... */;

export const buildLayout = (): LayoutStyle => {
  return { ...display, ...newStyles, /* ... */ } as const;
};
```

#### For Dynamic Styles (with theme):

1. Create theme scale if needed (in `theme/` or style file)
2. Create builder function that generates styles from scale
3. If customizable, add merge function
4. Call merge function in `composeStyles()` before building
5. Follow same aggregation pattern as static styles

Example:

```typescript
// styles/category/scale.ts
export const defaultScale = { sm: 10, md: 20, lg: 30 } as const;

export const mergeScale = (): void => {
  scale = { ...defaultScale, ...customStylesDefined?.theme?.scale };
};

export let scale: typeof defaultScale;

// styles/category/new-style.ts
export const buildNewStyles = (): NewStyles => {
  const styles: NewStyles = {} as NewStyles;
  Object.keys(scale).forEach(key => {
    styles[`new-${key}`] = { property: scale[key] };
  });
  return styles;
};
```

### Testing Guidelines

- Tests should be placed in `__tests__` directories or as `.test.ts` files
- Run tests with: `yarn test`
- Coverage is collected automatically (see `jest.config.ts`)
- Test style generation, customization, and type safety

### Build Process

**Build Command:** `yarn compile` or `yarn prepare`

**Build Steps:**
1. TypeScript compiles `src/` to `dist/`
2. Target: ES2015
3. Module: CommonJS
4. Generates `.d.ts` declaration files for TypeScript users

**Output Structure:**
- Mirrors `src/` structure in `dist/`
- Each `.ts` file becomes `.js` + `.d.ts`
- Entry point: `dist/index.js` with types at `dist/index.d.ts`

### Code Quality

**Linting:** `yarn lint`
- ESLint with TypeScript support
- Prettier for formatting

**Formatting:** `yarn prettier`
- Checks code formatting
- Configured in project root

---

## Common Patterns Reference

### Creating Color-Based Styles

Use the `colorStyleBuilder` helper for any color-related properties:

```typescript
import { colorStyleBuilder } from '../../helpers/color-style-builder';

export type TextColorStyles = {
  [key: string]: { color: string };
};

export const buildTextColorStyles = (): TextColorStyles => {
  return colorStyleBuilder('text', 'color') as TextColorStyles;
};
```

This automatically generates classes like:
- `text-blue-500`, `text-red-600` (for color shades)
- `text-white`, `text-black` (for single colors)

### Creating Spacing Styles

Follow the margin/padding pattern:

```typescript
// 1. Define position abbreviations
const positions = ['', 't', 'b', 'l', 'r', 'x', 'y'] as const;

// 2. Map to React Native properties
const propertyMap = {
  '': 'margin',
  t: 'marginTop',
  // ...
};

// 3. Generate styles from spaces scale
export const buildMargins = (): MarginStyles => {
  const margins: MarginStyles = {} as MarginStyles;
  positions.forEach((p) => {
    Object.keys(spaces).forEach((s) => {
      margins[`m${p}-${s}`] = {
        [propertyMap[p]]: spaces[s],
      };
    });
  });
  return margins;
};
```

### Creating Size-Based Styles

Follow the width/height pattern:

```typescript
export const buildWidths = (): WidthStyle => {
  const widths: WidthStyle = {} as WidthStyle;
  Object.keys(sizes).forEach((s) => {
    widths[`w-${s}`] = { width: sizes[s] };
  });
  return widths;
};
```

---

## Style Initialization Order

The order in `composeStyles()` is important:

1. **Merge theme values first:**
   - `mergeSizes()` - sizing scale
   - `mergeSpaces()` - spacing scale
   - `mergeFontSizes()` - font size scale
   - `buildColors()` - color palette

2. **Then build all styles:**
   - Order doesn't matter for individual builders
   - All builders have access to merged theme values

3. **Combine into mainStyles:**
   - All built styles merged into single object
   - This object is used for class name lookups

---

## Customization API

Users customize the library like this:

```typescript
import { customize } from 'react-native-wind';

customize({
  theme: {
    spacing: {
      xs: 2,
      sm: 4,
      custom: 15,
    },
    sizing: {
      custom: '200px',
    },
    colors: {
      brand: {
        primary: '#FF6B6B',
        secondary: '#4ECDC4',
      },
      custom: '#123456',
    },
  },
  fontSize: {
    tiny: 10,
    huge: 48,
  },
});
```

This generates additional classes:
- `m-xs`, `p-custom` (from spacing)
- `w-custom`, `h-custom` (from sizing)
- `bg-brand-primary`, `text-custom` (from colors)
- Font size classes from fontSize config

---

## React Native Compatibility

- Library is React Native only (not web)
- Style properties must be valid React Native style properties
- No CSS-specific properties (e.g., no `display: grid`, no `position: sticky`)
- Use React Native naming: `backgroundColor` not `background-color`
- Percentage values as strings: `'50%'` not `50%`

---

## TypeScript Best Practices

1. **Always export types** for classes and styles
2. **Use const assertions** for static objects
3. **Use template literal types** for generated class names
4. **Keep types close to implementations** (same file when possible)
5. **Use type unions** to combine related types
6. **Leverage type inference** - don't over-annotate
7. **Use Record<> for dynamic objects** with string keys

---

## Performance Considerations

1. **Styles are pre-built** - no runtime generation
2. **StyleSheet.flatten()** is React Native's optimized merge function
3. **Customization rebuilds all styles** - call `customize()` once at app startup
4. **Class lookups are O(1)** - direct object property access
5. **Template literal parsing** is the only runtime cost

---

## Future Enhancement Patterns

When extending the library:

1. **Maintain TailwindCSS compatibility** where possible
2. **Keep the API simple** - utility classes, not components
3. **Prefer composition** over configuration
4. **Add tests** for new features
5. **Update types.ts** to include new styles in `Styles` union
6. **Document new classes** in main documentation
7. **Consider React Native limitations** (no CSS-only features)
8. **Follow existing naming conventions** for consistency

---

## Common Development Commands

```bash
# Development
yarn lint              # Run ESLint
yarn prettier          # Check formatting
yarn test             # Run tests with coverage
yarn compile          # Build TypeScript to JavaScript

# Building for release
yarn prepare          # Pre-publish build (runs automatically)
```

---

## Key Files to Understand

- `src/core/createStyle.ts` - Core `s` function that applies styles
- `src/core/mainStyles.ts` - Orchestrates style building
- `src/core/customize.ts` - Customization API
- `src/types.ts` - Global type definitions
- `src/theme/colors.ts` - Color palette management
- `src/helpers/color-style-builder.ts` - Color class generator

---

## Remember

- This is a **utility-first** library, not a component library
- Keep styles **atomic** - each class does one thing
- Maintain **type safety** - TypeScript should catch invalid classes
- Follow **TailwindCSS conventions** for familiarity
- Keep the API **simple and predictable**
- All styles are **pre-generated**, not runtime computed

