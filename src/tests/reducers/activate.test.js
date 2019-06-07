import activate from '../../reducers/activate';
import {
  ACTIVATE_USER, ACTIVATE_USER_FAILURE
} from '../../actions/types';

describe('activate', () => {
  const initalState = {
    isActivated: false,
    error: ''
  };
  it('should handle ACTIVATE_USER', () => {
    const action = {
      type: ACTIVATE_USER,
      payload:
      {
        isActivated: true
      }
    };
    const res = activate(initalState, action);
    expect(res).toEqual({ error: '', isActivated: true });
  });
  it('should handle ACTIVATE_USER_FAILURE', () => {
    const action = {
      type: ACTIVATE_USER_FAILURE,
      payload: {
        message: 'error'
      }
    };
    const res = activate(initalState, action);
    expect(res).toEqual({ error: { message: 'error' }, isActivated: false });
  });
});
