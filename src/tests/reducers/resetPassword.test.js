import { RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL } from '../../actions/types';
import resetPassword from '../../reducers/resetPassword';

describe('resetPassword reducer', () => {
  it('should return default state', () => {
    const newSate = resetPassword([], {});
    expect(newSate).toEqual([]);
  });

  it('should return new state if action type is RESET_PASSWORD_SUCCESS', () => {
    const payload = {
      error: '',
      message: 'Password Changed',
      isChanged: true
    };
    const newSate = resetPassword([], {
      type: RESET_PASSWORD_SUCCESS,
      payload
    });
    expect(newSate).toEqual(payload);
  });

  it('should return new state if action type is RESET_PASSWORD_FAIL', () => {
    const payload = {
      error: 'Error',
      message: '',
      isChanged: false
    };
    const newSate = resetPassword([], {
      type: RESET_PASSWORD_FAIL,
      payload
    });
    expect(newSate).toEqual(payload);
  });
});
