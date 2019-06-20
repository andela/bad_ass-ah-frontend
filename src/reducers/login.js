import * as actionTypes from '../actions/types';
import { updateObject } from './helpers/utility';

const initialState = {
  token: null,
  error: null,
  loginRedirectPath: '/',
  isAuthenticated: false,
  isAdmin: false,
  isLogging: false
};

const loginStart = (state, action) => updateObject(state, {
  isLogging: action.isLogging,
  token: null,
  error: null
});

const loginFail = (state, action) => updateObject(state, {
  error: action.error,
  token: null,
  isLogging: false
});

const loginSuccess = (state, action) => updateObject(state, {
  token: action.token,
  error: null,
  isLogging: false
});

const setLoginRedirectPath = (state, action) => updateObject(state, {
  loginRedirectPath: action.path
});

const loginCheckState = (state, action) => updateObject(state, {
  isAuthenticated: action.isAuthenticated,
  token: action.token,
  isAdmin: action.isAdmin
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START: return loginStart(state, action);
    case actionTypes.LOGIN_SUCCESS: return loginSuccess(state, action);
    case actionTypes.LOGIN_FAIL: return loginFail(state, action);
    case actionTypes.SET_LOGIN_REDIRECT_PATH: return setLoginRedirectPath(state, action);
    case actionTypes.LOGIN_CHECK_STATE: return loginCheckState(state, action);
    default: return state;
  }
};

export default reducer;
