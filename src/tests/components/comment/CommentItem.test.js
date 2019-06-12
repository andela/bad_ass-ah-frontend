import React from 'react';
import { shallow } from 'enzyme';

import { CommentItem } from '../../../components/comment/CommentItem';

const props = {
  comment: { author: 1, userfkey: { image: 'kllkjlk' } },
  login: { isAuthenticated: false },
  deleteComment: jest.fn(),
  getSingleComment: jest.fn(),
  singleComment: { id: 2, body: 'body' },
  profile: { profile: { image: 'ddddddd' } },
  updateComment: jest.fn(),
  isAuthenticated: jest.fn(),
  updatedComment: {},
  onSubmit: jest.fn(),
  onChange: jest.fn(),
  errors: {}
};

describe('<CommentItem />', () => {
  const component = shallow(<CommentItem {...props} />);
  component.setState({ commentId: 2 });
  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });
  it('should call onSubmit method when the button is clicked', () => {
    const wrapper = shallow(<CommentItem {...props} />);
    wrapper.setState({ displayEditBox: true, userId: 1 });
    const spy = jest.spyOn(wrapper.instance(), 'onSubmit');
    wrapper.instance().forceUpdate();

    const fakeEvent = { preventDefault: () => {} };
    const form = wrapper.find('#submit_edited_comment');
    form.simulate('submit', fakeEvent);
    expect(form.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });
  it('should call fetchSingleArticle method when the button is clicked', () => {
    const wrapper = shallow(<CommentItem {...props} />);
    props.login.isAuthenticated = true;
    wrapper.setState({ displayEditBox: false, userId: 1 });
    const spy = jest.spyOn(wrapper.instance(), 'fetchSingleArticle');
    wrapper.instance().forceUpdate();

    const fakeEvent = { preventDefault: () => {} };
    const btn = wrapper.find('.edit_comment');
    btn.simulate('click', fakeEvent);
    expect(btn.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });
  it('should call onDelete method when the button is clicked', () => {
    const wrapper = shallow(<CommentItem {...props} />);
    props.login.isAuthenticated = true;
    wrapper.setState({ displayEditBox: false, userId: 1 });
    const spy = jest.spyOn(wrapper.instance(), 'onDelete');
    wrapper.instance().forceUpdate();

    const fakeEvent = { preventDefault: () => {} };
    const btn = wrapper.find('.delete_comment');
    btn.simulate('click', fakeEvent);
    expect(btn.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });
  it('should call onChange method when the textarea value is changed', () => {
    const wrapper = shallow(<CommentItem {...props} />);
    wrapper.setState({ displayEditBox: true, userId: 1 });
    const spy = jest.spyOn(wrapper.instance(), 'onChange');
    wrapper.instance().forceUpdate();

    const event = {
      target: { value: 'text' }
    };

    const textArea = wrapper.find('textarea').at(0);
    textArea.simulate('change', event);
    expect(textArea.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });
  it('should call the function componentWillReceiveProps', () => {
    component.instance().componentWillReceiveProps(props);
  });
});
