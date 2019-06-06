import React from 'react';
import { shallow } from 'enzyme';
import { CreateArticle } from '../../../components/articles/CreateArticle';

const props = {
  createArticle: jest.fn(),
  create: {
    newArticle: {
      message: 'success'
    },
    newTag: ['tag']
  },
  addTag: jest.fn(),
  removeTag: jest.fn(),
  ArticleValidation: jest.fn()
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
  it('should update state', () => {
    const spy = spyFunc(component.instance(), 'onChange');
    const fakeEvent = { target: { name: 'tag', value: 'tag' } };
    const input = component.find('[data-test="add-tag"]');
    input.simulate('change', fakeEvent);
    expect(input.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });
});
