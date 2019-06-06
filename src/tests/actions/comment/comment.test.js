import moxios from 'moxios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import addComment, { getComments } from '../../../actions/comment/comment';

const mockStore = configureStore([thunk]);
const store = mockStore();

describe('Post a new comment', () => {
  beforeEach(() => {
    moxios.install();
    store.clearActions();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('should create a new comment', () => {
    const expectedState = {
      comments: []
    };
    const commentData = {
      text: 'demmy text'
    };
    const articleId = 'VolejRejNm';

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: expectedState
      });
    });

    return store.dispatch(addComment(commentData, articleId)).then(() => {
      expect(store.getActions().length).toBe(1);
    });
  });

  it('Should not send a comment with am empty body', () => {
    const expectedState = {
      comments: []
    };
    const commentData = {
      text: ''
    };
    const articleId = 'VolejRejNm';

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: expectedState
      });
    });

    return store.dispatch(addComment(commentData, articleId)).then(() => {
      expect(store.getActions().length).toBe(1);
    });
  });

  it('Should get all comments', () => {
    const expectedResponse = {
      comments: {},
      loading: false
    };
    const articleId = 'VolejRejNm';

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedResponse
      });
    });

    return store.dispatch(getComments(articleId)).then(() => {
      expect(store.getActions().length).toBe(2);
    });
  });

  it('Should not get all comment with an empty articleId', () => {
    const expectedResponse = {
      comments: {},
      loading: false
    };
    const articleId = '';

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: expectedResponse
      });
    });

    return store.dispatch(getComments(articleId)).then(() => {
      expect(store.getActions().length).toBe(2);
    });
  });
});
