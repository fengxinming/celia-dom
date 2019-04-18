'use strict';

const fs = require('fs');
const path = require('path');
const buble = require('rollup-plugin-buble');
const alias = require('rollup-plugin-alias');
const cjs = require('rollup-plugin-commonjs');
const replace = require('rollup-plugin-replace');
const node = require('rollup-plugin-node-resolve');
const flow = require('rollup-plugin-flow-no-whitespace');
const { uglify } = require('rollup-plugin-uglify');

const {
  version
} = require('../../package.json');

const DIST_FILENAME = exports.DIST_FILENAME = 'kick-dom';

const banner = exports.banner =
  '/*!\n' +
  ' * ' + DIST_FILENAME + '.js v' + version + '\n' +
  ' * (c) 2018-' + new Date().getFullYear() + ' Jesse Feng\n' +
  ' * Released under the MIT License.\n' +
  ' */';

const resolve = exports.resolve = p => path.resolve(__dirname, '..', '..', p);

exports.sourceDir = fs
  .readdirSync(resolve('src'))
  .filter(file => file.indexOf('_') && file.lastIndexOf('.js') === -1);

exports.genConfig = function (name, opts) {
  const {
    inputOptions,
    outputOptions,
    aliases,
    replaceAll,
    compress = false
  } = opts;
  inputOptions.plugins = [
    replace(Object.assign({
      __VERSION__: version
    }, replaceAll)),
    flow(),
    buble(),
    alias(Object.assign({
      '@': resolve('./')
    }, aliases)),
    node({
      mainFields: ['module', 'main']
    }),
    cjs(),
    compress && uglify({
      toplevel: true,
      output: {
        ascii_only: true,
        preamble: banner
      },
      compress: {
        pure_funcs: ['makeMap']
      }
    })
  ].concat(inputOptions.plugins || []);

  outputOptions.banner = banner;
  outputOptions.freeze = false;
  // outputOptions.exports = 'named';
  if (!outputOptions.name) {
    outputOptions.name = DIST_FILENAME;
  }

  Object.defineProperty(opts, '_name', {
    enumerable: false,
    value: name
  });

  return opts;
};
