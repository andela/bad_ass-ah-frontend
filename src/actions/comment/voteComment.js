import axios from 'axios';
import { VOTE_COMMENT, VOTE_COMMENTS_ERROR, VOTE_USER } from '../types';
import Config from '../../helpers/jsonConfig';
import { PassDispatch } from '../../helpers/Config';
import { checkToken } from '../../utils/checkToken';

const singleComment = (commentId, articleId) => async (dispatch) => {
  try {
    checkToken();
    const single = await axios.get(`/api/articles/${articleId}/comments/${commentId}`);
    dispatch(PassDispatch(VOTE_COMMENT, single.data));
  } catch (error) {
    dispatch({
      type: VOTE_COMMENTS_ERROR,
      payload: error.response
    });
  }
};
const LikeComment = (commentId, articleId) => async (dispatch) => {
  try {
    checkToken();
    const like = await axios.post(`/api/articles/comments/${commentId}/like`, '');
    dispatch(singleComment(commentId, articleId));
    dispatch(PassDispatch(VOTE_USER, like));
    // eslint-disable-next-line no-use-before-define
  } catch (error) {
    dispatch({
      type: VOTE_COMMENTS_ERROR,
      payload: error.response
    });
  }
};
const DisLikeComment = (commentId, articleId) => async (dispatch) => {
  try {
    checkToken();
    const dislike = await axios.post(`/api/articles/comments/${commentId}/dislike`, '', Config);
    dispatch(PassDispatch(VOTE_USER, dislike));
    dispatch(singleComment(commentId, articleId));
  } catch (error) {
    dispatch({
      type: VOTE_COMMENTS_ERROR,
      payload: error.response
    });
  }
};
export {
  LikeComment as default,
  DisLikeComment,
  singleComment
};
