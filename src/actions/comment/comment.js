/* eslint-disable no-use-before-define */
import axios from 'axios';
import Hashid from 'hashids';
import { checkToken } from '../../utils/checkToken';

import {
  ADD_COMMENT, GET_ERRORS, GET_COMMENTS, COMMENT_LOADING
} from '../types';
import Config from '../../helpers/jsonConfig';

const hashids = new Hashid('', 10);

export const addComment = (commentData, articleId) => async (dispatch) => {
  try {
    const url = `/api/articles/${hashids.decode(articleId)}/comments`;
    const res = await axios.post(url, commentData, Config);
    checkToken();
    dispatch({
      type: ADD_COMMENT,
      payload: res.data.createdComment
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

const getComments = articleId => async (dispatch) => {
  try {
    dispatch(setCommentLoading());
    const url = `/api/articles/${hashids.decode(articleId)}/comments`;
    const res = await axios.get(url, Config);
    dispatch({
      type: GET_COMMENTS,
      payload: res.data.comment
    });
  } catch (error) {
    dispatch({
      type: GET_COMMENTS,
      payload: null
    });
  }
};

const setCommentLoading = () => ({
  type: COMMENT_LOADING
});

export { addComment as default, getComments, setCommentLoading };
