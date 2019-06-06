import React from 'react';
import { shallow } from 'enzyme';

import { CommentFeed } from '../../../components/comment/CommentFeed';

const props = {
  comments: [{ id: 'dhdhdh' }, { comment: { userfkey: { image: 'dfdfd' } } }]
};

describe('<CommentFeed />', () => {
  const component = shallow(<CommentFeed {...props} />);
  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });
});
