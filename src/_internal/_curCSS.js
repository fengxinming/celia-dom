import getStyles from './_getStyles';

export default function (elem, name, computed) {
  computed = computed || getStyles(elem);
  let ret = '';
  if (computed) {
    ret = computed.getPropertyValue(name) || computed[name];
  }
  return ret;
}
