import defineElementProto from 'celia/_internal/_defineElementProto';
import firstElementChild from '../_legacy/_firstElementChild';

defineElementProto('firstElementChild', {
  get() {
    return firstElementChild(this);
  }
});
