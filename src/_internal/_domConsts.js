export const propFix = {
  'for': 'htmlFor',
  'class': 'className'
};
[
  'tabIndex',
  'readOnly',
  'maxLength',
  'cellSpacing',
  'cellPadding',
  'rowSpan',
  'colSpan',
  'useMap',
  'frameBorder',
  'contentEditable'
].forEach((prop) => {
  propFix[prop.toLowerCase()] = prop;
});

export const testEl = document.createElement('div');

let cssPrefixes = ['Webkit', 'Moz', 'ms'];
let emptyStyle = testEl.style;

export function vendorPropName(name) {
  if (name in emptyStyle) {
    return name;
  }
  let capName = name[0].toUpperCase() + name.slice(1);
  let i = cssPrefixes.length;
  while (i--) {
    name = cssPrefixes[i] + capName;
    if (name in emptyStyle) {
      return name;
    }
  }
}
