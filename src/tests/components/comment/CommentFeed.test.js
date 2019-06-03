import React from 'react';
import { shallow } from 'enzyme';

import { CommentFeed } from '../../../components/comment/CommentFeed';

const props = {
  comments: []
};

describe('<CommentFeed />', () => {
  const component = shallow(<CommentFeed {...props} />);
  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });
});
