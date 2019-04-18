import forEach from 'kick-array/forEach';
import html from './prepare/html';
import append from '../src/append';

it('测试 append', () => {
  document.body.innerHTML = html;

  const $div = document.querySelector('.test-append');
  append($div, '<div>123</div>');
  expect($div.innerHTML).toBe('<div>123</div>');

  append($div, '<div>456</div>');
  expect($div.innerHTML).toBe('<div>123</div><div>456</div>');

  const $div2 = document.querySelectorAll('.test-append');
  const $child = document.createElement('div');
  $child.innerHTML = '789';
  append($div2, $child);
  forEach($div2, (el) => {
    expect(el.innerHTML).toEqual(
      expect.stringContaining('<div>789</div>')
    );
  });
});
