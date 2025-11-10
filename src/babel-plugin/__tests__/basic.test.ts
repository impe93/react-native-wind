/**
 * Basic transformation tests
 * Tests fundamental static template transformations
 */

import pluginTester from 'babel-plugin-tester';
import plugin from '../index';

pluginTester({
  plugin,
  pluginName: 'react-native-wind-extract',
  filename: __filename,

  tests: {
    'leaves code without s imports unchanged': {
      code: `
        const style = { margin: 16 };
      `,
      snapshot: false,
    },

    'transforms fully static template': {
      code: `
        import { s } from 'react-native-wind';
        const style = s\`flex items-center p-4\`;
      `,
      snapshot: true,
    },

    'transforms multiple static templates': {
      code: `
        import { s } from 'react-native-wind';
        const style1 = s\`flex\`;
        const style2 = s\`items-center\`;
        const style3 = s\`p-4\`;
      `,
      snapshot: true,
    },

    'handles renamed import': {
      code: `
        import { s as style } from 'react-native-wind';
        const myStyle = style\`flex items-center\`;
      `,
      snapshot: true,
    },

    'handles single class': {
      code: `
        import { s } from 'react-native-wind';
        const style = s\`flex\`;
      `,
      snapshot: true,
    },

    'handles whitespace normalization': {
      code: `
        import { s } from 'react-native-wind';
        const style = s\`flex    items-center     p-4\`;
      `,
      snapshot: true,
    },

    'handles empty template': {
      code: `
        import { s } from 'react-native-wind';
        const style = s\`\`;
      `,
      snapshot: true,
    },

    'handles arbitrary values': {
      code: `
        import { s } from 'react-native-wind';
        const style = s\`h-[240] w-[350] bg-[#ff0000]\`;
      `,
      snapshot: true,
    },

    'does not transform without import': {
      code: `
        const s = (strings) => strings;
        const style = s\`flex items-center\`;
      `,
      snapshot: false,
    },

    'handles multiple files with separate state': {
      code: `
        import { s } from 'react-native-wind';
        const style1 = s\`flex\`;
      `,
      snapshot: true,
    },
  },
});
