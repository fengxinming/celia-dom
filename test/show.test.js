import html from './prepare/html';
import show from '../src/show';

it('测试 show', () => {
  document.body.innerHTML = html;
  let $div = document.querySelector('.test-show');

  expect(show($div).outerHTML).toEqual(
    expect.not.stringContaining('display: none;')
  );
});
