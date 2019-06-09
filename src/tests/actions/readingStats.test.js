import moxios from 'moxios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../actions/readingStats';
import * as actionTypes from '../../actions/types';

const mockStore = configureStore([thunk]);
const store = mockStore();

describe('Reading Stats actions', () => {
  beforeEach(() => {
    moxios.install();
    store.clearActions();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should dispatch getReadingStats action', () => {
    const expectedState = [{
      type: actionTypes.GET_READING_STATS_SUCCESS,
      readingStats: 3
    }];
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          readingStats: 3
        }
      });
    });
    return store.dispatch(actions.getReadingStats()).then(() => {
      expect(store.getActions()).toEqual(expectedState);
    })
      .catch(() => {
        expect(store.getActions()).toMatchSnapshot();
      });
  });

  it('should dispatch setReadingStats action', () => {
    const expectedState = [{
      type: actionTypes.SET_READING_STATS_FAIL,
      error: null
    }];
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: {
          error: null
        }
      });
    });
    return store.dispatch(actions.setReadingStats('QnXe0Rvbxr')).then(() => {
      expect(store.getActions()).toEqual(expectedState);
    })
      .catch(() => {
        expect(store.getActions()).toMatchSnapshot();
      });
  });

  it('should dispatch "setReadingStatsFail" action if it is fail to set reading stats', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          error: ''
        }
      });
    });

    return store.dispatch(actions.setReadingStats('QnXe0Rvbxr')).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    }).catch(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it('should dispatch "getReadingStatsFail" action if it is fail to get reading stats', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          error: ''
        }
      });
    });

    return store.dispatch(actions.getReadingStats()).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    }).catch(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });
});
