/* eslint-disable indent */
// @call type going to be used..
import {
  VIEW_BOOKMARKS,
  VIEW_BOOKMARKS_FAILURE,
  UNBOOKMARK_ARTICLE_SUCCESS
} from '../actions/types';

const initialState = {
  bookmark: null,
  message: null,
  loading: true
};

const getBookmarks = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case VIEW_BOOKMARKS:
      return {
        ...state,
        bookmark: payload,
        message: null,
        loading: false
      };

    case VIEW_BOOKMARKS_FAILURE:
      return {
        ...state,
        message: payload,
        bookmark: null,
        loading: false
      };

    case UNBOOKMARK_ARTICLE_SUCCESS:
      return {
        ...state,
        bookmark: state.bookmark.filter(book => book.id !== payload),
        loading: false
      };
    default:
      return state;
  }
};
export { getBookmarks as default };
