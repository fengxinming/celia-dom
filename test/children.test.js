import html from './prepare/html';
import children from '../src/children';

it('测试 children', () => {
  document.body.innerHTML = html;
  const $div = document.querySelector('.test-after');
  children($div).forEach((el) => {
    expect(el.outerHTML).toBe('<div class="after"></div>');
  });
});
