import isUndefined from 'celia/isUndefined';

let expandoSequence = 1;
const expandoKey = 'expando9527';
const cache = {};

function nextId() {
  return ++expandoSequence;
}

export default function (element, key, value) {
  let expandoId = element[expandoKey];
  let exStore = cache[expandoId || -1];

  if (!isUndefined(value)) {
    if (!exStore) {
      element[expandoKey] = expandoId = nextId();
      exStore = cache[expandoId] = {};
    }
    exStore[key] = value;
  } else {
    return exStore && exStore[key];
  }
}
