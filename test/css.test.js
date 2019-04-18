import html from './prepare/html';
import css from '../src/css';

it('测试 css', () => {
  document.body.innerHTML = html;
  const $div = document.querySelector('.test-after > .after');

  css($div, 'display', 'none');
  expect($div.outerHTML).toBe('<div class="after" style="display: none;"></div>');

  css($div, {
    display: 'block'
  });
  expect($div.outerHTML).toBe('<div class="after" style="display: block;"></div>');

  const display = css($div, 'display');
  expect(display).toBe('block');

  expect(css(null, 'display')).toBe('');
});
