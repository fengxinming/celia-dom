import html from './prepare/html';
import prop from '../src/prop';
import removeProp from '../src/removeProp';

it('测试 removeProp', () => {
  document.body.innerHTML = html;

  const $div = document.querySelector('.test-attr');
  prop($div, 'name', 'myname');
  expect($div.name).toBe('myname');

  removeProp($div, 'name');
  expect($div.name).toBeUndefined();
});
