/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import React from 'react';
import { shallow } from 'enzyme';
import { SingleArticle, mapStateToProps } from '../../../components/articles/SingleArticle';
import CommentPopover from '../../../components/popovers/Comment';
import HighlightPopover from '../../../components/popovers/Highlight';

jest.mock('../../../helpers/Config', () => ({
  isAuthenticated: () => {
    // eslint-disable-next-line no-lone-blocks
    {
      1;
    }
  }
}));

const window = {
  getSelection: () => ({
    removeAllRanges: () => {},
    getRangeAt: nbr => ({
      getBoundingClientRect: () => ({
        top: '',
        left: ''
      }),
      surroundContents: (node) => {}
    })
  }),
  location: {
    replace: jest.fn()
  }
};

Object.defineProperty(global, 'window', { value: window });

const document = {
  getElementById: id => ({
    classList: {
      add: jest.fn(),
      remove: jest.fn()
    },
    style: {
      top: '',
      left: '',
      right: ''
    }
  }),
  getElementsByClassName: className => [
    {
      class: className,
      getBoundingClientRect: jest.fn()
    }
  ],
  documentElement: {
    scrollTop: {}
  },
  createElement: el => ({
    style: {
      background: 'blue'
    },
    onmouseup: jest.fn()
  }),
  addEventListener: () => {},
  removeEventListener: () => {},
  onmouseup: jest.fn()
};

Object.defineProperty(global, 'document', { value: document });

const props = {
  singleArticle: jest.fn(),
  deleteArticle: jest.fn(),
  setReadingStats: jest.fn(),
  setLoginRedirectPath: jest.fn(),
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
  bookmarkArticle: jest.fn(),
  isAuthenticated: jest.fn(),
  getUserHighlights: jest.fn(),
  payload: {
    id: 1
  },
  highlightText: jest.fn(),
  highlights: [],
  location: {
    state: {
      prevPath: '/'
    }
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

  it('should call bookmarkArticle method when the bookmark button is clicked', async () => {
    const spy = jest.spyOn(component.instance(), 'bookmarks');
    component.instance().forceUpdate();
    await component.instance().bookmarks();
    expect(spy).toHaveBeenCalled();
    expect(props.bookmarkArticle).toHaveBeenCalled();
  });

  it('should call bookmarkArticle method when the bookmark button is clicked', async () => {
    const spy = jest.spyOn(component.instance(), 'bookmarks');
    component.instance().forceUpdate();
    component.setProps({ isAuth: false });
    component.setState({ redirectOnBookmark: true });
    await component.instance().bookmarks();
    expect(spy).toHaveBeenCalled();
    expect(props.bookmarkArticle).toHaveBeenCalled();
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

  it('should call onChange method when the comment value is changed', () => {
    const props = {
      onSubmit: jest.fn(),
      comment: ''
    };
    const spy = jest.spyOn(component.instance(), 'onChange');
    component.instance().forceUpdate();

    const CommentComponent = shallow(<CommentPopover onChange={spy} {...props} />);
    const event = {
      target: { value: 'Good' }
    };

    const btn = CommentComponent.find('#comment-input');
    btn.simulate('change', event);
    expect(btn.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should call onSubmit method when the send button is clicked', () => {
    const props = {
      onChange: jest.fn(),
      comment: ''
    };

    const spy = jest.spyOn(component.instance(), 'onSubmit');
    component.instance().forceUpdate();

    const CommentComponent = shallow(<CommentPopover onSubmit={spy} {...props} />);
    const event = { preventDefault: () => {} };

    const form = CommentComponent.find('#comment-form');
    form.simulate('submit', event);
    expect(form.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should call onHighlight method when the highlight button is clicked', () => {
    const spy = jest.spyOn(component.instance(), 'onHighlight');
    component.instance().forceUpdate();

    const CommentComponent = shallow(<HighlightPopover onHighlight={spy} />);

    const btn = CommentComponent.find('#highlight-btn');
    btn.simulate('click');
    expect(btn.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

  it('componentDidUpdate', () => {
    component.setProps({ highlights: [{ text: 'text' }] });
    expect(component.instance().props.highlights).toBeDefined();
  });
  it('should test the function ComponentWillreceiveProps', () => {
    component.instance().componentWillReceiveProps(props);
  });
  it('should map states to props', () => {
    const state = {
      articles: ['hello world'],
      login: { isAuthenticated: true },
      highlight: { highlights: 'hey' }
    };
    const props = mapStateToProps(state);
    expect(props).toEqual(
      {
        articles:
        ['hello world'],
        isAuth: true,
        highlights: 'hey'
      }
    );
  });
});
