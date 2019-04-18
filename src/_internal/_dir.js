import isFunction from 'celia/isFunction';
import append from 'celia/_internal/_array/_append';
import checkDom from './_checkDom';

export default function (dom, prop, fn, all) {
  const arr = [];
  if (!isFunction(fn)) {
    fn = elem => elem && append(arr, elem);
  }
  const cb = all ? (elem) => {
    let ret;
    while (ret !== false && (elem = elem[prop])) {
      ret = fn(elem);
    }
    return ret;
  } : elem => fn(elem[prop]);
  checkDom(dom, cb);
  return arr;
}
