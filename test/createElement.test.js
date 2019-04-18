import createElement from '../src/createElement';
import support from '../src/_internal/_support';

describe('测试 createElement 方法', () => {

  it('测试支持 createContextualFragment', () => {
    expect(createElement('<div>')[0].outerHTML).toBe('<div></div>');
    expect(createElement('<div></div>')[0].outerHTML).toBe('<div></div>');
    expect(createElement('test')[0].nodeType).toBe(window.Node.TEXT_NODE);
  });

  it('测试不支持支持 createContextualFragment', () => {
    support.createContextualFragment = false;

    expect(createElement('<div>')[0].outerHTML).toBe('<div></div>');
    expect(createElement('<div></div>')[0].outerHTML).toBe('<div></div>');
    expect(createElement('test')[0].nodeType).toBe(window.Node.TEXT_NODE);
  });

});
