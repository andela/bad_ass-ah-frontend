import {
  GET_PROFILE,
  PROFILE_ERROR,
  GET_FOLLOWERS,
  GET_FOLLOWING,
  GET_USER_ARTICLES
} from '../../actions/types';
import profile from '../../reducers/profile';

describe('profile reducer', () => {
  it('should return default state', () => {
    const newSate = profile([], {});
    expect(newSate).toEqual([]);
  });

  it('should return new state if action type is GET_PROFILE OR UPDATE_PROFILE_SUCCESS', () => {
    const payload = {
      loading: false,
      profile: {
        username: 'John Doe',
        bio: 'My bio',
        image: 'image'
      },
      error: null
    };
    const newSate = profile([], {
      type: GET_PROFILE,
      payload
    });
    expect(newSate).toEqual(payload);
  });

  it('should return new state if action type is PROFILE_ERROR OR UPDATE_PROFILE_FAIL', () => {
    const payload = {
      loading: false,
      profile: null,
      followers: {},
      following: {},
      articles: {},
      error: 'Error'
    };
    const newSate = profile([], {
      type: PROFILE_ERROR,
      payload: payload.error
    });
    expect(newSate).toEqual(payload);
  });

  it('should return new state if action type is GET_FOLLOWERS', () => {
    const payload = {
      loading: false,
      followers: [],
      error: null
    };
    const newSate = profile([], {
      type: GET_FOLLOWERS,
      payload: payload.followers
    });
    expect(newSate).toEqual(payload);
  });

  it('should return new state if action type is GET_FOLLOWING', () => {
    const payload = {
      loading: false,
      following: [],
      error: null
    };
    const newSate = profile([], {
      type: GET_FOLLOWING,
      payload: payload.following
    });
    expect(newSate).toEqual(payload);
  });

  it('should return new state if action type is GET_USER_ARTICLES', () => {
    const payload = {
      loading: false,
      articles: [],
      error: null
    };
    const newSate = profile([], {
      type: GET_USER_ARTICLES,
      payload: payload.articles
    });
    expect(newSate).toEqual(payload);
  });
});
