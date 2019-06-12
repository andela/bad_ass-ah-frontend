import React from 'react';
import { shallow } from 'enzyme';
import Comment from '../../../components/popovers/Comment';

const props = {
  onChange: jest.fn(),
  onSubmit: jest.fn(),
  comment: ''
};

describe('CommentPopover component', () => {
  const component = shallow(<Comment {...props} />);
  it('renders without crashing', () => {
    expect(component).toMatchSnapshot();
  });
});
