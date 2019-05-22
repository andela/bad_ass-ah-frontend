import signupReducer from '../../reducers/signupReducer';
import {
  REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE, LOADING_ON_SUBMIT, CLOSE_POPUP_ON_SUCCESS
} from '../../actions/types';

describe('userReducer', () => {
  const initalState = {};
  it('should handle SET_SIGNUP_FORM_INPUT', () => {
    const action = {
      type: REGISTER_USER_SUCCESS,
      payload: {
        email: 'it@it.com',
        password: '123456',
        username: 'usernameit'
      }
    };
    const res = signupReducer(initalState, action);
    expect(res.signupForm).toEqual(action.data);
  });
  it('should handle REGISTER_USER_FAILURE', () => {
    const action = {
      type: REGISTER_USER_FAILURE,
      payload: {
        message: 'error'
      }
    };
    const res = signupReducer(initalState, action);
    expect(res.loading).toEqual(false);
    expect(res.errors).toEqual(action.payload);
  });
  it('should handle LOADING_ON_SUBMIT', () => {
    const action = {
      type: LOADING_ON_SUBMIT,
    };
    const res = signupReducer(initalState, action);
    expect(res.loading).toEqual(true);
  });
  it('should handle CLOSE_POPUP_ON_SUCCESS', () => {
    const action = {
      type: CLOSE_POPUP_ON_SUCCESS,
    };
    const res = signupReducer(initalState, action);
    expect(res.successRegisterPopUp).toEqual(false);
  });

  it('should handle default', () => {
    const action = {
      type: 'UNKNOWN_TYPE',
      payload: {
        email: 'it@it.com',
        password: '123456',
        username: 'usernameit',
      }
    };
    const res = signupReducer(initalState, action);
    expect(res).toEqual(initalState);
  });

  it('should handle default without initialState', () => {
    const action = {
      type: 'UNKNOWN_TYPE',
      payload: {
        email: 'it@it.com',
        password: '123456',
        username: 'usernameit',
      }
    };
    const state = {
      loading: false,
      successRegisterPopUp: false
    };
    const res = signupReducer(undefined, action);
    expect(res).toEqual(state);
  });
});
