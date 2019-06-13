import axios from 'axios';
import Hashid from 'hashids';
import {
  HIGHLIGHT_TEXT_SUCCESS,
  HIGHLIGHT_TEXT_FAIL,
  GET_USER_HIGHLIGHTS_SUCCESS,
  GET_USER_HIGHLIGHTS_FAIL
} from './types';
import { setAlert } from './alert';
import { setContentType } from '../utils/setContentType';
import { checkToken } from '../utils/checkToken';

const config = setContentType('application/json');
const performAction = (type, payload) => ({
  type,
  payload
});

const hashids = new Hashid('', 10);

export const highlightText = ({
  indexStart,
  indexEnd,
  text,
  comment,
  handle
}) => async (dispatch) => {
  checkToken();
  try {
    const body = JSON.stringify({
      indexStart,
      indexEnd,
      text,
      comment
    });

    const res = await axios.post(
      `/api/articles/${hashids.decode(handle)}/highlights`,
      body,
      config
    );
    dispatch(performAction(HIGHLIGHT_TEXT_SUCCESS, res.data));
    dispatch(setAlert(res.data.message, 'success'));
    const commentPopover = document.getElementsByClassName('comment-popover')[0];
    commentPopover.classList.add('hide');
  } catch (error) {
    if (error.response) {
      dispatch(performAction(HIGHLIGHT_TEXT_FAIL, error.response.data));
      dispatch(setAlert(error.response.data.errors.body[0], 'danger'));
    }
  }
};

export const getUserHighlights = handle => async (dispatch) => {
  checkToken();
  try {
    const res = await axios.get(`/api/articles/${hashids.decode(handle)}/user-highlights`);
    dispatch(performAction(GET_USER_HIGHLIGHTS_SUCCESS, res.data));
  } catch (error) {
    if (error.response) {
      dispatch(performAction(GET_USER_HIGHLIGHTS_FAIL, error.response.data));
    }
  }
};
