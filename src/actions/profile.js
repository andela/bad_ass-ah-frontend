/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import {
  GET_PROFILE,
  PROFILE_ERROR,
  GET_FOLLOWERS,
  GET_FOLLOWING,
  GET_USER_ARTICLES,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL
} from './types';
import { checkToken } from '../utils/checkToken';
import { setContentType } from '../utils/setContentType';
import { setAlert } from './alert';

const config = setContentType('multipart/form-data');

const performAction = (type, payload) => ({
  type,
  payload
});

export const getCurrentProfile = () => async (dispatch) => {
  checkToken();
  try {
    const res = await axios.get('/api/users/profile');
    dispatch(performAction(GET_PROFILE, res.data));
  } catch (error) {
    dispatch(performAction(PROFILE_ERROR, error.response));
  }
};

export const getUserFollowers = () => async (dispatch) => {
  checkToken();

  try {
    const res = await axios.get('/api/users/followers');

    dispatch(performAction(GET_FOLLOWERS, res.data));
  } catch (error) {
    dispatch(performAction(PROFILE_ERROR, error.response));
  }
};

export const getUserFollowing = () => async (dispatch) => {
  checkToken();

  try {
    const res = await axios.get('/api/users/following');

    dispatch(performAction(GET_FOLLOWING, res.data));
  } catch (error) {
    dispatch(performAction(PROFILE_ERROR, error.response));
  }
};

export const getUserArticles = () => async (dispatch) => {
  checkToken();

  try {
    const res = await axios.get('/api/users/articles');

    dispatch(performAction(GET_USER_ARTICLES, res.data));
  } catch (error) {
    dispatch(performAction(PROFILE_ERROR, error.response));
  }
};

export const updateProfile = (profileData, history) => async (dispatch) => {
  checkToken();

  try {
    const formData = new FormData();
    formData.append('username', profileData.username);
    formData.append('bio', profileData.bio);
    formData.append('image', profileData.image);

    const res = await axios.put('/api/users/profile', formData, config);

    dispatch(performAction(UPDATE_PROFILE_SUCCESS, res.data));
    dispatch(setAlert('Profile successfully updated.', 'success'));
    history.push('/view-profile');
  } catch (error) {
    if (error.response) {
      dispatch(performAction(UPDATE_PROFILE_FAIL, error.response.data));
      dispatch(setAlert(error.response.data.error, 'danger'));
    }
  }
};
