import content from './prepare/html';
import remove from '../src/remove';

it('测试 remove', () => {
  document.body.innerHTML = content;
  let $div = document.querySelectorAll('.after');
  remove($div);
  expect(document.querySelector('.test-after').innerHTML).toBe('');

  $div = document.querySelector('.empty1');
  remove($div);
  expect(document.querySelector('.test-empty').innerHTML).toBe('<div class="empty"><div class="empty2"></div></div>');
});
