import html from './prepare/html';
import before from '../src/before';
import { beforeLegacy } from './prepare/legacy';

it('测试 before', () => {
  document.body.innerHTML = html;
  const $div = document.querySelector('.test-after');

  before($div.querySelector('.after'), '<div>123</div>');
  expect($div.innerHTML).toEqual(
    expect.stringContaining('<div>123</div>')
  );

  const dom = document.createElement('div');
  dom.innerHTML = '456';
  before($div.querySelector('.after'), dom);
  expect($div.innerHTML).toEqual(
    expect.stringContaining('<div>456</div>')
  );

  const dom2 = document.createElement('div');
  dom2.innerHTML = '789';
  before($div.querySelectorAll('.after'), dom2);
  expect($div.innerHTML).toEqual(
    expect.stringContaining('<div>789</div>')
  );

  beforeLegacy();
  dom2.innerHTML = '111';
  const $div4 = document.querySelector('.empty2');
  before($div4, dom2);
  expect($div4.parentNode.innerHTML).toBe('<div>111</div><div class="empty2"></div>');
});
