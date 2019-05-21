import axios from 'axios';
// @call type we are going to use
import {
  GET_ALL_ARTICLE, CREATE_ARTICLE, ARTICLE_ERROR, LOADING, ADD_TAG, REMOVE_TAG
} from './type';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsImVtYWlsIjoiZ3JhY2lhbjIwMjBAZ21haWwuY29tIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU1ODYxNTczNCwiZXhwIjoxNTYyOTM1NzM0fQ.zRM27LSAYifXieVs06dG6S3HaJPJjwnP6wA7WpFNKJA';
const config = {
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${token}`
  }
};
const articles = [{
  id: Math.random(),
  title: 'this is article1',
  author: 'gracian'
},
{
  id: Math.random(),
  title: 'this is article2',
  author: 'gracian'
}];
// @get all article actions
const getAllArticle = () => (dispatch) => {
  dispatch({
    type: GET_ALL_ARTICLE,
    payload: articles
  });
};
// @loading
const loading = () => ({
  type: LOADING
});
// @create article
const createArticle = data => async (dispatch) => {
  const url = '/api/articles';
  const arr = data.tag.join(',');
  const formData = new FormData();
  formData.append('image', data.image);
  formData.append('title', data.title);
  formData.append('body', data.body);
  formData.append('tag', arr);
  await dispatch(loading());
  try {
    const send = await axios.post(url, formData, config);
    await dispatch({
      type: CREATE_ARTICLE,
      payload: send.data
    });
  } catch (error) {
    await dispatch({
      type: ARTICLE_ERROR,
      payload: error.response
    });
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
  dispatch({
    type: REMOVE_TAG,
    payload: data
  });
};

export {
  getAllArticle as default,
  createArticle,
  addTag,
  removeTag
};
