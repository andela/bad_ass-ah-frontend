import moxios from 'moxios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { highlightText, getUserHighlights } from '../../actions/highlight';

const mockStore = configureStore([thunk]);
const store = mockStore();

describe('resetPassword actions', () => {
  beforeEach(() => {
    moxios.install();
    store.clearActions();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('should save highlighted text', () => {
    const expectedState = {
      errors: {},
      message: 'Success',
      highlightedText: {},
      highlights: []
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedState.highlightedText
      });
    });

    return store.dispatch(highlightText(3, 10, 'qwertye', 'comment', 'Opnel5aKBz')).then(() => {
      expect(store.getActions().length).toBe(2);
    });
  });

  it('should return error while saving error if no comment provided', () => {
    const expectedState = {
      errors: {
        body: []
      },
      message: 'Success',
      highlightedText: {},
      highlights: []
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: expectedState
      });
    });

    return store.dispatch(highlightText(3, 10, 'qwertye', 'Opnel5aKBz')).then(() => {
      expect(store.getActions().length).toBe(2);
    });
  });

  it('should return all user highlights', () => {
    const expectedState = {
      errors: {},
      message: '',
      highlightedText: {},
      highlights: []
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedState.highlights
      });
    });

    return store.dispatch(getUserHighlights('Opnel5aKBz')).then(() => {
      expect(store.getActions().length).toBe(1);
    });
  });

  it('should return error when no handle provided', () => {
    const expectedState = {
      errors: {
        body: []
      },
      message: '',
      highlightedText: {},
      highlights: []
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: expectedState
      });
    });

    return store.dispatch(getUserHighlights()).then(() => {
      expect(store.getActions().length).toBe(1);
    });
  });
});
