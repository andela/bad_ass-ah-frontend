import moxios from 'moxios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import getEditedComments from '../../../actions/comment/editedComments';

const mockStore = configureStore([thunk]);
const store = mockStore();

describe('Comment actions', () => {
  beforeEach(() => {
    moxios.install();
    store.clearActions();
  });
  afterEach(() => {
    moxios.uninstall();
  });


  it('Should get all comments', () => {
    const expectedResponse = {
      comments: {},
      loading: false
    };
    const articleId = 3;
    const commentId = 2;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedResponse
      });
    });

    return store.dispatch(getEditedComments(articleId, commentId)).then(() => {
      expect(store.getActions().length).toBe(2);
    });
  });
  it('Should not with a wrong comment id get all comments', () => {
    const expectedResponse = {
      comments: {},
      loading: false
    };
    const articleId = 3;
    const commentId = '';

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: expectedResponse
      });
    });

    return store.dispatch(getEditedComments(articleId, commentId)).then(() => {
      expect(store.getActions().length).toBe(2);
    });
  });
});
