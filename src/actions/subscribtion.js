import axios from 'axios';
import { NOTIFICATION_SUBSCRIPTION_SUCCESS, NOTIFICATION_SUBSCRIPTION_FAIL } from './types';
import { checkToken } from '../utils/checkToken';

const performAction = (type, payload) => ({
  type,
  payload
});

export const subscribe = () => async (dispatch) => {
  checkToken();
  try {
    const res = await axios.get('/api/users/notifications/subscribe');
    dispatch(performAction(NOTIFICATION_SUBSCRIPTION_SUCCESS, res.data));
  } catch (error) {
    if (error.response) {
      dispatch(performAction(NOTIFICATION_SUBSCRIPTION_FAIL, error.response.data));
    }
  }
};
