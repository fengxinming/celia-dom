'use strict';

const { EOL } = require('os');
const { writeFile, readdirSync, existsSync } = require('fs');
const { relative, join } = require('path');
const { promisify } = require('util');
const rollup = require('rollup');
const zlib = require('zlib');
const rimraf = require('rimraf');
const { getConsole } = require('corie-logger');
const { minify } = require('uglify-js');
const cp = require('./cp');

let builds = require('./config').getAllBuilds();
const { resolve, sourceDir, banner } = require('./config/_util');

const gzip = promisify(zlib.gzip);
const writeFileify = promisify(writeFile);
const logger = getConsole('celia');

if (process.argv[2]) {
  const filters = process.argv[2].split(',');
  builds = builds.filter((b) => {
    return filters.some(f => b._name.indexOf(f) > -1);
  });
}

/**
 * 编译所有的js
 * @param {Array} builds 配置数组
 */
async function build(builds) {
  rimraf.sync(resolve('npm/**'));
  sourceDir.concat('index').forEach((mod) => {
    mod = resolve(`src/${mod}.js`);
    rimraf.sync(mod);
    logger.info(`remove file: ${mod}`);
  });
  const srcDir = resolve('src');
  // 把单独的文件夹打包成js
  if (!existsSync(join(srcDir, 'index.js'))) {
    await createIndex(srcDir);
  }
  cp();
  const total = builds.length;
  for (let i = 0; i < total; i++) {
    try {
      await buildSrc(builds[i]);
    } catch (e) {
      logger.error(e);
      break;
    }
  }
  const dirList = readdirSync(srcDir);
  dirList
    .forEach((file) => {
      if (file !== 'index.js' && file.lastIndexOf('.js') > -1) {
        file = file.slice(0, -3);
        if (dirList.indexOf(file) === -1) {
          console.log('-', file);
        }
      }
    });
  sourceDir
    .forEach((dir) => {
      readdirSync(join(srcDir, dir))
        .forEach((file) => {
          console.log('-', `${dir}/${file.slice(0, -3)}`);
        });
    });
}

build(builds);

/**
 * 打包单个配置
 * @param {Object} config 单个配置
 */
async function buildSrc(config) {
  const {
    inputOptions,
    outputOptions,
    isProd = false
  } = config;

  const bundle = await rollup.rollup(inputOptions);
  const { output } = await bundle.write(outputOptions);

  const {
    file,
    dir
  } = outputOptions;

  if (!dir) {
    write(file, output[0].code, isProd);
  } else {
    output.forEach(({ code, fileName }) => {
      write(join(dir, fileName), code, isProd);
    });
  }
}

/**
 * 些入文件
 * @param {String} file
 * @param {String} code
 * @param {String} isProd
 */
async function print(file, code, isProd) {
  const zipped = await gzip(code);
  const extra = isProd ? `(gzipped: ${getSize(zipped)})` : '';
  logger.info(relative(process.cwd(), file), getSize(code), extra || '');
}
/**
 * 些入文件
 * @param {String} file
 * @param {String} code
 * @param {String} isProd
 */
async function write(file, code, isProd) {
  await print(file, code, isProd);
  if (isProd) {
    file = file.replace('.js', '.min.js');
    code = minify(code, {
      toplevel: true,
      output: {
        ascii_only: true,
        preamble: banner
      },
      compress: {
        pure_funcs: ['makeMap']
      }
    }).code;
    writeFile(file, code, (err) => {
      if (err) {
        throw err;
      }
      print(file, code, isProd);
    });
  }
}

/**
 * 获取文件大小
 * @param {String} code
 */
function getSize(code) {
  return (code.length / 1024).toFixed(2) + 'kb';
}

/**
 * 创建js文件
 * @param {Array} files
 * @param {String} parent
 * @param {String} dest
 */
async function createFile(files, parent, dest) {
  let importString = '';
  let exportString = `export default {${EOL}`;
  files.forEach((file) => {
    const name = file.slice(0, -3);
    importString += `import ${name} from '.${parent}/${file}';${EOL}`;
    exportString += `  ${name},${EOL}`;
  });
  exportString = `${exportString.slice(0, -2)}${EOL}};${EOL}`;
  await writeFileify(dest, importString + exportString).then(() => {
    logger.info(relative(process.cwd(), dest), getSize(exportString));
  }, (err) => {
    logger.error(err);
  });
}

/**
 * 根据目录创建对应的js文件
 * @param {String} srcDir
 */
async function createIndex(srcDir) {
  const files = readdirSync(srcDir);
  const promises = files
    .filter(file =>
      file.lastIndexOf('.js') === -1 &&
      file.indexOf('_'))
    .map(dir => createFile(
      readdirSync(join(srcDir, dir)).filter(f => f.lastIndexOf('.proto.js') === -1),
      `/${dir}`,
      join(srcDir, `${dir}.js`))
    );
  await Promise.all(promises);

  const jses = readdirSync(srcDir).filter(file =>
    ['index.js', 'dom.js', 'browser.js'].indexOf(file) === -1 &&
    file.lastIndexOf('.js') > 0);
  await createFile(jses, '', join(srcDir, 'index.js'));
}
