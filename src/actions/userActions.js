import axios from 'axios';
import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  LOADING_ON_SUBMIT,
  CLOSE_POPUP_ON_SUCCESS
} from './types';

const registerSuccess = data => ({
  type: REGISTER_USER_SUCCESS,
  payload: data
});
const loading = loading => ({
  type: LOADING_ON_SUBMIT,
  payload: loading
});
const registerFailure = data => ({
  type: REGISTER_USER_FAILURE,
  payload: data
});
const closePopUp = closePopUp => ({
  type: CLOSE_POPUP_ON_SUCCESS,
  payload: closePopUp
});
const registerUser = data => (dispatch) => {
  dispatch(loading());
  const url = '/api/users';
  return axios.post(url, data).then((res) => {
    dispatch(registerSuccess(res.data));
  }).catch((error) => {
    const {
      data
    } = error.response;
    dispatch((registerFailure(data)));
  });
};

const closeSucessPopUp = () => (dispatch) => {
  dispatch(closePopUp());
};

export { registerUser, closeSucessPopUp };
