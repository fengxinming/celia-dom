import { manip } from './_internal/_checkDom';
import createDocumentFragment from './_internal/_createDocumentFragment';
import support from './_internal/_support';
import firstElementChild from './_internal/_legacy/_firstElementChild';
/**
 * 在dom包裹一层
 * @param {Node|NodeList} dom
 * @param {String} html
 */
export default function (dom, html) {
  if (html) {
    html = createDocumentFragment(html);
    // 方便做单元测试
    const { before } = support;
    const wrap = (elem, fragment) => {
      // 插入之后文档碎片中的内容被清空
      before(elem, fragment);
      fragment = elem.previousElementSibling;

      // 找到末尾节点
      let el;
      while ((el = firstElementChild(fragment))) {
        fragment = el;
      }
      fragment.appendChild(elem);
    };
    manip(dom, elem => wrap(elem, html.cloneNode(true)), elem => wrap(elem, html));
  }
  return dom;
}
