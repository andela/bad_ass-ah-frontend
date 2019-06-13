import axios from 'axios';
import Hashid from 'hashids';
import dotenv from 'dotenv';

// @call type we are going to use
import {
  GET_ALL_ARTICLE,
  CREATE_ARTICLE,
  ARTICLE_FAILURE,
  LOADING,
  ADD_TAG,
  REMOVE_TAG,
  GET_SINGLE_ARTICLE,
  VOTE_ARTICLES,
  UPDATE_ARTICLE,
  DELETE_ARTICLE
} from './types';
import Config, { PassDispatch } from '../helpers/Config';
import { checkToken } from '../utils/checkToken';

dotenv.config();
const hashids = new Hashid('', 10);

// @get all article actions
const getAllArticle = () => async (dispatch) => {
  const url = '/api/articles';
  try {
    const res = await axios.get(url);
    dispatch(PassDispatch(GET_ALL_ARTICLE, res.data));
  } catch (error) {
    if (error.response) {
      dispatch(PassDispatch(ARTICLE_FAILURE, error.response));
    }
  }
};
// @loading
const loading = () => ({
  type: LOADING
});
// @create article
const createArticle = data => async (dispatch) => {
  const url = '/api/articles';
  const arr = data.tag ? data.tag.join(',') : '';
  const formData = new FormData();
  formData.append('image', data.image);
  formData.append('title', data.title);
  formData.append('body', data.body);
  formData.append('tag', arr);
  await dispatch(loading());
  checkToken();
  try {
    const Addarticle = await axios.post(url, formData, Config);
    await dispatch(PassDispatch(CREATE_ARTICLE, Addarticle.data));
  } catch (error) {
    await dispatch(PassDispatch(ARTICLE_FAILURE, error.response));
  }
};

// @ add tag
const addTag = data => (dispatch) => {
  dispatch({
    type: ADD_TAG,
    payload: data
  });
};
const removeTag = data => (dispatch) => {
  dispatch(PassDispatch(REMOVE_TAG, data));
};
// @single article
const singleArticle = handle => async (dispatch) => {
  const url = `/api/articles/${hashids.decode(handle)}`;
  try {
    const getArticle = await axios.get(url);
    await dispatch(PassDispatch(VOTE_ARTICLES, getArticle.data.votes));
    await dispatch(PassDispatch(GET_SINGLE_ARTICLE, getArticle.data));
  } catch (error) {
    dispatch(PassDispatch(ARTICLE_FAILURE, error.response));
  }
};
// @Liking article

// @update article
const updateArticle = (handle, data) => async (dispatch) => {
  const url = `/api/articles/${hashids.decode(handle)}`;
  const formData = new FormData();
  formData.append('image', data.image);
  formData.append('title', data.title);
  formData.append('body', data.body);
  checkToken();
  try {
    const update = await axios.put(url, formData, Config);
    dispatch(PassDispatch(UPDATE_ARTICLE, update.data));
  } catch (error) {
    dispatch(PassDispatch(ARTICLE_FAILURE, error.response));
  }
};
// @delete article
const deleteArticle = id => async (dispatch) => {
  const url = `/api/articles/${hashids.decode(id)}`;
  checkToken();
  await axios
    .delete(url, Config)
    .then((res) => {
      dispatch(PassDispatch(DELETE_ARTICLE, res.data));
    })
    .catch((error) => {
      dispatch(PassDispatch(ARTICLE_FAILURE, error.response));
    });
};
export {
  getAllArticle as default,
  createArticle,
  addTag,
  removeTag,
  singleArticle,
  updateArticle,
  deleteArticle
};
