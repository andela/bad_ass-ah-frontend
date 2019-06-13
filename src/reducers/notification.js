import { GET_NOTIFICATIONS, GET_NOTIFICATIONS_FAIL } from '../actions/types';

const initialState = {
  notifications: [],
  error: null
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_NOTIFICATIONS:
      return {
        ...state,
        notifications: payload.notifications,
        error: null
      };

    case GET_NOTIFICATIONS_FAIL:
      return {
        ...state,
        notifications: [],
        error: payload
      };

    default:
      return state;
  }
}
