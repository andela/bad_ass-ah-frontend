import { SOCIAL_LOGIN_FAILURE, SOCIAL_LOGIN_SUCCESS } from '../actions/types';

const initialState = {
  token: null,
  isAuthenticated: null,
  loading: true,
  user: null
};
export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SOCIAL_LOGIN_SUCCESS:
      return {
        ...state,
        token: localStorage.getItem('token'),
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    case SOCIAL_LOGIN_FAILURE:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        loading: false
      };
    default:
      return state;
  }
};
