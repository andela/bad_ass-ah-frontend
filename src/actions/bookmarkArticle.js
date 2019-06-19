import axios from 'axios';
import Hashid from 'hashids';
import config, {
  PassDispatch
} from '../helpers/Config';
import {
  BOOKMARK_ARTICLE_SUCCESS,
  BOOKMARK_FAILURE
} from './types';

const hashids = new Hashid('', 10);

const bookmarkArticle = id => async (dispatch) => {
  const url = `/api/articles/${hashids.decode(id)}/bookmark`;
  try {
    const Bookmark = await axios.post(url, '', config);
    dispatch(PassDispatch(BOOKMARK_ARTICLE_SUCCESS, Bookmark.data));
  } catch (error) {
    dispatch(PassDispatch(BOOKMARK_FAILURE, error));
  }
};

export default bookmarkArticle;
