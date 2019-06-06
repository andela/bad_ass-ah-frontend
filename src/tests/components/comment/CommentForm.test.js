import React from 'react';
import { shallow } from 'enzyme';
import { CommentForm } from '../../../components/comment/commentForm';

const props = {
  onSubmit: jest.fn(),
  onChange: jest.fn(),
  addComment: jest.fn(),
  articleId: 1,
  errors: {},
  mapStateToProps: jest.fn(),
  profile: { profile: {} },
};

describe('CommentForm Component', () => {
  const component = shallow(<CommentForm {...props} />);
  it('should render a <CommentForm /> component of textarea element', () => {
    expect(component).toMatchSnapshot();
  });

  it('should call onSubmit method when the button is clicked', () => {
    const spy = jest.spyOn(component.instance(), 'onSubmit');
    component.instance().forceUpdate();

    const fakeEvent = { preventDefault: () => {} };
    const form = component.find('#submit_comment');
    form.simulate('submit', fakeEvent);
    expect(form.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should call onChange method when the textarea value is changed', () => {
    const spy = jest.spyOn(component.instance(), 'onChange');
    component.instance().forceUpdate();

    const event = {
      target: { value: 'text' }
    };

    const textArea = component.find('textarea').at(0);
    textArea.simulate('change', event);
    expect(textArea.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });
});
