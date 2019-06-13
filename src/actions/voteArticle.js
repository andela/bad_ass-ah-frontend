import axios from 'axios';
import Hashid from 'hashids';
import config, {
  PassDispatch
} from '../helpers/Config';
import {
  VOTE_ARTICLES,
  VOTE_FAILURE
} from './types';

const hashids = new Hashid('', 10);

export const likeArticle = id => async (dispatch) => {
  const url = `/api/articles/${hashids.decode(id)}/like`;
  try {
    const Like = await axios.post(url, '', config);
    dispatch(PassDispatch(VOTE_ARTICLES, Like.data));
  } catch (error) {
    dispatch(PassDispatch(VOTE_FAILURE, error));
  }
};

export const dislikeArticle = id => async (dispatch) => {
  const url = `/api/articles/${hashids.decode(id)}/dislike`;
  axios.post(url, '', config);

  try {
    const Dislike = await axios.post(url, '', config);

    dispatch(PassDispatch(VOTE_ARTICLES, Dislike.data));
  } catch (error) {
    dispatch(PassDispatch(VOTE_FAILURE, error.res));
  }
};
