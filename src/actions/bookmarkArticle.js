import axios from 'axios';
import Hashid from 'hashids';
import config, {
  PassDispatch
} from '../helpers/Config';
import {
  BOOKMARK_ARTICLE_SUCCESS,
  BOOKMARK_FAILURE,
  VIEW_BOOKMARKS,
  VIEW_BOOKMARKS_FAILURE,
  UNBOOKMARK_ARTICLE_SUCCESS,
  UNBOOKMARK_ARTICLE_FAILURE
} from './types';

const hashids = new Hashid('', 10);

const BACKEND_URL = 'https://badass-ah-backend-staging.herokuapp.com';

export const bookmarkArticle = id => async (dispatch) => {
  const url = `${BACKEND_URL}/api/articles/${hashids.decode(id)}/bookmark`;
  try {
    const Bookmark = await axios.post(url, '', config);
    dispatch(PassDispatch(BOOKMARK_ARTICLE_SUCCESS, Bookmark.data));
  } catch (error) {
    dispatch(PassDispatch(BOOKMARK_FAILURE, error));
  }
};

export const fetchBookmarks = () => async (dispatch) => {
  const url = `${BACKEND_URL}/api/articles/bookmark`;
  try {
    const viewBookmark = await axios.get(url, '', config);
    dispatch(PassDispatch(VIEW_BOOKMARKS, viewBookmark.data));
  } catch (error) {
    dispatch(PassDispatch(VIEW_BOOKMARKS_FAILURE, error.message));
  }
};

export const unBookmark = (id, bookmarkId) => async (dispatch) => {
  const url = `${BACKEND_URL}/api/articles/${hashids.decode(id)}/bookmark`;
  try {
    const unBookmarkArticle = await axios.post(url, '', config);
    if (unBookmarkArticle) {
      dispatch(PassDispatch(UNBOOKMARK_ARTICLE_SUCCESS, bookmarkId));
    }
  } catch (error) {
    dispatch(PassDispatch(UNBOOKMARK_ARTICLE_FAILURE, error.message));
  }
};
