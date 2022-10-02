const path = require('path');

const webpackConfig = {
  cache: {
    type: 'filesystem',
    allowCollectingMemory: true,
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  optimization: {
    minimize: false,
    moduleIds: 'named',
  },
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, '../dist'),
  },
  externals: {
    jquery: '$',
    diff2html: 'Diff2Html',
    diff: 'Diff',
    lodash: '_',
  },
  module: {
    rules: [
      {
        test: /\.([tj])s$/,
        use: {
          loader: 'esbuild-loader',
          options: {
            loader: 'ts',
            target: 'chrome86',
            charset: 'utf8',
          },
        },
      },
    ],
  },
};

module.exports = webpackConfig;
