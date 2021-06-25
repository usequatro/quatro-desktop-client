var path = require('path');
var webpack = require('webpack');
var packageJson = require('../package.json');

console.log(`🌟 Quatro desktop client version ${packageJson.version}`);

module.exports = {
  mode: 'production',
  entry: './injected-scripts/index.js',
  output: {
    path: path.resolve(__dirname, '../build/injected-scripts'),
    filename: 'index.bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.QUATRO_DESKTOP_CLIENT_VERSION': JSON.stringify(packageJson.version),
    }),
  ],
  resolve: {
    fallback: {
      fs: false,
    },
  },
};
