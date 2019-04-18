import prepend from './_legacy/_prepend';
import after from './_legacy/_after';
import before from './_legacy/_before';

function append(elem, fragment) {
  elem.appendChild(fragment);
}

const { body } = document;

const support = {
  append,
  prepend,
  after,
  before,
  createContextualFragment: window.Range && 'createContextualFragment' in window.Range.prototype
};

['prepend', 'after', 'before'].forEach((fn) => {
  if (fn in body) {
    support[fn] = (elem, val) => elem[fn](val);
  }
});

export default support;
