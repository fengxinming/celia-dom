import isUndefined from 'celia/isUndefined';
import forEach from 'kick-array/forEach';
import remove from 'kick-array/remove';
import expandoStore from './_internal/_expandoStore';
import checkDom from './_internal/_checkDom';

const removeEventListenerFn = window.removeEventListener ?
  (element, type, fn) => {
    element.removeEventListener(type, fn, false);
  } :
  (element, type, fn) => {
    element.detachEvent(`on${type}`, fn);
  };

/**
 * 移除dom事件
 * @param {Node|NodeList} dom
 * @param {String} types
 * @param {Function} fn
 */
export default function (dom, types, fn) {
  checkDom(dom, (element) => {
    let events = expandoStore(element, 'events');
    let handle = expandoStore(element, 'handle');

    if (!handle) {
      return; // 没有注册事件
    }
    if (isUndefined(types)) {
      forEach(events, (eventHandler, type) => {
        removeEventListenerFn(element, type, eventHandler);
        delete events[type];
      });
    } else {
      forEach(types.split(' '), (type) => {
        if (isUndefined(fn)) {
          removeEventListenerFn(element, type, events[type]);
          delete events[type];
        } else {
          remove(events[type], fn);
        }
      });
    }
  });
  return dom;
}
