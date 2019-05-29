import { SEND_LINK_FAIL, SEND_LINK_SUCCESS } from '../../actions/types';
import forgotPassword from '../../reducers/forgotPassword';

describe('forgotPassword reducer', () => {
  it('should return default state', () => {
    const newSate = forgotPassword([], {});
    expect(newSate).toEqual([]);
  });

  it('should return new state if action type is SEND_LINK_SUCCESS', () => {
    const payload = {
      error: '',
      response: 'Email sent'
    };
    const newSate = forgotPassword([], {
      type: SEND_LINK_SUCCESS,
      payload
    });
    expect(newSate).toEqual(payload);
  });

  it('should return new state if action type is SEND_LINK_FAIL', () => {
    const payload = {
      error: 'Error',
      response: ''
    };
    const newSate = forgotPassword([], {
      type: SEND_LINK_FAIL,
      payload
    });
    expect(newSate).toEqual(payload);
  });
});
