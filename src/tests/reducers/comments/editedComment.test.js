import { EDITED_COMMENT_LOADING, GET_EDITED_COMMENTS } from '../../../actions/types';

import editedComments from '../../../reducers/comment/editedComments';

describe('comments reducer', () => {
  const initialState = {
    EditedComments: [],
    loading: false
  };
  it('should return default state', () => {
    const newSate = editedComments([], {});
    expect(newSate).toEqual([]);
  });

  it('should return new state if action type is EDITED_COMMENT_LOADING', () => {
    const payload = {
      loading: true
    };
    const newState = editedComments(initialState, {
      type: EDITED_COMMENT_LOADING,
      payload
    });
    expect(newState.loading).toEqual(payload.loading);
  });

  it('should return new state if action type is GET_EDITED_COMMENTS', () => {
    const payload = {
      id: 339,
      commentId: 177,
      userId: 80,
      body: 'I comment',
      createdAt: '2019-06-15T15:56:27.133Z',
      updatedAt: '2019-06-15T15:56:27.133Z'
    };
    const newState = editedComments(initialState, {
      type: GET_EDITED_COMMENTS,
      payload
    });
    expect(newState.EditedComments).toEqual(payload);
  });
});
