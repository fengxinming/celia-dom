'use strict';

const { resolve, DIST_FILENAME } = require('./_util');

function configure() {
  return {
    inputOptions: {
      input: resolve('src/index.js')
    },
    outputOptions: {
      file: resolve(`npm/dist/${DIST_FILENAME}.es.js`),
      format: 'es'
    }
  };
}

module.exports = [
  configure()
];
