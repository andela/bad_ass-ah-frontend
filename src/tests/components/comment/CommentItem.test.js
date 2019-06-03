import React from 'react';
import { shallow } from 'enzyme';

import { CommentItem } from '../../../components/comment/CommentItem';

const props = {
  comment: { userfkey: { image: '' } }
};

describe('<CommentItem />', () => {
  const component = shallow(<CommentItem {...props} />);
  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });
});
