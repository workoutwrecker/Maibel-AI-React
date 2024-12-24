/* eslint-env node */
// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Resolve Cannot access 'computedOffsetXValueWithAutoFillData' before initialization
config.resolver.resolveRequest = (context, realModuleName, platform) => {
  if (realModuleName === 'react-native-reanimated-carousel') {
    return {
      filePath: path.resolve(__dirname, 'node_modules/react-native-reanimated-carousel/lib/module/index.js'),
      type: 'sourceFile',
    };
  }
  return context.resolveRequest(context, realModuleName, platform);
};

module.exports = config;