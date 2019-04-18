import forEach from 'kick-array/forEach';
import html from './prepare/html';
import prop from '../src/prop';

it('测试 prop', () => {
  document.body.innerHTML = html;

  const $div = document.querySelector('.test-attr');
  prop($div, 'id', 'myname');
  expect($div.outerHTML).toBe('<div class="test-attr" id="myname"></div>');

  expect(prop($div, 'id')).toBe('myname');

  const $div2 = document.querySelectorAll('.test-attr');
  forEach($div2, (el) => {
    expect($div.outerHTML).toBe('<div class="test-attr" id="myname"></div>');
  });
});
