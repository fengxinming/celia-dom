import append from 'celia/_internal/_array/_append';
import isFunction from 'celia/isFunction';
import childNodes from './_internal/_childNodes';
import checkDom from './_internal/_checkDom';

export default function (dom, fn) {
  const nodes = [];
  if (!isFunction(fn)) {
    fn = elem => append(nodes, elem);
  }
  checkDom(dom, (elem) => {
    childNodes(elem, fn);
  });
  return nodes;
}
