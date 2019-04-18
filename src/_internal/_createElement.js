import forOwn from 'celia/object/forOwn';
import { singleTagRE, fragmentRE } from './_domRegex';
import childNodes from './_childNodes';
import { testEl } from './_domConsts';
import support from './_support';

export default function (html, props, fn) {
  let matches = html.match(singleTagRE);
  if (matches) {
    const dom = document.createElement(matches[1]);
    forOwn(props, (prop, key) => {
      dom.setAttribute(key, prop);
    });
    fn(dom);
  } else if (fragmentRE.test(html)) {
    const newEl = testEl.cloneNode();
    // 使用高级特性
    if (support.createContextualFragment) {
      const range = document.createRange();
      newEl.appendChild(range.createContextualFragment(html));
    } else {
      newEl.innerHTML = html;
    }
    childNodes(newEl, fn);
  } else {
    fn(document.createTextNode(html));
  }
}
