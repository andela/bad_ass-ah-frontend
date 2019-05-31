/* eslint-disable import/prefer-default-export */
import { SOCIAL_LOGIN_SUCCESS, SOCIAL_LOGIN_FAILURE } from './types';

export const loadUser = (token, username) => async (dispatch) => {
  if (token) {
    try {
      localStorage.setItem('token', token);
      dispatch({
        type: SOCIAL_LOGIN_SUCCESS,
        payload: username
      });
    } catch (err) {
      dispatch({
        type: SOCIAL_LOGIN_FAILURE
      });
    }
  }
};
