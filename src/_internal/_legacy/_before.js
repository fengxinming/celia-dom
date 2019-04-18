export default function (elem, fragment) {
  const parentNode = elem.parentNode;
  if (parentNode) {
    parentNode.insertBefore(fragment, elem);
  }
}
