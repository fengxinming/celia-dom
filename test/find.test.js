import html from './prepare/html';
import find from '../src/find';

it('测试 find 方法', () => {
  document.body.innerHTML = html;
  let $div = document.querySelector('.test-empty');
  expect(find($div, 'div').length).toBe(4);
  expect(find($div, '.test').length).toBe(0);

  const arr = [];
  find($div, 'div', (elem) => {
    arr.push(elem);
  });
  expect(arr.length).toBe(4);
});
