# react-native-wind

## What is it?

This library comes from the need to write the style of an application in a quick and simple way, using a concise and easy to remember API.

React Native Wind is strongly inspired by [TailwindCSS](https://tailwindcss.com/) and, as you will see, even the names of the classes used are often the same.

React Native Wind is a utility-first style library that offers a low-level API. By using this approach you avoid writing the same style rules over and over again. These rules can be composed to create most of your necessary styles.

### Key Features

- 🎨 **Utility-first styling** - Compose styles using concise class names
- 📱 **Platform-specific styles** - Write iOS and Android specific styles with `ios:` and `android:` prefixes
- 🎯 **Arbitrary values** - Use custom values with bracket syntax (e.g., `h-[240]`, `bg-[#ff0000]`)
- ⚡ **High performance** - Optimized with LRU caching and efficient parsing
- 🚀 **Build-time optimization** - Optional Babel plugin for 80%+ performance improvement
- 🎛️ **Customizable** - Extend default theme with your own colors, spacing, and more

## Performance Optimization (Optional)

For maximum performance, enable build-time extraction by adding the Babel plugin to your `babel.config.js`:

```javascript
module.exports = {
  plugins: [
    'react-native-wind/babel'
  ]
};
```

This transforms style computations at build time for ~80% average performance improvement. See `OPTIMIZATION.md` for details.

## Documentation

On the official documentation you can find all the information on how to use the library.

Link: [reactnativewind.com](http://www.reactnativewind.com)

## License

React Native Wind is MIT licensed, as found in the [LICENSE](/LICENSE) file.
