import {
  ADD_COMMENT, GET_COMMENTS, COMMENT_LOADING, VOTE_COMMENT, VOTE_USER
} from '../../actions/types';
// @ the initial state
const initiState = {
  comments: [],
  comment: {},
  loading: false,
  likeComment: 0,
  dislikeComment: 0,
  commentID: 0,
  votes: null
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
    case VOTE_COMMENT:
      return {
        ...state,
        likeComment: payload.data.votes.likes,
        dislikeComment: payload.data.votes.dislikes,
        commentID: payload.data.comment.id
      };
    case VOTE_USER:
      return {
        ...state,
        votes: payload.data
      };
    default:
      return state;
  }
}
