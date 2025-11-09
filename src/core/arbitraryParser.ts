import { StyleValue } from '../types';

/**
 * Mapping of class prefixes to React Native style properties
 * Used to convert arbitrary value class names to style objects
 */
const prefixToStyleMap: Record<string, string> = {
  // Margin
  m: 'margin',
  mt: 'marginTop',
  mb: 'marginBottom',
  ml: 'marginLeft',
  mr: 'marginRight',
  mx: 'marginHorizontal',
  my: 'marginVertical',
  ms: 'marginStart',
  me: 'marginEnd',

  // Padding
  p: 'padding',
  pt: 'paddingTop',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
  pr: 'paddingRight',
  px: 'paddingHorizontal',
  py: 'paddingVertical',
  ps: 'paddingStart',
  pe: 'paddingEnd',

  // Positioning
  top: 'top',
  bottom: 'bottom',
  left: 'left',
  right: 'right',
  start: 'start',
  end: 'end',

  // Gaps
  gap: 'gap',
  'gap-x': 'columnGap',
  'gap-y': 'rowGap',
  'row-gap': 'rowGap',
  'col-gap': 'columnGap',

  // Width
  w: 'width',
  'min-w': 'minWidth',
  'max-w': 'maxWidth',

  // Height
  h: 'height',
  'min-h': 'minHeight',
  'max-h': 'maxHeight',

  // Colors - Background
  bg: 'backgroundColor',

  // Colors - Text
  text: 'color',

  // Colors - Border
  'border-color': 'borderColor',
  'border-t-color': 'borderTopColor',
  'border-b-color': 'borderBottomColor',
  'border-l-color': 'borderLeftColor',
  'border-r-color': 'borderRightColor',
  'border-s-color': 'borderStartColor',
  'border-e-color': 'borderEndColor',

  // Colors - Shadow
  'shadow-color': 'shadowColor',

  // Colors - Text Shadow
  'text-shadow-color': 'textShadowColor',

  // Colors - Tint
  tint: 'tintColor',

  // Colors - Overlay
  overlay: 'overlayColor',

  // Colors - Outline
  'outline-color': 'outlineColor',

  // Typography - Font Size
  'text-size': 'fontSize',

  // Typography - Line Height
  leading: 'lineHeight',

  // Typography - Letter Spacing
  tracking: 'letterSpacing',

  // Layout - Opacity
  opacity: 'opacity',

  // Layout - Z-Index
  z: 'zIndex',

  // Border Radius (general)
  rounded: 'borderRadius',
  'rounded-t': 'borderTopLeftRadius',
  'rounded-b': 'borderBottomLeftRadius',
  'rounded-l': 'borderLeftRadius',
  'rounded-r': 'borderRightRadius',
  'rounded-tl': 'borderTopLeftRadius',
  'rounded-tr': 'borderTopRightRadius',
  'rounded-bl': 'borderBottomLeftRadius',
  'rounded-br': 'borderBottomRightRadius',
  'rounded-s': 'borderStartRadius',
  'rounded-e': 'borderEndRadius',
  'rounded-ss': 'borderStartStartRadius',
  'rounded-se': 'borderStartEndRadius',
  'rounded-es': 'borderEndStartRadius',
  'rounded-ee': 'borderEndEndRadius',

  // Border Width
  border: 'borderWidth',
  'border-t': 'borderTopWidth',
  'border-b': 'borderBottomWidth',
  'border-l': 'borderLeftWidth',
  'border-r': 'borderRightWidth',
  'border-s': 'borderStartWidth',
  'border-e': 'borderEndWidth',

  // Shadow properties
  'shadow-opacity': 'shadowOpacity',
  'shadow-radius': 'shadowRadius',
  'shadow-offset-x': 'shadowOffsetWidth',
  'shadow-offset-y': 'shadowOffsetHeight',

  // Text shadow properties
  'text-shadow-radius': 'textShadowRadius',
  'text-shadow-offset-x': 'textShadowOffsetWidth',
  'text-shadow-offset-y': 'textShadowOffsetHeight',

  // Elevation (Android)
  elevation: 'elevation',

  // Aspect Ratio
  aspect: 'aspectRatio',

  // Outline properties
  'outline-width': 'outlineWidth',
  'outline-offset': 'outlineOffset',
};

/**
 * Special handling for prefixes that map to multiple properties
 */
const multiPropertyPrefixes: Record<string, string[]> = {
  'rounded-t': ['borderTopLeftRadius', 'borderTopRightRadius'],
  'rounded-b': ['borderBottomLeftRadius', 'borderBottomRightRadius'],
  'rounded-l': ['borderTopLeftRadius', 'borderBottomLeftRadius'],
  'rounded-r': ['borderTopRightRadius', 'borderBottomRightRadius'],
};

/**
 * Set of properties that should treat unitless numbers as pixels
 * Using a Set for O(1) lookup performance instead of array.includes() O(n)
 */
const pixelPropertiesSet = new Set([
  'margin',
  'marginTop',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'marginHorizontal',
  'marginVertical',
  'marginStart',
  'marginEnd',
  'padding',
  'paddingTop',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'paddingHorizontal',
  'paddingVertical',
  'paddingStart',
  'paddingEnd',
  'top',
  'bottom',
  'left',
  'right',
  'start',
  'end',
  'gap',
  'rowGap',
  'columnGap',
  'width',
  'height',
  'minWidth',
  'maxWidth',
  'minHeight',
  'maxHeight',
  'fontSize',
  'lineHeight',
  'letterSpacing',
  'borderRadius',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
  'borderStartRadius',
  'borderEndRadius',
  'borderStartStartRadius',
  'borderStartEndRadius',
  'borderEndStartRadius',
  'borderEndEndRadius',
  'borderLeftRadius',
  'borderRightRadius',
  'borderWidth',
  'borderTopWidth',
  'borderBottomWidth',
  'borderLeftWidth',
  'borderRightWidth',
  'borderStartWidth',
  'borderEndWidth',
  'shadowRadius',
  'shadowOffsetWidth',
  'shadowOffsetHeight',
  'textShadowRadius',
  'textShadowOffsetWidth',
  'textShadowOffsetHeight',
  'outlineWidth',
  'outlineOffset',
  'elevation',
]);

