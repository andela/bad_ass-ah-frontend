import { ACTIVATE_USER, ACTIVATE_USER_FAILURE } from '../actions/types';

const initialState = {
  isActivated: false,
  error: ''
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ACTIVATE_USER:
      return {
        ...state,
        error: '',
        isActivated: payload.isActivated
      };
    case ACTIVATE_USER_FAILURE:
      return {
        ...state,
        error: payload,
        isActivated: false,
      };

    default:
      return state;
  }
}
