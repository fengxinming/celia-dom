import isUndefined from 'celia/isUndefined';
import checkDom, { firstNode } from './_internal/_checkDom';

function getAttribute(dom, k) {
  dom = firstNode(dom);
  return dom && dom.getAttribute(k);
}
function setAttribute(dom, k, v) {
  checkDom(dom, (elem) => {
    elem.setAttribute(k, v);
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
    getAttribute(dom, key) :
    setAttribute(dom, key, val);
}
