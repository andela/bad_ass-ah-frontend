import React from 'react';
import { shallow } from 'enzyme';

import { Comments } from '../../../components/comment/comments';

const props = {
  comment: { comments: null, loading: true },
  getComments: jest.fn(),
  articleId: 1,
  login: {},
  isAuthenticated: true
};

describe('<Comments />', () => {
  const component = shallow(<Comments {...props} />);

  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });
  it('should render without crashing', () => {
    props.comment.loading = false;
    props.comment.comments = {};
    const wrapper = shallow(<Comments {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
