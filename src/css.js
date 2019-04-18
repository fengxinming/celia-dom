import isUndefined from 'celia/isUndefined';
import isObject from 'celia/isObject';
import forOwn from 'celia/_internal/_object/_forOwn';
import checkDom, { firstNode } from './_internal/_checkDom';
import style from './_internal/_style';
import curCSS from './_internal/_curCSS';

function getter(dom, k) {
  dom = firstNode(dom);
  return dom ? curCSS(dom, k) : '';
}

function setter(dom, k, v) {
  checkDom(dom, (elem) => {
    style(elem, k, v);
  });
  return dom;
}

function objSetter(dom, obj) {
  forOwn(obj, (val, key) => {
    setter(dom, key, val);
  });
  return dom;
}

/**
 * 读取或者设置属性
 * @param {Node|NodeList} dom
 * @param {String} key
 * @param {*} val
 */
export default function (dom, key, val) {
  return isUndefined(val) ?
    isObject(key) ?
      objSetter(dom, key) :
      getter(dom, key) :
    setter(dom, key, val);
}
