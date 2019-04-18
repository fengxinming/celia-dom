import isFunction from 'celia/isFunction';
import forEach from 'celia/_internal/_array/_forEach';
import append from 'celia/_internal/_array/_append';
import checkDom from './_internal/_checkDom';

export default function (dom, selector, fn) {
  const arr = [];
  if (!isFunction(fn)) {
    fn = elem => append(arr, elem);
  }
  checkDom(dom, elem => forEach(elem.querySelectorAll(selector), fn));
  return arr;
}
