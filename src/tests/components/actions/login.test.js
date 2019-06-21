import moxios from 'moxios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../../actions/login';
import * as actionTypes from '../../../actions/types';

const mockStore = configureStore([thunk]);
const store = mockStore();

describe('Login actions', () => {
  beforeEach(() => {
    moxios.install();
    store.clearActions();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should dispatch "loginSuccess" action', () => {
    const expectedState = [
      {
        type: actionTypes.LOGIN_START,
        isLogging: true
      },
      {
        type: actionTypes.LOGIN_SUCCESS,
        token: 'a-token'
      }
    ];

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          token: 'a-token',
          openId: 'open',
          user: {
            isAdmin: null
          }
        }
      });
    });

    return store.dispatch(actions.login('email', 'password')).then(() => {
      expect(store.getActions()).toEqual(expectedState);
    });
  });

  it('should dispatch "loginFail" action', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          error: 'an-error'
        }
      });
    });

    return store.dispatch(actions.login()).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it('should dispatch "loginFail" action for something wrong', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          errorr: 'Something wrong here, action is not defined'
        }
      });
    });

    return store.dispatch(actions.login()).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it('should create an action if login fails', () => {
    const error = 'error';
    const expectedState = {
      type: actionTypes.LOGIN_FAIL,
      error
    };
    expect(actions.loginFail(error)).toEqual(expectedState);
  });

  it('should create an action for successfully logging in', () => {
    const token = 'a-token';
    const expectedState = {
      type: actionTypes.LOGIN_SUCCESS,
      token
    };
    expect(actions.loginSuccess(token)).toEqual(expectedState);
  });

  it('should create an action for redirecting user when successfully logged in', () => {
    const path = 'a-path';
    const expectedState = {
      type: actionTypes.SET_LOGIN_REDIRECT_PATH,
      path
    };
    expect(actions.setLoginRedirectPath(path)).toEqual(expectedState);
  });

  it('should create an action for checking if a user has authenticated', () => {
    let token;
    const expectedState = {
      type: actionTypes.LOGIN_CHECK_STATE,
      isAuthenticated: token !== null,
      token: 'a-token',
      isAdmin: 'null'
    };
    expect(actions.loginCheckState()).toEqual(expectedState);
  });
});
