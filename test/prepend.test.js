import forEach from 'kick-array/forEach';
import html from './prepare/html';
import prepend from '../src/prepend';
import { prependLegacy } from './prepare/legacy';

it('测试 prepend', () => {
  document.body.innerHTML = html;

  const $div = document.querySelector('.test-append');
  prepend($div, '<div>123</div>');
  expect($div.innerHTML).toBe('<div>123</div>');

  prepend($div, '<div>456</div>');
  expect($div.innerHTML).toBe('<div>456</div><div>123</div>');

  const $div2 = document.querySelectorAll('.test-append');
  const $child = document.createElement('div');
  $child.innerHTML = '789';
  prepend($div2, $child);
  forEach($div2, (el) => {
    expect(el.innerHTML).toEqual(
      expect.stringContaining('<div>789</div>')
    );
  });

  prependLegacy();
  const $div3 = document.querySelector('.test-after2');
  prepend($div3, '<div></div>');
  expect($div3.innerHTML).toBe('<div></div><div class="after"></div><div class="after"></div>');
});
