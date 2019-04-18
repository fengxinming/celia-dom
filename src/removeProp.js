import { propFix } from './_internal/_domConsts';
import checkDom from './_internal/_checkDom';

/**
 * 删除属性
 * @param {Node|NodeList} dom
 * @param {String} name
 * @param {*} val
 */
export default function (dom, name) {
  checkDom(dom, (elem) => {
    delete elem[propFix[name] || name];
  });
  return dom;
}
