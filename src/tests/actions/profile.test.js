import moxios from 'moxios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  getCurrentProfile,
  getUserArticles,
  getUserFollowers,
  getUserFollowing,
  updateProfile
} from '../../actions/profile';

const mockStore = configureStore([thunk]);
const store = mockStore();

describe('profile action', () => {
  beforeEach(() => {
    moxios.install();
    store.clearActions();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('should get current user profile', () => {
    localStorage.setItem('token', 'token');
    const expectedResponse = {
      username: 'John Doe',
      bio: 'My bio',
      image: 'image'
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedResponse
      });
    });

    return store.dispatch(getCurrentProfile()).then(() => {
      expect(store.getActions().length).toBe(1);
    });
  });

  it('should not get current user profile when no token provided', () => {
    const expectedResponse = {
      error: 'unthorized'
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 401,
        response: expectedResponse
      });
    });

    return store.dispatch(getCurrentProfile()).then(() => {
      expect(store.getActions().length).toBe(1);
    });
  });

  it('should get current user followers', () => {
    localStorage.setItem('token', 'token');
    const expectedResponse = [];

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedResponse
      });
    });

    return store.dispatch(getUserFollowers()).then(() => {
      expect(store.getActions().length).toBe(1);
    });
  });

  it('should not get current user followers when no token provided', () => {
    const expectedResponse = {
      error: 'unthorized'
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 401,
        response: expectedResponse
      });
    });

    return store.dispatch(getUserFollowers()).then(() => {
      expect(store.getActions().length).toBe(1);
    });
  });

  it('should get current user following', () => {
    localStorage.setItem('token', 'token');
    const expectedResponse = [];

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedResponse
      });
    });

    return store.dispatch(getUserFollowing()).then(() => {
      expect(store.getActions().length).toBe(1);
    });
  });

  it('should not get current user following when no token provided', () => {
    const expectedResponse = {
      error: 'unthorized'
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 401,
        response: expectedResponse
      });
    });

    return store.dispatch(getUserFollowing()).then(() => {
      expect(store.getActions().length).toBe(1);
    });
  });

  it('should get current user articles', () => {
    localStorage.setItem('token', 'token');
    const expectedResponse = [];

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedResponse
      });
    });

    return store.dispatch(getUserArticles()).then(() => {
      expect(store.getActions().length).toBe(1);
    });
  });

  it('should not get current user articles when no token provided', () => {
    const expectedResponse = {
      error: 'unthorized'
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 401,
        response: expectedResponse
      });
    });

    return store.dispatch(getUserArticles()).then(() => {
      expect(store.getActions().length).toBe(1);
    });
  });

  it('should update profile', () => {
    const expectedResponse = {
      status: 200,
      message: 'success'
    };

    const formData = {
      username: 'John Doe',
      bio: 'My bio',
      image: 'image'
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedResponse
      });
    });

    return store.dispatch(updateProfile(formData)).then(() => {
      expect(store.getActions().length).toBe(2);
    });
  });

  it('should not update profile', () => {
    const expectedResponse = {
      status: 400,
      error: 'error'
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: expectedResponse
      });
    });

    return store.dispatch(updateProfile('')).then(() => {
      expect(store.getActions().length).toBe(2);
    });
  });
});
