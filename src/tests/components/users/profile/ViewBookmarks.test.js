import React from 'react';
import { shallow } from 'enzyme';
import { ViewBookmark } from '../../../../components/users/profile/ViewBookmarks';

const props = {
  getCurrentProfile: jest.fn(),
  getUserFollowers: jest.fn(),
  getUserFollowing: jest.fn(),
  getUserArticles: jest.fn(),
  deleteArticle: jest.fn(),
  getReadingStats: jest.fn(),
  fetchBookmarks: jest.fn(),
  onUnbookmark: jest.fn(),
  unBookmark: jest.fn(),
  errorGetReadingStats: null,
  readingStats: 3,
  profile: {
    image: ''
  },
  followers: {
    numberOfFollowers: 2
  },
  following: {
    numberOfFollowing: 2
  },
  articles: [
    {
      title: 'article 1',
      body: 'body of article1',
      image: null,
      tag: ['tag1', 'tag2']
    },
    {
      title: 'article 2',
      body: 'body of article2',
      image: null,
      tag: ['tag1', 'tag2']
    }
  ],
  message: 'Good'
};

const window = {
  location: {
    reload: jest.fn()
  }
};

Object.defineProperty(global, 'window', { value: window });

describe('ViewBookmark component', () => {
  jest.useFakeTimers();
  const component = shallow(<ViewBookmark {...props} />);

  it('renders without crashing', () => {
    jest.runAllTimers();
    expect(component).toMatchSnapshot();
    expect(setTimeout).toHaveBeenCalledTimes(1);
  });
  it('should call onUnbookmark method', async () => {
    const spy = jest.spyOn(component.instance(), 'onUnbookmark');
    component.instance().forceUpdate();
    await component.instance().onUnbookmark();
    expect(spy).toHaveBeenCalled();
  });
});
