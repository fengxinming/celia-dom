import content from './prepare/html';
import on from '../src/on';

it('测试 on', () => {
  document.body.innerHTML = content;
  let $div = document.querySelector('.test-after');
  on($div, 'click', () => {
    $div.appendChild(document.createElement('div'));
  });
  $div.click();
  expect($div.innerHTML).toBe('<div class="after"></div><div class="after"></div><div></div>');
});
