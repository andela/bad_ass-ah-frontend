import {
  NOTIFICATION_SUBSCRIPTION_SUCCESS,
  NOTIFICATION_SUBSCRIPTION_FAIL
} from '../../actions/types';
import subscribtion from '../../reducers/subscribtion';

describe('Notification subscribtion reducer', () => {
  it('should return new state if action type is NOTIFICATION_SUBSCRIPTION_SUCCESS', () => {
    const payload = {
      subscribtion: {},
      error: null
    };
    const newSate = subscribtion([], {
      type: NOTIFICATION_SUBSCRIPTION_SUCCESS,
      payload: {
        user: {}
      }
    });
    expect(newSate).toEqual(payload);
  });

  it('should return new state if action type is NOTIFICATION_SUBSCRIPTION_FAIL', () => {
    const payload = {
      subscribtion: null,
      error: 'Error'
    };
    const newSate = subscribtion([], {
      type: NOTIFICATION_SUBSCRIPTION_FAIL,
      payload: payload.error
    });
    expect(newSate).toEqual(payload);
  });
});
