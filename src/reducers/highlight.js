import {
  HIGHLIGHT_TEXT_SUCCESS,
  HIGHLIGHT_TEXT_FAIL,
  GET_USER_HIGHLIGHTS_SUCCESS,
  GET_USER_HIGHLIGHTS_FAIL
} from '../actions/types';

const initialState = {
  errors: {},
  message: '',
  highlightedText: {},
  highlights: []
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case HIGHLIGHT_TEXT_SUCCESS:
      return {
        ...state,
        errors: {},
        message: payload.message,
        highlightedText: payload.highlightedText,
        highlights: []
      };

    case HIGHLIGHT_TEXT_FAIL:
      return {
        ...state,
        errors: payload.errors,
        message: '',
        highlightedText: {},
        highlights: []
      };

    case GET_USER_HIGHLIGHTS_SUCCESS:
      return {
        ...state,
        errors: {},
        message: '',
        highlightedText: {},
        highlights: payload
      };

    case GET_USER_HIGHLIGHTS_FAIL:
      return {
        ...state,
        errors: payload,
        message: '',
        highlightedText: {},
        highlights: []
      };

    default:
      return state;
  }
}
