'use strict';

const { resolve, DIST_FILENAME, sourceDir } = require('./_util');

function configure(input, output) {
  return {
    isProd: true,
    inputOptions: {
      input: resolve(input)
    },
    outputOptions: {
      file: resolve(output),
      format: 'umd',
      legacy: false,
      esModule: false
    }
  };
}

module.exports = [
  configure('src/index.js', `npm/dist/${DIST_FILENAME}.js`),
  ...sourceDir.map(dir => configure(`src/${dir}.js`, `npm/dist/${dir}.js`))
];
