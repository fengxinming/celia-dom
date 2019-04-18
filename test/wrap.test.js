import forEach from 'kick-array/forEach';
import html from './prepare/html';
import wrap from '../src/wrap';

describe('测试 wrap', () => {
  beforeAll(() => {
    document.body.innerHTML = html;
  });

  it('测试支持 firstElementChild', () => {
    let $div = document.querySelector('.test-append');
    wrap($div, '<div class="parent"></div>');
    expect($div.parentNode.outerHTML).toBe('<div class="parent"><div class="test-append"></div></div>');

    $div = document.querySelectorAll('.test-attr');
    wrap($div, '<div class="parent"><div class="parent2"></div></div>');
    forEach($div, (el) => {
      expect(el.parentNode.outerHTML).toBe('<div class="parent2"><div class="test-attr"></div></div>');
    });

    wrap();
  });
});
