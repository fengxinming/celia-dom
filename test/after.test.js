import html from './prepare/html';
import after from '../src/after';
import { afterLegacy } from './prepare/legacy';

it('测试 after', () => {
  document.body.innerHTML = html;
  const $div = document.querySelector('.test-after');

  after($div.querySelector('.after'), '<div>123</div>');
  expect($div.innerHTML).toEqual(
    expect.stringContaining('<div>123</div>')
  );

  const dom = document.createElement('div');
  dom.innerHTML = '456';
  after($div.querySelector('.after'), dom);
  expect($div.innerHTML).toEqual(
    expect.stringContaining('<div>456</div>')
  );

  const dom2 = document.createElement('div');
  dom2.innerHTML = '789';
  after($div.querySelectorAll('.after'), dom2);
  expect($div.innerHTML).toEqual(
    expect.stringContaining('<div>789</div>')
  );

  dom2.innerHTML = '789';
  after($div.querySelectorAll('.after'), dom2);
  expect($div.innerHTML).toEqual(
    expect.stringContaining('<div>789</div>')
  );

  afterLegacy();
  dom2.innerHTML = '111';
  const $div4 = document.querySelector('.empty2');
  after($div4, dom2);
  expect($div4.parentNode.innerHTML).toBe('<div class="empty2"></div><div>111</div>');
});
