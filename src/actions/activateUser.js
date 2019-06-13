import axios from 'axios';
import {
  ACTIVATE_USER, ACTIVATE_USER_FAILURE
} from './types';

const performAction = (type, payload) => ({
  type,
  payload
});
export const activateUser = token => async (dispatch) => {
  try {
    const res = await axios.get(`/api/users/verify/${token}`);
    dispatch(performAction(ACTIVATE_USER, res.data));
  } catch (error) {
    if (error.response) {
      dispatch(performAction(ACTIVATE_USER_FAILURE, error.response.data));
    }
  }
};
