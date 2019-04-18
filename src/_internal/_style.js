import isNil from 'celia/isNil';
import camelCase from 'celia/camelCase';
import { vendorPropName } from './_domConsts';

const cssProps = {};

export default function (elem, origName, value) {
  origName = camelCase(origName);
  let style = elem.style;
  origName = cssProps[origName] || (cssProps[origName] = vendorPropName(origName) || origName);
  if (isNil(value)) {
    return style[origName];
  } else {
    style[origName] = value;
  }
}
