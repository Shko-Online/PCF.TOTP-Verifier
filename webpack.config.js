/* eslint-disable no-undef */
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
/**
 * This works if you have at least one commit in your git repository 
 */
const revision = require('child_process').execSync('git rev-parse HEAD').toString().trim();
/**
 * This is the public endpoint of your sourcemap repository 
 */
const sourcemapRepository = 'https://sourcemaps.xrm.al/PCF/TOTPVerifierSourcemaps/';

module.exports = {
  devtool: false,
  resolve: {
    fallback: {
      crypto: require.resolve("crypto-browserify"),
      //otplib: require.resolve("@otplib/preset-browser"),
      stream: require.resolve('stream-browserify'),

    },
  },

  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      // prevent creating split bundles, since the PCF runtime cannot handle chunked bundles
      // neither does the control manifest and our tooling have support to build and package chunked bundles (e.g. no SoPa support)
      maxChunks: 1,
    }),
    new webpack.SourceMapDevToolPlugin({
      /* This instructs your bundle.js to read the correct revision sourcemaps from the repository */
      append: `\n//# sourceMappingURL=${sourcemapRepository}${revision}/[url]`,
      filename: '[name].map',
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer']
    }),
    new webpack.DefinePlugin({
      Buffer: require("buffer/").Buffer
    })

  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          /* this is necessary to generate sourcemaps when you minify/obfuscate your source code */
          sourceMap: true,
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
};
