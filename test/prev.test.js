import content from './prepare/html';
import prev from '../src/prev';

it('测试 prev', () => {
  document.body.innerHTML = content;
  let $div = document.querySelector('.empty1');

  expect(prev($div)[0].innerHTML).toBe('<div class="empty2"></div>');

  delete $div.previousElementSibling;
  expect(prev($div)[0].innerHTML).toBe('<div class="empty2"></div>');
});
