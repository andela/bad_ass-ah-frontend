/* eslint-disable no-unused-expressions */
import React from 'react';
import { shallow } from 'enzyme';
import { SingleArticle } from '../../../components/articles/SingleArticle';

jest.mock('../../../helpers/Config', () => ({
  isAuthenticated: () => {
    // eslint-disable-next-line no-lone-blocks
    {
      1;
    }
  }
}));
const props = {
  singleArticle: jest.fn(),
  deleteArticle: jest.fn(),
  setReadingStats: jest.fn(),
  isAuth: true,
  match: { params: jest.fn() },
  addTag: jest.fn(),
  articles: {
    voteMessage: 'thanks for the support.',
    article: {
      article: {
        title: 'title',
        body: 'body',
        taglist: ['list'],
        image: 'image',
        authorfkey: {
          id: 10,
          username: 'gram'
        }
      },
      votes: { hasLiked: true }
    },
    error: {
      errors: {
        body: ['error']
      }
    },
    message: 'welcome'
  },
  likeArticle: jest.fn(),
  dislikeArticle: jest.fn(),
  isAuthenticated: jest.fn(),
  payload: {
    id: 1
  }
};

describe('<SingleArticle />', () => {
  const component = shallow(<SingleArticle {...props} />);
  it('should render without crashing', async () => {
    await expect(component).toMatchSnapshot();
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
    await component
      .instance()
      .componentWillReceiveProps({ articles: { voteMessage: 'You have disliked this article.' } });
    expect(spy).toHaveBeenCalled();
  });
  it('should destroy article', async () => {
    const instance = component.instance();
    await instance.destroy('data');
    expect(instance.length).toBeUndefined();
  });
});
