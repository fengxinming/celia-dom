import isUndefined from 'celia/isUndefined';
import { propFix } from './_internal/_domConsts';
import checkDom, { firstNode } from './_internal/_checkDom';

function getProperty(dom, k) {
  dom = firstNode(dom);
  return dom && dom[k];
}
function setProperty(dom, k, v) {
  k = propFix[k] || k;
  checkDom(dom, (elem) => {
    elem[k] = v;
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
    getProperty(dom, key) :
    setProperty(dom, key, val);
}
