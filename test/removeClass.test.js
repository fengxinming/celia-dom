import forEach from 'kick-array/forEach';
import html from './prepare/html';
import removeClass from '../src/removeClass';
import ClassList from '../src/_internal/_proto/_classList';

describe('测试 removeClass', () => {

  beforeAll(() => {
    document.body.innerHTML = html;
  });

  it('测试支持classList', () => {

    const $div = document.querySelector('.test-remove-class');
    removeClass($div, 'class2');
    expect($div.className).toBe('test-remove-class class1');

    const $div2 = document.querySelectorAll('.test-remove-class');
    removeClass($div2, 'class1 class2');
    forEach($div2, (el) => {
      expect(el.className).toBe('test-remove-class');
    });
  });

  it('测试不支持classList', () => {
    const $div = document.querySelector('.test-remove-class2');
    const classList = new ClassList($div);

    classList.remove('class2');
    expect($div.className).toBe('test-remove-class2 class1');

    const $div2 = document.querySelectorAll('.test-remove-class2');
    forEach($div2, (el) => {
      const cl = new ClassList(el);
      cl.remove('class1', 'class2');
      expect(el.className).toBe('test-remove-class2');
    });

  });

  it('移除所有', () => {

    const $div = document.querySelector('.test-remove-class2');
    removeClass($div);
    expect($div.outerHTML).toBe('<div class=""></div>');

  });

});
