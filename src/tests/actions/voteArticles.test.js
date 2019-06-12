import moxios from 'moxios';
import configuration from 'redux-mock-store';
import ReduxThunk from 'redux-thunk';
import Hashid from 'hashids';
// @load action
import { likeArticle, dislikeArticle } from '../../actions/voteArticle';
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
  it('should test single article with action VOTE_ARTICLE and paylod', () => {
    const id = hashids.encode('l4zbqj2dpr');
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        resposne: {
          message: 'hello world'
        }
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
    return Store.dispatch(likeArticle(id)).then(() => {
      expect(Store.getActions().length).toBe(1);
    });
  });

  it('should test single article with action VOTE_ARTICLE and paylod', () => {
    const id = hashids.encode('l4zbqj2dpr');
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 401,
        response: 'Unauthorized'
      });
    });
    return Store.dispatch(likeArticle(id)).then(() => {
      expect(Store.getActions().length).toBe(1);
    });
  });

  it('should test single article with action VOTE_ARTICLE and paylod', () => {
    const id = hashids.encode(1);
    Store.dispatch(dislikeArticle(id));
    expect(dislikeArticle()).toBeDefined();

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

    return Store.dispatch(dislikeArticle(id)).then(() => {
      expect(Store.getActions().length).toBe(1);
    });
  });
  it('should test single article with action VOTE_ARTICLE and paylod', () => {
    const id = hashids.encode(1);
    Store.dispatch(dislikeArticle(id));
    expect(dislikeArticle()).toBeDefined();

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

    return Store.dispatch(dislikeArticle(id)).then(() => {
      expect(Store.getActions().length).toBe(1);
    });
  });
});
