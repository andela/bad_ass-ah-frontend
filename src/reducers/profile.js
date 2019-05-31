import {
  GET_PROFILE,
  PROFILE_ERROR,
  GET_FOLLOWERS,
  GET_FOLLOWING,
  GET_USER_ARTICLES,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_SUCCESS
} from '../actions/types';

const initialState = {
  profile: null,
  loading: true,
  error: null,
  followers: {},
  following: {},
  articles: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: payload.profile,
        error: null
      };

    case PROFILE_ERROR:
    case UPDATE_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        profile: null,
        followers: {},
        following: {},
        articles: {},
        error: payload
      };

    case GET_FOLLOWERS:
      return {
        ...state,
        loading: false,
        followers: payload,
        error: null
      };

    case GET_FOLLOWING:
      return {
        ...state,
        loading: false,
        following: payload,
        error: null
      };

    case GET_USER_ARTICLES:
      return {
        ...state,
        loading: false,
        articles: payload,
        error: null
      };

    default:
      return state;
  }
}
