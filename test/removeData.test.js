import html from './prepare/html';
import data from '../src/data';
import removeData from '../src/removeData';

it('测试 removeData', () => {
  document.body.innerHTML = html;
  let $div = document.querySelector('.test-after');

  data($div, 'test', 'test1');
  expect(data($div, 'test')).toBe('test1');

  $div = document.querySelector('.test-append');
  data($div, {
    key1: 'key1',
    key2: 'key2'
  });
  expect(data($div)).toEqual(
    expect.objectContaining({
      key1: 'key1'
    })
  );
  data($div, 'test2', 'test2');
  expect(data($div, 'test2')).toBe('test2');

  data($div, {
    key3: 'key3',
    key4: 'key4'
  });
  expect(data($div)).toEqual(
    expect.objectContaining({
      key4: 'key4'
    })
  );

  removeData($div, 'key3', 'key4');
  expect(data($div, 'test2')).toBe('test2');

  removeData($div);
  expect(data($div, 'test2')).toBeUndefined();
});