/**
 * Parse a value string and convert it to the appropriate type
 * Supports: px, %, hex colors, rgb/rgba, and unitless numbers
 */
function parseValue(
  rawValue: string,
  styleProperty: string,
  isNegative: boolean,
): string | number | null {
  const trimmed = rawValue.trim();

  // Handle hex colors
  if (trimmed.startsWith('#')) {
    // Validate hex format
    if (/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(trimmed)) {
      return trimmed;
    }
    return null;
  }

  // Handle rgb/rgba colors
  if (trimmed.startsWith('rgb(') || trimmed.startsWith('rgba(')) {
    // Basic validation - check for balanced parentheses
    if (trimmed.endsWith(')')) {
      return trimmed;
    }
    return null;
  }

  // Handle pixel values (with or without 'px' suffix)
  if (trimmed.endsWith('px')) {
    const num = parseFloat(trimmed);
    if (isNaN(num)) return null;
    return isNegative ? -num : num;
  }

  // Handle percentage values
  if (trimmed.endsWith('%')) {
    if (isNegative) {
      // Negative percentages: prepend minus sign to the string
      return `-${trimmed}`;
    }
    return trimmed;
  }

  // Handle rem values (convert to approximate pixel equivalent, 1rem = 16px)
  if (trimmed.endsWith('rem')) {
    const num = parseFloat(trimmed);
    if (isNaN(num)) return null;
    const pixels = num * 16;
    return isNegative ? -pixels : pixels;
  }

  // Handle unitless numbers
  const num = parseFloat(trimmed);
  if (!isNaN(num)) {
    // For certain properties, treat unitless numbers as pixels
    // Use Set.has() for O(1) lookup instead of array.includes() O(n)
    if (pixelPropertiesSet.has(styleProperty)) {
      return isNegative ? -num : num;
    }

    // For other properties (like opacity, zIndex, aspectRatio), use the raw number
    return isNegative ? -num : num;
  }

  // Unable to parse
  return null;
}

/**
 * Parses an arbitrary value class name and returns the corresponding style object
 * Supports patterns like: h-[240], bg-[#f1354a], -mt-[10]
 * Also supports platform-prefixed arbitrary values: ios:h-[240], android:bg-[#ff0000]
 *
 * @param className - The class name to parse (e.g., "h-[240]", "ios:bg-[#ff0000]")
 * @returns Style object if successfully parsed, null otherwise
 */
export function parseArbitraryValue(className: string): StyleValue | null {
  // Strip platform prefix if present (defensive - createStyle.ts should already do this)
  // Examples: ios:h-[240] -> h-[240], android:bg-[#ff0000] -> bg-[#ff0000]
  let baseClassName = className;
  const platformPrefixRegex = /^(ios|android):(.+)$/;
  const platformMatch = platformPrefixRegex.exec(className);

  if (platformMatch) {
    baseClassName = platformMatch[2]; // Extract class without platform prefix
  }

  // Pattern: optional minus sign, prefix, opening bracket, value, closing bracket
  // Examples: h-[240], -mt-[10], bg-[#ff0000]
  const regex = /^(-)?([a-z-]+)-\[([^\]]+)\]$/;
  const match = regex.exec(baseClassName);

  if (!match) {
    return null;
  }

  const [, negativeSign, prefix, rawValue] = match;
  const isNegative = negativeSign === '-';

  const isSupported = prefixToStyleMap[prefix] || multiPropertyPrefixes[prefix];
  if (!isSupported) {
    return null;
  }

  // Special handling for 'text' prefix
  // 'text-[value]' should map to fontSize if value is numeric, but to color if it's a color
  let styleProperty = prefixToStyleMap[prefix];
  if (prefix === 'text') {
    const trimmed = rawValue.trim();
    // If it looks like a color (hex or rgb), use color property
    if (
      trimmed.startsWith('#') ||
      trimmed.startsWith('rgb(') ||
      trimmed.startsWith('rgba(')
    ) {
      styleProperty = 'color';
    } else {
      // Otherwise, it's a font size
      styleProperty = 'fontSize';
    }
  }

  // Special handling for 'border' prefix
  // 'border-[value]' could be color or width
  if (prefix === 'border') {
    const trimmed = rawValue.trim();
    // If it looks like a color, use borderColor
    if (
      trimmed.startsWith('#') ||
      trimmed.startsWith('rgb(') ||
      trimmed.startsWith('rgba(')
    ) {
      styleProperty = 'borderColor';
    }
    // Otherwise, use borderWidth (already set)
  }

  // Handle multi-property prefixes (e.g., rounded-t sets both borderTopLeftRadius and borderTopRightRadius)
  if (multiPropertyPrefixes[prefix]) {
    const properties = multiPropertyPrefixes[prefix];
    const parsedValue = parseValue(rawValue, properties[0], isNegative);

    if (parsedValue === null) {
      return null;
    }

    const result: Record<string, string | number> = {};
    properties.forEach((prop) => {
      result[prop] = parsedValue;
    });

    return result as StyleValue;
  }

  const parsedValue = parseValue(rawValue, styleProperty, isNegative);

  if (parsedValue === null) {
    return null;
  }

  return { [styleProperty]: parsedValue } as StyleValue;
}
