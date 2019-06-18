import { GET_EDITED_COMMENTS, EDITED_COMMENT_LOADING } from '../../actions/types';
// @ the initial state
const initiState = {
  EditedComments: [],
  loading: false
};

export default function (state = initiState, action) {
  const { type, payload } = action;
  switch (type) {
    case EDITED_COMMENT_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_EDITED_COMMENTS:
      return {
        ...state,
        EditedComments: payload,
        loading: false
      };
    default:
      return state;
  }
}
