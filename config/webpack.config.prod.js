const { merge } = require('webpack-merge');
const UserScriptMetaDataPlugin = require('userscript-metadata-webpack-plugin');

const metadata = require('./metadata');
const webpackConfig = require('./webpack.config.base');

const cfg = merge({}, webpackConfig, {
  mode: 'production',
  output: {
    filename: metadata.name + '.prod.user.js',
  },
  plugins: [
    new UserScriptMetaDataPlugin({
      metadata,
    }),
  ],
});

module.exports = cfg;
