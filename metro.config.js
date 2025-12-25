const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require('path');

const config = getDefaultConfig(__dirname);

// Workaround for Monorepo hoisting issues:
// Point the project root explicitly to the current directory
config.projectRoot = __dirname;
config.watchFolders = [__dirname, path.resolve(__dirname, '..')];

module.exports = withNativeWind(config, { input: "./global.css" });
