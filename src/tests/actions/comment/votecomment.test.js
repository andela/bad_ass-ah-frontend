import moxios from 'moxios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import LikeComment, { DisLikeComment } from '../../../actions/comment/voteComment';

const mockStore = configureStore([thunk]);
const Store = mockStore();
describe('Vote comment action', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('should like comment', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: 'thanks'
        }
      });
    });
    return Store.dispatch(LikeComment(10, 12)).then(() => {
      expect(Store.getActions().length).toBeDefined();
      expect(Store.getActions().length).toBe(1);
    }).catch(() => {
      expect(Store.getActions()).toMatchSnapshot();
    });
  });
  it('should dislike comment', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: 'thanks'
        }
      });
    });
    return Store.dispatch(DisLikeComment(10, 12)).then(() => {
      expect(Store.getActions().length).toBeDefined();
      expect(Store.getActions().length).toBe(2);
    });
  });
  it('should not dislike comment when there is an error', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 401,
        response: {
          message: 'authorized'
        }
      });
    });
    return Store.dispatch(DisLikeComment(10, 12)).then(() => {
      expect(Store.getActions()).toBeDefined();
      expect(Store.getActions().length).toBe(3);
    });
  });
  it('should not like comment when there is an error', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 401,
        response: {
          message: 'authorized'
        }
      });
    });
    return Store.dispatch(LikeComment(10)).then(() => {
      expect(Store.getActions()).toBeDefined();
      expect(Store.getActions().length).toBe(4);
    });
  });
});
