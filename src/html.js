import isNil from 'celia/isNil';
import checkDom, { firstNode } from './_internal/_checkDom';
import empty from './empty';
import append from './append';

export default function (dom, val) {
  if (!isNil(val)) {
    const callback = val.nodeType === 1 ? function (elem) {
      empty(elem);
      append(elem, val);
    } : function (elem) {
      elem.innerHTML = String(val);
    };
    checkDom(dom, callback);
    return dom;
  } else {
    dom = firstNode(dom);
    return dom && dom.innerHTML;
  }
}
