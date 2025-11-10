/**
 * Platform-specific transformation tests
 * Tests ios: and android: prefix handling
 */

import pluginTester from 'babel-plugin-tester';
import plugin from '../index';

pluginTester({
  plugin,
  pluginName: 'react-native-wind-extract (platform)',
  filename: __filename,

  tests: {
    'transforms ios-prefixed classes': {
      code: `
        import { s } from 'react-native-wind';
        const style = s\`ios:m-4 ios:p-2\`;
      `,
      snapshot: true,
    },

    'transforms android-prefixed classes': {
      code: `
        import { s } from 'react-native-wind';
        const style = s\`android:m-4 android:p-2\`;
      `,
      snapshot: true,
    },

    'transforms mixed platform and regular classes': {
      code: `
        import { s } from 'react-native-wind';
        const style = s\`flex items-center ios:p-4 android:p-2\`;
      `,
      snapshot: true,
    },

    'handles platform-specific arbitrary values': {
      code: `
        import { s } from 'react-native-wind';
        const style = s\`ios:h-[240] android:h-[200]\`;
      `,
      snapshot: true,
    },

    'handles complex platform scenarios': {
      code: `
        import { s } from 'react-native-wind';
        const style = s\`m-4 p-2 bg-blue-500 ios:m-2 android:m-1 ios:p-6\`;
      `,
      snapshot: true,
    },

    'adds Platform import when needed': {
      code: `
        import { s } from 'react-native-wind';
        const style = s\`ios:m-4 android:m-2\`;
      `,
      snapshot: true,
    },

    'does not add Platform import if already imported': {
      code: `
        import { s } from 'react-native-wind';
        import { Platform } from 'react-native';
        const style = s\`ios:m-4 android:m-2\`;
      `,
      snapshot: true,
    },
  },
});
