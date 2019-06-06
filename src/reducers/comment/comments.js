import { ADD_COMMENT, GET_COMMENTS, COMMENT_LOADING } from '../../actions/types';
// @ the initial state
const initiState = {
  comments: [],
  comment: {},
  loading: false
};

export default function (state = initiState, action) {
  const { type, payload } = action;
  switch (type) {
    case COMMENT_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_COMMENTS:
      return {
        ...state,
        comments: payload,
        loading: false
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: [payload, ...state.comments]
      };
    default:
      return state;
  }
}
