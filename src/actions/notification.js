import axios from 'axios';
import { GET_NOTIFICATIONS, GET_NOTIFICATIONS_FAIL } from './types';
import { checkToken } from '../utils/checkToken';

const performAction = (type, payload) => ({
  type,
  payload
});

export const getNotifications = () => async (dispatch) => {
  checkToken();
  try {
    const res = await axios.get('/api/users/notifications');
    dispatch(performAction(GET_NOTIFICATIONS, res.data));
  } catch (error) {
    if (error.response) {
      dispatch(performAction(GET_NOTIFICATIONS_FAIL, error.response.data));
    }
  }
};

export const readNotification = id => async (dispatch) => {
  checkToken();
  try {
    await axios.get(`/api/users/notifications/${id}`);
    const res = await axios.get('/api/users/notifications');
    dispatch(performAction(GET_NOTIFICATIONS, res.data));
  } catch (error) {
    if (error.response) {
      dispatch(performAction(GET_NOTIFICATIONS_FAIL, error.response.data));
    }
  }
};
