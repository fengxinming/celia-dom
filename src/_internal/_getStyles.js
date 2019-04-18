export default function (elem) {
  let view = elem.ownerDocument.defaultView;
  if (!view || !view.opener) {
    view = window;
  }
  return view.getComputedStyle(elem);
};
