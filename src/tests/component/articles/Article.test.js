import React from 'react';
import { shallow } from 'enzyme';
import { CreateArticle } from '../../../components/articles/CreateArticle';


const props = {
  createArticle: jest.fn(),
  create: jest.fn(),
  addTag: jest.fn(),
  removeTag: jest.fn()
};
// @spy function
const spyFunc = (component, func) => {
  const spy = jest.spyOn(component, func);
  component.forceUpdate();
  return spy;
};
describe('Article', () => {
  const component = shallow(<CreateArticle {...props} />);
  test('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });
  test('should create new article when user click button', () => {
    const spy = spyFunc(component.instance(), 'onSubmit');
    const fakeEvent = { preventDefault: () => {} };
    const form = component.find('[data-test="G-submitData"]');
    form.simulate('click', fakeEvent);
    expect(form.length).toBe(1);
    expect(spy).toHaveBeenCalled();
    spy.mockClear();
  });
  test('should update user input  using onchange', () => {
    const spy = spyFunc(component.instance(), 'onChange');
    const fakeEvent = { target: { name: 'title', value: 'title' } };
    const input = component.find('[data-test="G-input"]');
    input.simulate('change', fakeEvent);
    expect(input.length).toBe(1);
    expect(spy).toHaveBeenCalled();
    spy.mockClear();
  });
  test('should update user image using handleFiles', () => {
    const spy = spyFunc(component.instance(), 'handleFiles');
    const imageFile = component.find('[data-test="G-image"]');
    expect(imageFile.length).toBe(1);
    expect(spy).toBeDefined();
  });
  test('should remove tag', () => {
    const spy = spyFunc(component.instance(), 'destroyTag');
    expect(spy).toBeDefined();
  });
});
