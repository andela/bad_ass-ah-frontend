import React from 'react';
import { shallow } from 'enzyme';
import { EditArticle } from '../../../components/articles/EditArticle';


const props = {
  singleArticle: jest.fn(),
  articleReducer: {
    message: 'welcome',
    article: {
      article: {
        title: 'title',
        body: 'body',
        image: 'image'
      }
    },
    error: {
      errors: { body: ['error'] }
    }
  },
  updateArticle: jest.fn(),
  match: { params: jest.fn() }
};
// @spy function
const spyFunc = (component, func) => {
  const spy = jest.spyOn(component, func);
  component.forceUpdate();
  return spy;
};
describe('Edit Article Component', () => {
  const component = shallow(<EditArticle {...props} />);
  it('Should render without crashing', () => {
    expect(component.exists()).toBe(true);
    expect(component).toMatchSnapshot();
  });
  it('should test image files', () => {
    const spy = spyFunc(component.instance(), 'handleFiles');
    const imageFile = component.find('[data-test="G-image"]');
    const instance = component.instance();
    const expected = { fileList: ['yes man'] };
    instance.handleFiles(expected);
    expect(imageFile.length).toBe(1);
    expect(component.state('image')).toBe(expected);
    expect(spy).toBeDefined();
  });
  it('should test submit button', () => {
    const spy = spyFunc(component.instance(), 'onSubmit');
    const fakeEvent = { preventDefault: () => {} };
    const button = component.find('[data-test="G-updateData"]');
    button.simulate('click', fakeEvent);
    expect(button.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });
});
