import forEach from 'kick-array/forEach';
import html from './prepare/html';
import empty from '../src/empty';

it('测试 empty', () => {
  document.body.innerHTML = html;
  let $div = document.querySelector('.test-empty');

  empty($div);
  expect($div.innerHTML).toBe('');

  document.body.innerHTML = html;
  $div = document.querySelectorAll('.test-append');

  empty($div);
  forEach($div, (el) => {
    expect(el.innerHTML).toBe('');
  });

  empty(document);
});
