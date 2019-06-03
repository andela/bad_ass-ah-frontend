import { GET_ERRORS } from '../../../actions/types';

import comment from '../../../reducers/errors/errors';

describe('comments reducer', () => {
  const initialState = {};
  it('should return default state', () => {
    const newState = comment([], {});
    expect(newState).toEqual([]);
  });

  it('should return new state if action type is GET_ERRORS', () => {
    const payload = {
      status: 400,
      error: 'Please add the body of your comments'
    };
    const newState = comment(initialState, {
      type: GET_ERRORS,
      payload
    });
    expect(newState).toEqual(payload);
  });
});
