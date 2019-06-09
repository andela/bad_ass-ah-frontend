import {
  ADD_COMMENT,
  GET_COMMENTS,
  COMMENT_LOADING,
  DELETE_COMMENT,
  GET_SINGLE_COMMENT,
  UPDATE_COMMENT
} from '../../actions/types';
// @ the initial state
const initiState = {
  comments: [],
  singleComment: {},
  loading: false,
  updatedComment: {}
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
    case GET_SINGLE_COMMENT:
      return {
        ...state,
        singleComment: payload,
        loading: false
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: [payload, ...state.comments]
      };
    case UPDATE_COMMENT:
      return {
        ...state,
        updatedComment: payload
      };
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(comment => comment.id !== payload)
      };
    default:
      return state;
  }
}
