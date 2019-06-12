/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import axios from 'axios';
import Hashid from 'hashids';

import {
  ADD_COMMENT,
  GET_ERRORS,
  GET_COMMENTS,
  COMMENT_LOADING,
  DELETE_COMMENT,
  GET_SINGLE_COMMENT,
  UPDATE_COMMENT
} from '../types';
import Config from '../../helpers/jsonConfig';

const hashids = new Hashid('', 10);

export const addComment = (commentData, articleId) => async (dispatch) => {
  try {
    const url = `/api/articles/${hashids.decode(articleId)}/comments`;
    const res = await axios.post(url, commentData, Config);

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
export const updateComment = (commentData, articleId, commentId) => async (dispatch) => {
  try {
    const url = `/api/articles/${articleId}/comments/${commentId}`;
    const res = await axios.put(url, commentData, Config);

    dispatch({
      type: UPDATE_COMMENT,
      payload: res.data.comment
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const deleteComment = (commentId, articleId) => async (dispatch) => {
  try {
    const url = `/api/articles/${articleId}/comments/${commentId}`;
    const res = await axios.delete(url, Config);

    dispatch({
      type: DELETE_COMMENT,
      payload: commentId
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
const getSingleComment = (articleId, commentId) => async (dispatch) => {
  try {
    const url = `/api/articles/${articleId}/comments/${commentId}`;
    const res = await axios.get(url, Config);

    dispatch({
      type: GET_SINGLE_COMMENT,
      payload: res.data.comment
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_COMMENT,
      payload: null
    });
  }
};

const setCommentLoading = () => ({
  type: COMMENT_LOADING
});

export {
  addComment as default, getComments, setCommentLoading, getSingleComment
};
