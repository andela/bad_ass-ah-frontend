import React from 'react';
import { shallow } from 'enzyme';
import { ViewProfile } from '../../../../components/users/profile/ViewProfile';

const props = {
  getCurrentProfile: jest.fn(),
  getUserFollowers: jest.fn(),
  getUserFollowing: jest.fn(),
  getUserArticles: jest.fn(),
  deleteArticle: jest.fn(),
  getReadingStats: jest.fn(),
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

describe('ViewProfile component', () => {
  jest.useFakeTimers();
  const component = shallow(<ViewProfile {...props} />);

  it('renders without crashing', () => {
    jest.runAllTimers();
    expect(component).toMatchSnapshot();
    expect(setTimeout).toHaveBeenCalledTimes(1);
  });
  it('should destroy article', async () => {
    const instance = component.instance();
    await instance.destroy('data');
    expect(instance.length).toBeUndefined();
  });
});
