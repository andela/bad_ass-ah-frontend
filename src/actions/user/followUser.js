/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import axios from 'axios';
import Hashid from 'hashids';
import { checkToken } from '../../utils/checkToken';

import { FOLLOW_A_USER, UNFOLLOW_A_USER, GET_ERRORS } from '../types';

const hashids = new Hashid('', 10);

const followUser = followee => async (dispatch) => {
  try {
    const url = `/api/users/follow/${followee}`;
    checkToken();
    const res = await axios.post(url);
    dispatch({
      type: FOLLOW_A_USER,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};
const unfollowUser = unfollow => async (dispatch) => {
  try {
    const url = `/api/users/unfollow/${unfollow}`;
    checkToken();
    const res = await axios.delete(url);
    dispatch({
      type: UNFOLLOW_A_USER,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export { followUser as default, unfollowUser };
