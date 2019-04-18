import content from './prepare/html';
import prevAll from '../src/prevAll';

it('测试 prevAll', () => {
  document.body.innerHTML = content;
  let $div = document.querySelector('.empty1');

  expect(prevAll($div)[0].innerHTML).toBe('<div class="empty2"></div>');
});
