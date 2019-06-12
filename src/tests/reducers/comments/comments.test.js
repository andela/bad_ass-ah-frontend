import {
  ADD_COMMENT,
  GET_COMMENTS,
  COMMENT_LOADING,
  GET_SINGLE_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT
} from '../../../actions/types';

import comment from '../../../reducers/comment/comments';

describe('comments reducer', () => {
  const initialState = {
    comments: [],
    singleComment: {},
    loading: false,
    updatedComment: {}
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
    const newSate = comment(initialState, {
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
    const newState = comment(initialState, {
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
    const newState = comment(initialState, {
      type: GET_COMMENTS,
      payload
    });
    expect(newState.comments).toEqual(payload);
  });
  it('should return new state if action type is GET_SINGLE_COMMENT', () => {
    const payload = {
      id: 107,
      body: 'to be updated',
      articleId: 109,
      author: 80,
      createdAt: '2019-06-11T10:00:34.374Z',
      updatedAt: '2019-06-11T10:00:34.374Z'
    };
    const newState = comment(initialState, {
      type: GET_SINGLE_COMMENT,
      payload
    });
    expect(newState.singleComment).toEqual(payload);
  });
  it('should return new state if action type is UPDATE_COMMENT', () => {
    const payload = {
      id: 129,
      body: 'fgfhf',
      articleId: 1,
      author: 10,
      createdAt: '2019-06-03T12:54:33.420Z',
      updatedAt: '2019-06-03T12:54:33.420Z'
    };
    const newState = comment(initialState, {
      type: UPDATE_COMMENT,
      payload
    });
    expect(newState.updatedComment).toEqual(payload);
  });
  it('should return new state if action type is DELETE_COMMENT', () => {
    const payload = {
      comments: []
    };
    const newState = comment(initialState, {
      type: DELETE_COMMENT,
      payload
    });
    expect(newState.comments).toEqual(payload.comments);
  });
});
