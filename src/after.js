import domManip from './_internal/_domManip';

/**
 * 在node节点之后添加新元素
 * @param {Node|NodeList} dom
 * @param  {...any} args
 */
export default function (dom, ...args) {
  return domManip(dom, args, 'after');
}
