import {
  ADD_COMMENT,
  GET_COMMENTS,
  COMMENT_LOADING
} from '../../../actions/types';

import comment from '../../../reducers/comment/comments';

describe('comments reducer', () => {
  const initiState = {
    comments: [],
    comment: {},
    loading: false
  };
  it('should return default state', () => {
    const newSate = comment([], {});
    expect(newSate).toEqual([]);
  });

  it('should return new state if action type is ADD_COMMENT', () => {
    const payload = {
      id: 129,
      body: 'fgfhf',
      articleId: 1,
      author: 10,
      createdAt: '2019-06-03T12:54:33.420Z',
      updatedAt: '2019-06-03T12:54:33.420Z',
      userfkey: {
        username: 'Gaetan',
        email: 'gaetan@gmail.com',
        image: null,
        id: 10,
        bio: null
      }
    };
    const newSate = comment(initiState, {
      type: ADD_COMMENT,
      payload
    });
    expect(newSate.comments.length).toEqual(1);
    expect(newSate.comments[0]).toEqual(payload);
  });

  it('should return new state if action type is COMMENT_LOADING', () => {
    const payload = {
      loading: true
    };
    const newState = comment(initiState, {
      type: COMMENT_LOADING,
      payload
    });
    expect(newState.loading).toEqual(payload.loading);
  });

  it('should return new state if action type is GET_COMMENTS', () => {
    const payload = {
      id: 129,
      body: 'fgfhf',
      articleId: 1,
      author: 10,
      createdAt: '2019-06-03T12:54:33.420Z',
      updatedAt: '2019-06-03T12:54:33.420Z',
      userfkey: {
        username: 'Gaetan',
        email: 'gaetan@gmail.com',
        image: null,
        id: 10,
        bio: null
      }
    };
    const newState = comment(initiState, {
      type: GET_COMMENTS,
      payload
    });
    expect(newState.comments).toEqual(payload);
  });
});
