import moxios from 'moxios';
import configuration from 'redux-mock-store';
import ReduxThunk from 'redux-thunk';
import Hashid from 'hashids';
// @load action
import bookmarkArticle from '../../actions/bookmarkArticle';
// getAllArticle,
const middleware = [ReduxThunk];
const mockStore = configuration(middleware);
const Store = mockStore();
const hashids = new Hashid();
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
});
