import domManip from './_internal/_domManip';

/**
 * 向node节点添加新元素
 * @param {Node|Node} dom
 * @param  {...any} args
 */
export default function (dom, ...args) {
  return domManip(dom, args, 'append');
}
