export default function (dom, method) {
  while ((dom = dom[method]) && dom.nodeType !== 1) { }
  return dom;
}
