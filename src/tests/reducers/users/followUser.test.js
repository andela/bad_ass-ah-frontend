import { FOLLOW_A_USER, UNFOLLOW_A_USER } from '../../../actions/types';

import followUser from '../../../reducers/users/followUser';

describe('comments reducer', () => {
  const initialState = {
    followOneUser: null,
    unfollowOneUser: null
  };
  it('should return default state', () => {
    const newSate = followUser({}, {});
    expect(newSate).toEqual({});
  });

  it('should return new state if action type is FOLLOW_A_USER', () => {
    const payload = {
      status: 201,
      message: ' Thank you for following Gracian.'
    };
    const newSate = followUser(initialState, {
      type: FOLLOW_A_USER,
      payload
    });
    expect(newSate.followOneUser).toEqual(payload);
  });
  it('should return new state if action type is UNFOLLOW_A_USER', () => {
    const payload = {
      status: 200,
      message: 'unfollowed successfully.'
    };
    const newSate = followUser(initialState, {
      type: UNFOLLOW_A_USER,
      payload
    });
    expect(newSate.unfollowOneUser).toEqual(payload);
  });
});
