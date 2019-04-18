import content from './prepare/html';
import nextAll from '../src/nextAll';

it('测试 nextAll', () => {
  document.body.innerHTML = content;
  let $div = document.querySelector('.after');

  expect(nextAll($div)[0].outerHTML).toBe('<div class="after"></div>');
});
