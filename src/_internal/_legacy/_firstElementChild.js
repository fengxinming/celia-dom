export default function (elem) {
  let node;
  const nodes = elem.childNodes;
  let i = 0;
  while ((node = nodes[i++]) && node.nodeType !== 1) { }
  return node;
}
