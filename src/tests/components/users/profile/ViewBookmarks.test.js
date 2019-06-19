import React from 'react';
import {
  shallow
} from 'enzyme';
import {
  ViewBookmark,
  mapStateToProps
} from '../../../../components/users/profile/ViewBookmarks';

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
  articles: [{
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
  message: 'Good',
  getBookmarks: [{ article: { title: 'this is a title', body: 'this is the body', image: 'http://image.com', authorfkey: { image: 'http://garage48.org/blog/garage48-to-re-invent-africa' } } }]
};

const window = {
  location: {
    reload: jest.fn()
  }
};

Object.defineProperty(global, 'window', {
  value: window
});

describe('ViewBookmark component', () => {
  jest.useFakeTimers();
  const component = shallow(< ViewBookmark {
          ...props
        }
        />);

  it('renders without crashing', () => {
    jest.runAllTimers();
    expect(component).toMatchSnapshot();
    expect(setTimeout).toHaveBeenCalledTimes(1);
  }); it('should call onUnbookmark method', async () => {
    const spy = jest.spyOn(component.instance(), 'onUnbookmark');
    component.instance().forceUpdate();
    await component.instance().onUnbookmark();
    expect(spy).toHaveBeenCalled();
  }); it('should call map state to props', () => {
    const state = mapStateToProps({
      getBookmarks: {
        bookmark: 12
      },
      readingStats: {
        readingStats: 'hello',
        rrorGetReadingStats: 'no stats'
      },
      articles: {
        message: 'hello world'
      },
      profile: {
        profile: 'hello world',
        loading: 'true',
        followers: 12,
        following: 11,
        articles: {
          articles: []
        }
      }
    });
    expect(state).toBeDefined();
  });
});
