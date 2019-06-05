import React from 'react';
import { shallow } from 'enzyme';


import { SingleArticle } from '../../../components/articles/SingleArticle';

const props = {
  singleArticle: jest.fn(),
  match: { params: jest.fn() },
  addTag: jest.fn(),
  articles: {
    voteMessage: 'thanks for the support.',
    article: {
      title: 'my title', body: '`article body', taglist: ['tag1', 'tag2'], votes: { hasLiked: true }
    }
  },
  likeArticle: jest.fn(),
  dislikeArticle: jest.fn(),
  bookmarkArticle: jest.fn()
};

describe('<SingleArticle />', () => {
  const component = shallow(<SingleArticle {...props} />);
  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });

  it('should call likeArticle method when the like button is clicked', async () => {
    const spy = jest.spyOn(component.instance(), 'likeArticle');
    component.instance().forceUpdate();
    await component.instance().likeArticle();
    expect(spy).toHaveBeenCalled();
    expect(props.likeArticle).toHaveBeenCalled();
  });

  it('should call dislikeArticle method when the dislike button is clicked', async () => {
    const spy = jest.spyOn(component.instance(), 'dislikeArticle');
    component.instance().forceUpdate();
    await component.instance().dislikeArticle();
    expect(spy).toHaveBeenCalled();
    expect(props.dislikeArticle).toHaveBeenCalled();
  });

  it('should call dislikeArticle method when the dislike button is clicked', async () => {
    const spy = jest.spyOn(component.instance(), 'dislikeArticle');
    component.instance().forceUpdate();
    await component.instance().componentWillReceiveProps({ articles: props.articles });
    expect(spy).toHaveBeenCalled();
  });

  it('should call dislikeArticle method when the dislike button is clicked', async () => {
    const spy = jest.spyOn(component.instance(), 'dislikeArticle');
    component.instance().forceUpdate();
    await component.instance().componentWillReceiveProps({ articles: { voteMessage: 'You have disliked this article.' } });
    expect(spy).toHaveBeenCalled();
  });
  it('should call dislikeArticle method when the dislike button is clicked', async () => {
    const spy = jest.spyOn(component.instance(), 'dislikeArticle');
    component.instance().forceUpdate();
    await component.instance().componentWillReceiveProps({ articles: { bookmarkMessage: 'Successfully bookmarked.' } });
    expect(spy).toHaveBeenCalled();
  });
  it('should call bookmarkArticle method when the like button is clicked', async () => {
    const spy = jest.spyOn(component.instance(), 'bookmarks');
    component.instance().forceUpdate();
    await component.instance().bookmarks();
    expect(spy).toHaveBeenCalled();
    expect(props.bookmarkArticle).toHaveBeenCalled();
  });
});
