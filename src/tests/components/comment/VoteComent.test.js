import React from 'react';
import { shallow } from 'enzyme';
import { VoteComment } from '../../../components/comment/VoteComment';

jest.mock('../../../helpers/Config', () => ({
  isAuthenticated: () => {
    // eslint-disable-next-line no-lone-blocks
    {
      // eslint-disable-next-line no-unused-expressions
      1;
    }
  }
}));

const props = {
  LikeComment: jest.fn(),
  DisLikeComment: jest.fn(),
  userId: 1,
  votes: {
    userId: 12,
    comment: 'yes',
    hasLiked: true
  },
  Like: 0,
  DisLike: 0,
  allVotes: [
    {
      userId: 1,
      commentId: 1
    },
    {
      userId: 1,
      commentId: 1
    }
  ]
};

// @spy function
const spyFunc = (component, func) => {
  const spy = jest.spyOn(component, func);
  component.forceUpdate();
  return spy;
};

describe('Votes comment', () => {
  const component = shallow(<VoteComment {...props}/>);
  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });
  it('should test componentDidMount', () => {
    const instance = component.instance();
    instance.componentDidMount();
    component.setProps(props.allVotes);
    component.setState({ changeLikeColor: 'turnToRed' });
    expect(props.allVotes[0].userId).toEqual(1);
  });
  it('should like comment', () => {
    const spy = spyFunc(component.instance(), 'likeSingleComment');
    const instance = component.instance();
    instance.likeSingleComment(10, 20);
    component.setState({ comentId: 1 });
    expect(component.find('[data-test="like-comment"]').length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });
  it('should dislike comment', () => {
    const spy = spyFunc(component.instance(), 'dislikeSingleComment');
    const instance = component.instance();
    instance.dislikeSingleComment(10, 20);
    component.setState({ comentId: 1 });
    expect(component.find('[data-test="dislike-comment"]').length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });
});
