import axios from 'axios';
import Hashid from 'hashids';
import dotenv from 'dotenv';

// @call type we are going to use
import {
  GET_ALL_ARTICLE, CREATE_ARTICLE, ARTICLE_FAILURE, LOADING, ADD_TAG, REMOVE_TAG,
  GET_SINGLE_ARTICLE, VOTE_ARTICLES,
} from './types';
import Config, { PassDispatch } from '../helpers/Config';

dotenv.config();
const hashids = new Hashid('', 10);
// @get all article actions
const getAllArticle = () => (dispatch) => {
  const url = '/api/articles';
  axios
    .get(url)
    .then((response) => {
      dispatch(PassDispatch(GET_ALL_ARTICLE, response.data));
    })
    .catch((error) => {
      dispatch(PassDispatch(ARTICLE_FAILURE, error.response));
    });
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
    const getArticle = await axios.get(url, Config);
    await dispatch(PassDispatch(VOTE_ARTICLES, getArticle.data.votes));
    await dispatch(PassDispatch(GET_SINGLE_ARTICLE, getArticle.data));
  } catch (error) {
    if (error.response) {
      dispatch(PassDispatch(ARTICLE_FAILURE, error.response.data));
    }
  }
};
// @Liking article

export {
  getAllArticle as default, createArticle, addTag, removeTag, singleArticle
};
