// Mock React Native's StyleSheet for testing
jest.mock('react-native', () => ({
  StyleSheet: {
    flatten: (styles) => {
      if (Array.isArray(styles)) {
        return styles.reduce((acc, style) => ({ ...acc, ...style }), {});
      }
      return styles;
    },
    create: (styles) => styles,
  },
}));

// Polyfill performance.now() for Node.js test environment
if (typeof performance === 'undefined') {
  global.performance = {
    now: () => {
      const [seconds, nanoseconds] = process.hrtime();
      return seconds * 1000 + nanoseconds / 1000000;
    },
  };
}
