import checkDom from './_internal/_checkDom';

export default function (dom) {
  checkDom(dom, (elem) => {
    if (elem.nodeType === 1) {
      if ('textContent' in elem) {
        elem.textContent = '';
      } else {
        let firstChild;
        while ((firstChild = elem.firstChild)) {
          elem.removeChild(firstChild);
        }
      }
    }
  });
}
