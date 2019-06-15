import moxios from 'moxios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import followUser, { unfollowUser } from '../../../actions/user/followUser';

const mockStore = configureStore([thunk]);
const store = mockStore();

describe('FollowUser actions', () => {
  beforeEach(() => {
    moxios.install();
    store.clearActions();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('should follow a given user', () => {
    const expectedState = {
      followOneUser: null
    };
    const followee = 1;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: expectedState
      });
    });

    return store.dispatch(followUser(followee)).then(() => {
      expect(store.getActions().length).toBe(1);
    });
  });
  it('should not follow a given user with an empty userId', () => {
    const expectedState = {
      followOneUser: null
    };
    const followee = '';

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: expectedState
      });
    });

    return store.dispatch(followUser(followee)).then(() => {
      expect(store.getActions().length).toBe(1);
    });
  });
  it('should unfollow a given user', () => {
    const expectedState = {
      unfollowOneUser: null
    };
    const unfollow = 1;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedState
      });
    });

    return store.dispatch(unfollowUser(unfollow)).then(() => {
      expect(store.getActions().length).toBe(1);
    });
  });
  it('should not unfollow a given user with an empty userId', () => {
    const expectedState = {
      unfollowOneUser: null
    };
    const unfollow = '';

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: expectedState
      });
    });

    return store.dispatch(unfollowUser(unfollow)).then(() => {
      expect(store.getActions().length).toBe(1);
    });
  });
});
