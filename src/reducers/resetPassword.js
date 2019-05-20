import { RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL } from '../actions/types';

const initialState = {
  error: '',
  message: '',
  isChanged: false
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        error: '',
        message: payload.message,
        isChanged: true
      };

    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        error: payload.error,
        message: '',
        isChanged: false
      };

    default:
      return state;
  }
}
