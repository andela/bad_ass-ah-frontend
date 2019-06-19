import fetchBookmark from '../../reducers/fetchBookmark';
import {
  VIEW_BOOKMARKS, UNBOOKMARK_ARTICLE_SUCCESS
} from '../../actions/types';

describe('activate', () => {
  const initalState = {
    bookmark: [{ id: 1 }]
  };
  it('should handle VIEW_BOOKMARKS', () => {
    const action = {
      type: VIEW_BOOKMARKS,
      bookmark: undefined
    };
    const res = fetchBookmark(initalState, action);
    expect(res).toEqual({ bookmark: undefined });
  });
  it('should handle UNBOOKMARK_ARTICLE_SUCCESS', () => {
    const action = {
      type: UNBOOKMARK_ARTICLE_SUCCESS,
      payload: 1
    };
    const res = fetchBookmark(initalState, action);
    expect(res).toEqual({ bookmark: [] });
  });
});
