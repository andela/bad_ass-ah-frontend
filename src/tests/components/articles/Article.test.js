import React from 'react';
import { shallow } from 'enzyme';
import { CreateArticle } from '../../../components/articles/CreateArticle';

const props = {
  createArticle: jest.fn(),
  create: jest.fn(),
  addTag: jest.fn(),
  removeTag: jest.fn(),
};

// @spy function
const spyFunc = (component, func) => {
  const spy = jest.spyOn(component, func);
  component.forceUpdate();
  return spy;
};
describe('Article', () => {
  const component = shallow(<CreateArticle {...props} />);
  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });
  it('should create new article when user click button', () => {
    const spy = spyFunc(component.instance(), 'onSubmit');
    const fakeEvent = { preventDefault: () => {} };
    const form = component.find('[data-test="G-submitData"]');
    form.simulate('click', fakeEvent);
    expect(form.length).toBe(1);
    expect(spy).toHaveBeenCalled();
    spy.mockClear();
  });
  it('should update user input  using onchange', () => {
    const spy = spyFunc(component.instance(), 'onChange');
    const fakeEvent = { target: { name: 'title', value: 'title' } };
    const input = component.find('[data-test="G-input"]');
    input.simulate('change', fakeEvent);
    expect(input.length).toBe(1);
    expect(spy).toHaveBeenCalled();
    spy.mockClear();
  });
  it('should update user image using handleFiles', () => {
    const spy = spyFunc(component.instance(), 'handleFiles');
    const imageFile = component.find('[data-test="G-image"]');
    const instance = component.instance();
    const expected = { fileList: ['yes man'] };
    instance.handleFiles(expected);
    expect(imageFile.length).toBe(1);
    expect(component.state('image')).toBe(expected);
    expect(spy).toBeDefined();
  });
  it('should remove tag', () => {
    const spy = spyFunc(component.instance(), 'destroyTag');
    const instance = component.instance();
    instance.destroyTag('laravel');
    expect(spy).toBeDefined();
  });
  it('should add tag', () => {
    const spy = spyFunc(component.instance(), 'addTag');
    const fakeEvent = { preventDefault: () => {} };
    const instance = component.instance();
    instance.addTag(fakeEvent);
    expect(spy).toBeDefined();
  });
  it('should open tag input', () => {
    const spy = spyFunc(component.instance(), 'openTag');
    const fakeEvent = { preventDefault: () => {} };
    const input = component.find('[data-test="G-openTag"]');
    input.simulate('click', fakeEvent);
    expect(input.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });
});
