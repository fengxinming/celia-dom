import './_internal/_proto/_previousElementSibling';
import dir from './_internal//_dir';

export default function (dom, fn) {
  return dir(dom, 'nextElementSibling', fn, true);
}
