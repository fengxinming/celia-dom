import content from './prepare/html';
import parent from '../src/parent';

it('测试 parent', () => {
  document.body.innerHTML = content;
  let $div = document.querySelector('.after');
  expect(parent($div)[0].className).toBe('test-after');
});
