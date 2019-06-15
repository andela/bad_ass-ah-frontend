// @call type going to be used..
import {
  VIEW_BOOKMARKS, UNBOOKMARK_ARTICLE_SUCCESS
} from '../actions/types';

const initialState = {
  bookmark: null
};

const getBookmarks = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case VIEW_BOOKMARKS:
      return {
        ...state,
        bookmark: payload
      };
    case UNBOOKMARK_ARTICLE_SUCCESS:
      return {
        ...state,
        bookmark: state.bookmark.filter(book => book.id !== payload)
      };
    default:
      return state;
  }
};

export {
  getBookmarks as default
};
