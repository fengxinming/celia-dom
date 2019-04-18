import createDocumentFragment from './_createDocumentFragment';
import { manip } from './_checkDom';
import support from './_support';

/**
 * 操作dom节点
 * @param {Node|NodeList} list
 * @param {Array} args 待添加的元素
 * @param {String} method 操作函数
 * @param {Function} fallback 兼容方法
 */
export default function (list, args, method) {
  if (list) {
    // 统一转成DocumentFragment
    let fragment = createDocumentFragment(args);
    method = support[method];
    manip(
      list,
      elem => method(elem, fragment.cloneNode(true)),
      elem => method(elem, fragment)
    );
  }
  return list;
}
