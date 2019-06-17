import moxios from 'moxios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getNotifications, readNotification } from '../../actions/notification';

const mockStore = configureStore([thunk]);
const store = mockStore();

describe('notification actions', () => {
  beforeEach(() => {
    moxios.install();
    store.clearActions();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('should get all user notifications', () => {
    const expectedResult = {
      status: 200,
      notifications: []
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedResult
      });
    });

    return store.dispatch(getNotifications()).then(() => {
      expect(store.getActions().length).toBe(1);
    });
  });
  it('should not get all user notifications', () => {
    const expectedResult = {
      status: 400,
      error: 'Error'
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: expectedResult
      });
    });

    return store.dispatch(getNotifications()).then(() => {
      expect(store.getActions().length).toBe(1);
    });
  });

  it('should read notification', () => {
    const expectedResult = {
      status: 200,
      notifications: []
    };

    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      await request.respondWith({
        status: 200,
        response: {}
      });
      const request2 = moxios.requests.mostRecent();
      await request2.respondWith({
        status: 200,
        response: expectedResult
      });
    });
    return store.dispatch(readNotification(1)).then(() => {
      expect(store.getActions().length).toBe(1);
    });
  });

  it('should not read notification', () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      await request.respondWith({
        status: 400,
        response: 'Error'
      });
    });
    return store.dispatch(readNotification(1)).then(() => {
      expect(store.getActions().length).toBe(1);
    });
  });
});
