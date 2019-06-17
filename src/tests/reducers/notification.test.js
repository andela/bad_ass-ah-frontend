import { GET_NOTIFICATIONS, GET_NOTIFICATIONS_FAIL } from '../../actions/types';
import notification from '../../reducers/notification';

describe('Notification reducer', () => {
  it('should return new state if action type is GET_NOTIFICATIONS', () => {
    const payload = {
      notifications: [],
      error: null
    };
    const newSate = notification([], {
      type: GET_NOTIFICATIONS,
      payload
    });
    expect(newSate).toEqual(payload);
  });

  it('should return new state if action type is GET_NOTIFICATIONS_FAIL', () => {
    const payload = {
      notifications: [],
      error: 'Error'
    };
    const newSate = notification([], {
      type: GET_NOTIFICATIONS_FAIL,
      payload: payload.error
    });
    expect(newSate).toEqual(payload);
  });
});
