module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ['nativewind/babel',
    [
      // <-- this
      'react-native-reanimated/plugin',
      {
        globals: ['__scanCodes'],
      },
    ],
  ],
};
