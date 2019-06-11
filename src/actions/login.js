import axios from 'axios';
import * as actionTypes from './types';

export const loginFail = error => ({
  type: actionTypes.LOGIN_FAIL,
  error
});

export const loginSuccess = token => ({
  type: actionTypes.LOGIN_SUCCESS,
  token
});

export const login = (email, password) => (dispatch) => {
  const data = {
    email,
    password
  };
  return axios.post('/api/users/login', data)
    .then((response) => {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('hasRight', response.data.user.isAdmin);
      dispatch(loginSuccess(response.data.token));
    })
    .catch((error) => {
      let errorMessage = null;
      if (error.response.data.error) {
        errorMessage = error.response.data.error;
      } else {
        errorMessage = 'Something went wrong. Check your internet connection.';
      }
      dispatch(loginFail(errorMessage));
    });
};

export const setLoginRedirectPath = path => ({
  type: actionTypes.SET_LOGIN_REDIRECT_PATH,
  path
});

export const loginCheckState = () => {
  let token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('hasRight');
  if (!token) token = null;
  return {
    type: actionTypes.LOGIN_CHECK_STATE,
    isAuthenticated: token !== null,
    token,
    isAdmin
  };
};
