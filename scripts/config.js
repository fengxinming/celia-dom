'use strict';

const fs = require('fs');
const Path = require('path');
const { genConfig } = require('./config/_util');

exports.getAllBuilds = () => {
  let mods = [];
  fs.readdirSync(Path.join(__dirname, 'config'))
    .filter(file => file.indexOf('_util') === -1)
    .forEach((key) => {
      require(`./config/${key}`)
        .forEach((config) => {
          mods[mods.length] = genConfig(key, config);
        });
    });
  return mods;
};
