import html from './prepare/html';
import hasClass from '../src/hasClass';
import ClassList from '../src/_internal/_proto/_classList';

it('测试 hasClass', () => {
  document.body.innerHTML = html;
  let $div = document.querySelector('.test-empty');

  expect(hasClass($div, 'test-empty')).toBe(true);
  expect(hasClass($div, 'test-after')).toBe(false);

  const classList = new ClassList($div);
  expect(classList.contains('test-empty')).toBe(true);
  expect(classList.contains('test-after')).toBe(false);
});
