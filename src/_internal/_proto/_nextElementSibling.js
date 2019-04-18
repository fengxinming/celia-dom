import defineElementProto from 'celia/_internal/_defineElementProto';
import sibling from '../_sibling';

defineElementProto('nextElementSibling', {
  get() {
    return sibling(this, 'nextSibling');
  }
});
