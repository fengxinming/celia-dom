import html from './prepare/html';
import hide from '../src/hide';

it('测试 hide', () => {
  document.body.innerHTML = html;
  let $div = document.querySelector('.test-empty');

  expect(hide($div).outerHTML).toEqual(
    expect.stringContaining('display: none;')
  );
});
