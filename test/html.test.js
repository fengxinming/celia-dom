import content from './prepare/html';
import html from '../src/html';

it('测试 html', () => {
  document.body.innerHTML = content;
  let $div = document.querySelector('.empty');

  expect(html($div)).toBe('<div class="empty2"></div>');

  $div = document.querySelector('.test-append');
  html($div, '123');
  expect($div.innerHTML).toBe('123');

  $div = document.querySelector('.after');
  html($div, document.createElement('div'));
  expect($div.innerHTML).toBe('<div></div>');
});
