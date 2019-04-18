import content from './prepare/html';
import off from '../src/off';
import on from '../src/on';

it('测试 off', () => {
  document.body.innerHTML = content;
  let $div = document.querySelector('.test-after');
  on($div, 'click', () => {
    $div.appendChild(document.createElement('div'));
  });
  $div.click();
  expect($div.innerHTML).toBe('<div class="after"></div><div class="after"></div><div></div>');

  off($div, 'click');
  $div.click();
  expect($div.innerHTML).toBe('<div class="after"></div><div class="after"></div><div></div>');
});
