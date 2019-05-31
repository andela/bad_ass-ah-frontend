import axios from 'axios';
import {
  SEND_LINK_SUCCESS,
  SEND_LINK_FAIL,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_SUCCESS
} from './types';
import { setAlert } from './alert';
import { setContentType } from '../utils/setContentType';

const config = setContentType();
const performAction = (type, payload) => ({
  type,
  payload
});
const BACKEND_URL = 'https://badass-ah-backend-staging.herokuapp.com';
export const sendEmail = email => async (dispatch) => {
  const body = JSON.stringify({ email });

  try {
    const res = await axios.post(`${BACKEND_URL}/api/users/password`, body, config);

    dispatch(performAction(SEND_LINK_SUCCESS, res.data));
    dispatch(setAlert('Check your email to continue', 'success'));
  } catch (error) {
    if (error.response) {
      dispatch(performAction(SEND_LINK_FAIL, error.response.data));
      dispatch(setAlert(error.response.data.error, 'danger'));
    }
  }
};

export const resetPassword = (token, password) => async (dispatch) => {
  const body = JSON.stringify({ token, password });

  try {
    const res = await axios.put(`${BACKEND_URL}/api/users/password`, body, config);

    dispatch(performAction(RESET_PASSWORD_SUCCESS, res.data));
  } catch (error) {
    if (error.response) {
      dispatch(performAction(RESET_PASSWORD_FAIL, error.response.data));
      dispatch(setAlert(error.response.data.error, 'danger'));
    }
  }
};
