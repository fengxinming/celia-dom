import isUndefined from 'celia/isUndefined';
import forEach from 'kick-array/forEach';
import expandoStore from './_internal/_expandoStore';
import checkDom from './_internal/_checkDom';

const addEventListenerFn = window.addEventListener ?
  (dom, name, fn) => {
    dom.addEventListener(name, fn, false);
  } : (dom, name, fn) => {
    dom.attachEvent(`on${name}`, fn);
  };

function createEventHandler(element, events) {
  const eventHandler = (event) => {
    if (!event.preventDefault) {
      event.preventDefault = () => {
        event.returnValue = false; // ie
      };
    }

    if (!event.stopPropagation) {
      event.stopPropagation = () => {
        event.cancelBubble = true; // ie
      };
    }

    if (!event.target) {
      event.target = event.srcElement || document; // ie
    }

    if (isUndefined(event.defaultPrevented)) {
      let prevent = event.preventDefault;
      prevent = prevent.bind(event);
      event.preventDefault = function () {
        event.defaultPrevented = true;
        prevent();
      };
      event.defaultPrevented = false;
    }

    event.isDefaultPrevented = () => {
      return event.defaultPrevented || event.returnValue === false;
    };

    // return false 将中断后面的事件触发
    forEach(events[event.type], fn => fn.call(element, event));

    try {
      delete event.preventDefault;
      delete event.stopPropagation;
      delete event.isDefaultPrevented;
    } catch (e) {
      // ie
      event.preventDefault = null;
      event.stopPropagation = null;
      event.isDefaultPrevented = null;
    }
  };
  eventHandler.elem = element;
  return eventHandler;
}

/**
 * 添加dom事件
 * @param {Node|NodeList} dom
 * @param {String} types
 * @param {Function} fn
 */
export default function (dom, types, fn) {
  checkDom(dom, (element) => {
    let events = expandoStore(element, 'events');
    let handle = expandoStore(element, 'handle');

    if (!events) {
      expandoStore(element, 'events', events = {});
    };
    if (!handle) {
      expandoStore(element, 'handle', handle = createEventHandler(element, events));
    };
    types.split(' ').forEach((type) => {
      let eventFns = events[type];
      // 减少事件绑定
      if (!eventFns) {
        addEventListenerFn(element, type, handle);
        eventFns = events[type] = [];
      }
      eventFns[eventFns.length] = fn;
    });
  });
  return dom;
}
