'use strict';

const { existsSync, mkdirSync } = require('fs');
const { copy } = require('fs-extra');
const { getConsole } = require('corie-logger');
const logger = getConsole('celia');
const { resolve } = require('./config/_util');

function copyFile(src, dest) {
  copy(src, dest, (error) => {
    if (error) {
      logger.error(error);
      throw error;
    }
  });
}

module.exports = () => {
  const distDir = resolve('npm');
  if (!existsSync(distDir)) {
    mkdirSync(distDir);
  }
  copyFile(resolve('package.json'), resolve('npm/package.json'));
  copyFile(resolve('README.md'), resolve('npm/README.md'));
  const src = resolve('src');
  copyFile(src, distDir);
};
