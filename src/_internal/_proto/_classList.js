import forEach from 'celia/_internal/_array/_forEach';
import append from 'celia/_internal/_array/_append';
import defineElementProto from 'celia/_internal/_defineElementProto';
import classesToArray from '../_classesToArray';

function setClassName(elem, classes, cb) {
  let curClasses = classesToArray(elem.className);
  let oprClasses = curClasses.concat();
  forEach(classes, (cls) => {
    oprClasses = cb(oprClasses, cls);
  });
  curClasses = curClasses.join(' ');
  oprClasses = oprClasses.join(' ');
  if (curClasses !== oprClasses) {
    elem.className = oprClasses;
  }
}

class ClassList {

  constructor(elem) {
    this.elem = elem;
  }

  add() {
    setClassName(this.elem, arguments, (oprClasses, cls) => {
      if (oprClasses.indexOf(cls) === -1) {
        append(oprClasses, cls);
      }
      return oprClasses;
    });
  }

  remove() {
    setClassName(this.elem, arguments, (oprClasses, cls) => {
      const idx = oprClasses.indexOf(cls);
      if (idx > -1) {
        oprClasses.splice(idx, 1);
      }
      return oprClasses;
    });
  }

  contains(cls) {
    let curClasses = classesToArray(this.elem.className);
    return curClasses.indexOf(cls) > -1;
  }

};

defineElementProto('classList', {
  get() {
    return new ClassList(this);
  }
});

export default ClassList;
