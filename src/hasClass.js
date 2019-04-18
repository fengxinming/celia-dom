import forEach from 'celia/_internal/_array/_forEach';
import './_internal/_proto/_classList';
import classesToArray from './_internal/_classesToArray';
import checkDom from './_internal/_checkDom';

/**
 * 判断节点是否包含指定className
 * @param {Node|NodeList} dom
 * @param {String|Array} value
 */
export default function (dom, value) {
  let exists = false;
  const args = classesToArray(value);
  checkDom(dom, (elem) => {
    forEach(args, (arg) => {
      exists = elem.classList.contains(arg);
      return !exists;
    });
    return !exists;
  });
  return exists;
};
