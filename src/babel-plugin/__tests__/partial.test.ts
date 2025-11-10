/**
 * Partial template transformation tests
 * Tests templates with interpolations (dynamic parts)
 */

import pluginTester from 'babel-plugin-tester';
import plugin from '../index';

pluginTester({
  plugin,
  pluginName: 'react-native-wind-extract (partial)',
  filename: __filename,

  tests: {
    'transforms template with single interpolation': {
      code: `
        import { s } from 'react-native-wind';
        const dynamic = 'bg-blue-500';
        const style = s\`flex \${dynamic} items-center\`;
      `,
      snapshot: true,
    },

    'transforms template with multiple interpolations': {
      code: `
        import { s } from 'react-native-wind';
        const color = 'bg-blue-500';
        const spacing = 'p-4';
        const style = s\`flex \${color} \${spacing} items-center\`;
      `,
      snapshot: true,
    },

    'transforms conditional interpolation': {
      code: `
        import { s } from 'react-native-wind';
        const isActive = true;
        const style = s\`flex items-center \${isActive ? 'bg-blue-500' : 'bg-gray-500'}\`;
      `,
      snapshot: true,
    },

    'handles interpolation at start': {
      code: `
        import { s } from 'react-native-wind';
        const dynamic = 'flex';
        const style = s\`\${dynamic} items-center p-4\`;
      `,
      snapshot: true,
    },

    'handles interpolation at end': {
      code: `
        import { s } from 'react-native-wind';
        const dynamic = 'p-4';
        const style = s\`flex items-center \${dynamic}\`;
      `,
      snapshot: true,
    },

    'handles only static parts (no dynamic content)': {
      code: `
        import { s } from 'react-native-wind';
        const dynamic = '';
        const style = s\`flex \${dynamic} items-center\`;
      `,
      snapshot: true,
    },

    'does not transform fully dynamic template': {
      code: `
        import { s } from 'react-native-wind';
        const classes = 'flex items-center p-4';
        const style = s\`\${classes}\`;
      `,
      snapshot: false,
    },

    'handles complex expressions in interpolation': {
      code: `
        import { s } from 'react-native-wind';
        const getColor = () => 'bg-blue-500';
        const style = s\`flex \${getColor()} items-center\`;
      `,
      snapshot: true,
    },

    'preserves TypeScript type assertions': {
      code: `
        import { s } from 'react-native-wind';
        const dynamic = 'bg-blue-500' as string;
        const style = s\`flex \${dynamic} items-center\`;
      `,
      snapshot: true,
    },
  },
});
