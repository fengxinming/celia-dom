import checkDom from './_internal/_checkDom';
import expandoStore from './_internal/_expandoStore';
import forEach from 'celia/_internal/_array/_forEach';

/**
 * 缓存数据
 * @param {Node|NodeList} dom
 * @param  {...String} args
 */
export default function (dom, ...args) {
  const callback = args[0] ? function (element) {
    let data = expandoStore(element, 'data');
    data && forEach(args, (arg) => {
      delete data[arg];
    });
  } : function () {
    expandoStore(dom, 'data', {});
  };
  checkDom(dom, callback);
  return dom;
}
