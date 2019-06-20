import fetchBookmark from '../../reducers/fetchBookmark';
import { VIEW_BOOKMARKS, VIEW_BOOKMARKS_FAILURE, UNBOOKMARK_ARTICLE_SUCCESS } from '../../actions/types';

describe('activate', () => {
  const initalState = {
    bookmark: [{ id: 1 }],
    loading: true,
    message: null
  };
  it('should handle VIEW_BOOKMARKS', () => {
    const action = {
      type: VIEW_BOOKMARKS,
      bookmark: undefined
    };
    const res = fetchBookmark(initalState, action);
    expect(res).toEqual({ bookmark: undefined, loading: false, message: null });
  });

  it('should handle VIEW_BOOKMARKS_FAILURE', () => {
    const action = {
      type: VIEW_BOOKMARKS_FAILURE,
      message: 'failure'
    };
    const res = fetchBookmark(initalState, action);
    expect(res).toEqual({ bookmark: null, loading: false, message: undefined });
  });

  it('should handle UNBOOKMARK_ARTICLE_SUCCESS', () => {
    const action = {
      type: UNBOOKMARK_ARTICLE_SUCCESS,
      payload: 1
    };
    const res = fetchBookmark(initalState, action);
    expect(res).toEqual({ bookmark: [], loading: false, message: null });
  });
});
