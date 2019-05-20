import moxios from 'moxios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { sendEmail, resetPassword } from '../../actions/resetPassword';

const mockStore = configureStore([thunk]);
const store = mockStore();

describe('resetPassword actions', () => {
  beforeEach(() => {
    moxios.install();
    store.clearActions();
  });
  afterEach(() => {
    moxios.install();
  });

  it('should send the email', () => {
    const expectedState = {
      error: '',
      response: 'Success'
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedState
      });
    });

    return store.dispatch(sendEmail('johndoe@example.com')).then(() => {
      expect(store.getActions().length).toBe(2);
    });
  });

  it('should not send an empty email', () => {
    const expectedState = {
      error: 'Error',
      response: ''
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: expectedState
      });
    });

    return store.dispatch(sendEmail('')).then(() => {
      expect(store.getActions().length).toBe(2);
    });
  });

  it('should reset the password', () => {
    const expectedState = {
      error: '',
      message: 'Success'
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedState
      });
    });

    return store.dispatch(resetPassword('token', 'password')).then(() => {
      expect(store.getActions().length).toBe(1);
    });
  });

  it('should not reset the password if it is not strong', () => {
    const expectedState = {
      error: 'Error',
      message: ''
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: expectedState
      });
    });

    return store.dispatch(resetPassword('token', '')).then(() => {
      expect(store.getActions().length).toBe(2);
    });
  });
});
