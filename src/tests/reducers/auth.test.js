import auth from '../../reducers/socialAuth';
import { SOCIAL_LOGIN_SUCCESS, SOCIAL_LOGIN_FAILURE } from '../../actions/type';

const username = 'EmaBush';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
localStorage.setItem('username', username);
localStorage.setItem('token', token);

describe('Login via social media reducer', () => {
  it('should return default state', () => {
    const newSate = auth([], {});
    expect(newSate).toEqual([]);
  });

  it('should return new state if action type is SOCIAL_LOGIN_SUCCESS', () => {
    const payload = {
      token: localStorage.getItem('token'),
      isAuthenticated: true,
      loading: false,
      user: { name: '', username: localStorage.getItem('username') }
    };
    const newSate = auth([], {
      type: SOCIAL_LOGIN_SUCCESS,
      payload: payload.user
    });
    expect(newSate).toEqual(payload);
  });

  it('should return new state if action type is SOCIAL_LOGIN_FAILURE', () => {
    const payload = {
      isAuthenticated: false,
      loading: false
    };
    const newSate = auth([], {
      type: SOCIAL_LOGIN_FAILURE
    });
    expect(newSate).toEqual(payload);
  });
});
