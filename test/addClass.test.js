import forEach from 'kick-array/forEach';
import html from './prepare/html';
import addClass from '../src/addClass';
import ClassList from '../src/_internal/_proto/_classList';

describe('测试 addClass', () => {

  beforeAll(() => {
    document.body.innerHTML = html;
  });

  it('测试支持classList', () => {

    const $div = document.querySelector('.test-after');
    addClass($div, 'class2');
    expect($div.className).toBe('test-after class2');

    const $div2 = document.querySelectorAll('.test-after');
    addClass($div2, 'class1 class2');
    forEach($div2, (el) => {
      expect(el.className).toEqual(
        expect.stringMatching(/class1|class2/)
      );
    });
  });

  it('测试不支持classList', () => {
    const $div = document.querySelector('.test-after2');
    const classList = new ClassList($div);
    classList.add('class2');
    expect($div.className).toBe('test-after2 class2');

    classList.add('class1');
    expect($div.className).toBe('test-after2 class2 class1');

    const $div2 = document.querySelectorAll('.test-after2');
    forEach($div2, (el) => {
      const cl = new ClassList(el);
      cl.add(el, 'class1', 'class2');
      expect(el.className).toEqual(
        expect.stringMatching(/class1|class2/)
      );
    });
  });

});
