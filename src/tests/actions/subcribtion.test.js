import moxios from 'moxios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { subscribe } from '../../actions/subscribtion';

const mockStore = configureStore([thunk]);
const store = mockStore();

describe('notification subscribtion actions', () => {
  beforeEach(() => {
    moxios.install();
    store.clearActions();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('should opt in or out of notifications', () => {
    const expectedResult = {
      status: 200,
      user: {}
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedResult
      });
    });

    return store.dispatch(subscribe()).then(() => {
      expect(store.getActions().length).toBe(1);
    });
  });
  it('should not opt in or out of notifications', () => {
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

    return store.dispatch(subscribe()).then(() => {
      expect(store.getActions().length).toBe(1);
    });
  });
});
