import { SEND_LINK_SUCCESS, SEND_LINK_FAIL } from '../actions/types';

const initialState = {
  error: '',
  response: ''
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SEND_LINK_SUCCESS:
      return {
        ...state,
        error: '',
        response: payload.response
      };

    case SEND_LINK_FAIL:
      return {
        ...state,
        response: '',
        error: payload.error
      };

    default:
      return state;
  }
}
