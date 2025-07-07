/* eslint-disable @typescript-eslint/no-require-imports */
 
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    assetExts: assetExts.filter((extension) => extension !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
    // Fix for duplicate dependency resolution
    unstable_enablePackageExports: true,
    // Resolve node_modules dependencies properly
    nodeModulesPaths: [path.resolve(__dirname, 'node_modules')],
    // Block problematic nested node_modules
    blockList: [
      // Block nested @react-native packages that cause conflicts
      /node_modules\/@react-native\/metro-config\/node_modules\/@react-native\/.*/,
    ],
  },
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
    unstable_allowRequireContext: true,
  },
  // Ensure proper watching of node_modules
  watchFolders: [path.resolve(__dirname, 'node_modules')],
};

module.exports = mergeConfig(defaultConfig, config);
