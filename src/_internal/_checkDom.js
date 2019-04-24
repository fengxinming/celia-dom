import forEach from 'celia/_internal/_array/_forEach';
import forSlice from 'celia/_internal/_array/_forSlice';
import isWindow from 'celia/isWindow';
import isArrayLike from 'celia/isArrayLike';

export function firstNode(dom) {
  return dom && (dom.length > -1 ? dom[0] : dom);
}

export function manip(dom, mcallback, callback) {
  let elem, last;
  if (isArrayLike(dom)) {
    forSlice(dom, 0, (last = dom.length - 1), mcallback);
    elem = dom[last];
  } else {
    elem = dom;
  }
  elem && callback(elem);
  return dom;
}

export default function (dom, callback) {
  if (dom) {
    if (isArrayLike(dom) && !isWindow(dom)) {
      forEach(dom, callback);
    } else {
      callback(dom);
    }
  }
  return dom;
}
