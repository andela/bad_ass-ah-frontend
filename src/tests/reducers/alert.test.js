import { SET_ALERT, REMOVE_ALERT } from '../../actions/types';
import alert from '../../reducers/alert';

describe('alert reducer', () => {
  it('should return default state', () => {
    const newSate = alert([], {});
    expect(newSate).toEqual([]);
  });

  it('should return new state if action type is SET_ALERT', () => {
    const payload = {};
    const newSate = alert([], {
      type: SET_ALERT,
      payload
    });
    expect(newSate).toEqual([payload]);
  });

  it('should return new state if action type is REMOVE_ALERT', () => {
    const initialState = [
      {
        id: 1,
        msg: 'Error',
        alertType: 'danger'
      },
      {
        id: 2,
        msg: 'Success',
        alertType: 'success'
      }
    ];

    const payload = {
      id: 2,
      msg: 'Success',
      alertType: 'success'
    };

    const newSate = alert(initialState, {
      type: REMOVE_ALERT,
      payload: payload.id
    });
    expect(newSate).toEqual(initialState.filter(alert => alert.id !== payload.id));
  });
});
