import forEach from 'celia/_internal/_array/_forEach';
export default function (dom, cb) {
  forEach(dom.childNodes, (elem, i) => {
    let j = 0;
    if (elem.nodeType === 1) {
      cb(elem, j++, i);
    }
  });
}
