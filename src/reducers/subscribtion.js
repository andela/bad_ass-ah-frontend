import {
  NOTIFICATION_SUBSCRIPTION_SUCCESS,
  NOTIFICATION_SUBSCRIPTION_FAIL
} from '../actions/types';

const initialState = {
  subscribtion: null,
  error: null
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case NOTIFICATION_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        subscribtion: payload.user,
        error: null
      };

    case NOTIFICATION_SUBSCRIPTION_FAIL:
      return {
        ...state,
        subscribtion: null,
        error: payload
      };

    default:
      return state;
  }
}
