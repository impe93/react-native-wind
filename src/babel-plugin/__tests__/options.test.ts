/**
 * Plugin options tests
 * Tests different plugin configuration options
 */

import pluginTester from 'babel-plugin-tester';
import plugin from '../index';

pluginTester({
  plugin,
  pluginName: 'react-native-wind-extract (options)',
  filename: __filename,

  tests: {
    'respects extractStatic: false option': {
      code: `
        import { s } from 'react-native-wind';
        const style = s\`flex items-center p-4\`;
      `,
      pluginOptions: {
        extractStatic: false,
      },
      snapshot: false,
    },

    'respects extractPartial: false option': {
      code: `
        import { s } from 'react-native-wind';
        const dynamic = 'bg-blue-500';
        const style = s\`flex \${dynamic} items-center\`;
      `,
      pluginOptions: {
        extractPartial: false,
      },
      snapshot: false,
    },

    'still transforms static when partial is disabled': {
      code: `
        import { s } from 'react-native-wind';
        const style = s\`flex items-center p-4\`;
      `,
      pluginOptions: {
        extractPartial: false,
      },
      snapshot: true,
    },

    'still transforms partial when static is disabled': {
      code: `
        import { s } from 'react-native-wind';
        const dynamic = 'bg-blue-500';
        const style = s\`flex \${dynamic} items-center\`;
      `,
      pluginOptions: {
        extractStatic: false,
      },
      snapshot: true,
    },

    'disables all transformations': {
      code: `
        import { s } from 'react-native-wind';
        const style1 = s\`flex items-center p-4\`;
        const dynamic = 'bg-blue-500';
        const style2 = s\`flex \${dynamic} items-center\`;
      `,
      pluginOptions: {
        extractStatic: false,
        extractPartial: false,
      },
      snapshot: false,
    },
  },
});
