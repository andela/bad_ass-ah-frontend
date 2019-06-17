import moxios from 'moxios';
import configuration from 'redux-mock-store';
import ReduxThunk from 'redux-thunk';
import Hashid from 'hashids';
// @load action
import {
  bookmarkArticle,
  fetchBookmarks,
  unBookmark
} from '../../actions/bookmarkArticle';
import {
  VIEW_BOOKMARKS,
  VIEW_BOOKMARKS_FAILURE,
  UNBOOKMARK_ARTICLE_SUCCESS,
  UNBOOKMARK_ARTICLE_FAILURE
} from '../../actions/types';
// getAllArticle,
const middleware = [ReduxThunk];
const mockStore = configuration(middleware);
const Store = mockStore();
const hashids = new Hashid('', 10);
// test begin
describe('Article', () => {
  beforeEach(() => {
    moxios.wait();
    Store.clearActions();
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('should test single article with action BOOKMARK_ARTICLE_SUCCESS and paylod', () => {
    const id = hashids.encode('l4zbqj2dpr');
    moxios.stubRequest(`https://badass-ah-backend-staging.herokuapp.com/api/articles/${id}/bookmark`, {
      status: 201,
      resposne: {
        message: 'hello world'
      }
    });
    Store.dispatch(bookmarkArticle(id));
    expect(bookmarkArticle()).toBeDefined();
  });

  it('should test single article with action BOOKMARK_ARTICLE_SUCCESS and paylod', () => {
    const id = hashids.encode('l4zbqj2dpr');
    moxios.stubRequest(`https://badass-ah-backend-staging.herokuapp.com/api/articles/${id}/bookmark`, {
      status: 401,
      resposne: {
        message: 'hello world'
      }
    });
    Store.dispatch(bookmarkArticle(id));
    expect(bookmarkArticle()).toBeDefined();
  });

  it('should test single article with action BOOKMARK_ARTICLE_SUCCESS and paylod', () => {
    const id = hashids.encode(1);
    Store.dispatch(bookmarkArticle(id));
    expect(bookmarkArticle()).toBeDefined();

    const expectedState = {
      message: 'message',
      userId: 3,
      article: 34
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedState
      });

      const request2 = moxios.requests.mostRecent();
      request2.respondWith({
        status: 200,
        response: {
          status: 200,
          article: {}
        }
      });
    });

    return Store.dispatch(bookmarkArticle(id)).then(() => {
      expect(Store.getActions().length).toBe(1);
    });
  });
  it('should test single article with action BOOKMARK_ARTICLE_SUCCESS and paylod', () => {
    const id = hashids.encode(1);
    Store.dispatch(bookmarkArticle(id));
    expect(bookmarkArticle()).toBeDefined();

    const expectedState = {
      message: 'message',
      userId: 3,
      article: 34
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 401,
        response: expectedState
      });

      const request2 = moxios.requests.mostRecent();
      request2.respondWith({
        status: 401,
        response: {
          status: 401,
          article: {}
        }
      });
    });

    return Store.dispatch(bookmarkArticle(id)).then(() => {
      expect(Store.getActions().length).toBe(1);
    });
  });

  it('should dispatch successful action', async () => {
    const BACKEND_URL = 'https://badass-ah-backend-staging.herokuapp.com';
    await moxios.stubRequest(`${BACKEND_URL}/api/articles/bookmark`, {
      status: 200,
      response: []
    });
    return Store.dispatch(fetchBookmarks()).then(() => {
      const expectedAction = [{
        type: VIEW_BOOKMARKS,
        payload: []
      }];
      expect(Store.getActions()).toEqual(expectedAction);
    });
  });

  it('should dispatch successful action', async () => {
    const BACKEND_URL = 'https://badass-ah-backend-staging.herokuapp.com';
    await moxios.stubRequest(`${BACKEND_URL}/api/articles/bookmark`, {
      status: 400,
      response: 'Request failed with status code 400'
    });
    const expectedAction = [{
      payload: 'Request failed with status code 400',
      type: VIEW_BOOKMARKS_FAILURE
    }];

    return Store.dispatch(fetchBookmarks()).then(() => {
      expect(Store.getActions()).toEqual(expectedAction);
    });
  });
  it('should dispatch UNBOOKMARK_ARTICLE_SUCCESS action creator', (done) => {
    const BACKEND_URL = 'https://badass-ah-backend-staging.herokuapp.com';
    const articleId = 'yMYer06bOB';
    const hashedId = hashids.decode(articleId);
    const bookmarkId = 1;
    const expectedAction = [{
      type: UNBOOKMARK_ARTICLE_SUCCESS,
      payload: bookmarkId
    }];
    moxios.stubRequest(`${BACKEND_URL}/api/articles/${hashedId}/bookmark`, {
      status: 200,
      response: [{
        message: 'some results'
      }]
    });
    return Store.dispatch(unBookmark(articleId, bookmarkId)).then(() => {
      expect(Store.getActions()).toEqual(expectedAction);
      done();
    });
  });
  it('should dispatch UNBOOKMARK_ARTICLE_SUCCESS action creator', (done) => {
    const BACKEND_URL = 'https://badass-ah-backend-staging.herokuapp.com';
    const articleId = 'yMYer06bOB';
    const hashedId = hashids.decode(articleId);
    const bookmarkId = 1;
    const payload = 'Request failed with status code 401';
    const expectedAction = [{
      type: UNBOOKMARK_ARTICLE_FAILURE,
      payload,
    }];
    moxios.stubRequest(`${BACKEND_URL}/api/articles/${hashedId}/bookmark`, {
      status: 401,
      response: payload
    });
    return Store.dispatch(unBookmark(articleId, bookmarkId)).then(() => {
      expect(Store.getActions()).toEqual(expectedAction);
      done();
    });
  });
});
