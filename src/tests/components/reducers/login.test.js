import reducer from '../../../reducers/login';
import * as actionTypes from '../../../actions/types';

describe('Login reducer', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      token: null,
      error: null,
      loginRedirectPath: '/',
      isAuthenticated: false
    };
  });
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should successfully store the token upon login', () => {
    expect(reducer(initialState, {
      type: actionTypes.LOGIN_SUCCESS,
      token: 'a-token'
    })).toEqual({
      ...initialState,
      token: 'a-token'
    });
  });

  it('should redirect users when their successfully logged in', () => {
    expect(reducer(initialState, {
      type: actionTypes.SET_LOGIN_REDIRECT_PATH,
      path: 'a-path'
    })).toEqual({
      ...initialState,
      loginRedirectPath: 'a-path'
    });
  });

  it('should return error when something wrong upon login', () => {
    expect(reducer(initialState, {
      type: actionTypes.LOGIN_FAIL,
      error: 'an-error'
    })).toEqual({
      ...initialState,
      error: 'an-error'
    });
  });

  it('should check if a user has logged in', () => {
    expect(reducer(initialState, {
      type: actionTypes.LOGIN_CHECK_STATE,
      isAuthenticated: 'authenticated',
      token: 'a-token'
    })).toEqual({
      ...initialState,
      isAuthenticated: 'authenticated',
      token: 'a-token'
    });
  });
});
