import isString from 'celia/isString';
import { rnothtmlwhiteRE } from './_domRegex';

export default function (value) {
  if (Array.isArray(value)) {
    return value;
  } else if (isString(value)) {
    return value.match(rnothtmlwhiteRE) || [];
  }
  return [];
}
