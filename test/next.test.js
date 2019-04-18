import content from './prepare/html';
import next from '../src/next';
import sibling from '../src/_internal/_legacy/_sibling';

it('测试 next', () => {
  document.body.innerHTML = content;
  let $div = document.querySelector('.after');

  expect(next($div)[0].outerHTML).toBe('<div class="after"></div>');

  expect(sibling($div, 'nextSibling').outerHTML).toBe('<div class="after"></div>');
});
