import isFunction from 'celia/isFunction';
import append from 'celia/_internal/_array/_append';
import createElement from './_internal/_createElement';

export default function (html, props, fn) {
  if (isFunction(props)) {
    fn = props;
    props = null;
  }
  if (isFunction(fn)) {
    return createElement(html, props, fn);
  }
  const arr = [];
  createElement(html, props, (el) => {
    append(arr, el);
  });
  return arr;
}
