import isUndefined from 'celia/isUndefined';
import checkDom from './_checkDom';
import expandoStore from './_expandoStore';
import curCSS from './_curCSS';

export default function (dom, show) {
  checkDom(dom, (elem) => {
    const display = elem.style.display || '';
    let originalDisplay = expandoStore(elem, 'display');
    if (isUndefined(originalDisplay)) {
      expandoStore(elem, 'display', display);
      originalDisplay = display;
    }
    if (show) {
      // 未在元素上设置display
      if (!display) {
        // 获取渲染后的display
        const cssDisplay = curCSS(elem, 'display');
        if (cssDisplay === 'none') {
          elem.style.display = 'block';
        }
      } else if (display === 'none') {
        elem.style.display = originalDisplay === 'none' ? '' : originalDisplay;
      }
    } else {
      elem.style.display = 'none';
    }
  });
  return dom;
}
