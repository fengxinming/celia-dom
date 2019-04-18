import './_internal/_proto/_classList';
import classesToArray from './_internal/_classesToArray';
import checkDom from './_internal/_checkDom';
import prop from './prop';

/**
 * 移除className
 * @param {Node|NodeList} dom
 * @param {String|Array} value
 */
export default function (dom, value) {
  if (arguments.length === 1) {
    return prop(dom, 'className', '');
  }
  const classes = classesToArray(value);
  checkDom(dom, (elem) => {
    elem.classList.remove(...classes);
  });
  return dom;
};
