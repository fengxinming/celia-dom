import checkDom from './_internal/_checkDom';

/**
 * 移除自己
 * @param {Node|NodeList} dom
 */
export default function (dom) {
  checkDom(dom, (elem) => {
    const parentNode = elem.parentNode;
    if (parentNode) {
      parentNode.removeChild(elem);
    }
  });
  return dom;
}
