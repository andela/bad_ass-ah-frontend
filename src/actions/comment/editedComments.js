/* eslint-disable no-use-before-define */
import axios from 'axios';

import { GET_EDITED_COMMENTS, EDITED_COMMENT_LOADING } from '../types';
import Config from '../../helpers/jsonConfig';

const getEditedComments = (articleId, commentId) => async (dispatch) => {
  try {
    dispatch(setEditedCommentLoading());
    const url = `/api/articles/${articleId}/comments/${commentId}/edited`;
    const res = await axios.get(url, Config);

    dispatch({
      type: GET_EDITED_COMMENTS,
      payload: res.data.editedComment
    });
  } catch (error) {
    dispatch({
      type: GET_EDITED_COMMENTS,
      payload: null
    });
  }
};

const setEditedCommentLoading = () => ({
  type: EDITED_COMMENT_LOADING
});

export { getEditedComments as default };
