import checkDom from './_internal/_checkDom';
import classesToArray from './_internal/_classesToArray';

/**
 * 删除属性
 * @param {Node|NodeList} dom
 * @param {String} key
 */
export default function (dom, key) {
  const attrNames = classesToArray(key);
  checkDom(dom, (elem) => {
    attrNames.forEach((attrName) => {
      elem.removeAttribute(attrName);
    });
  });
  return dom;
}
