import moxios from 'moxios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import addComment, {
  getComments,
  updateComment,
  deleteComment,
  getSingleComment
} from '../../../actions/comment/comment';

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
  it('should update a new comment', () => {
    const expectedState = {
      updatedComment: {}
    };
    const commentData = {
      text: 'demmy text'
    };
    const articleId = 3;
    const commentId = 2;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedState
      });
    });

    return store.dispatch(updateComment(commentData, articleId, commentId)).then(() => {
      expect(store.getActions().length).toBe(1);
    });
  });
  it('should not the user update a new comment with an empty body', () => {
    const expectedState = {
      updatedComment: {}
    };
    const commentData = {
      text: ''
    };
    const articleId = 3;
    const commentId = 2;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: expectedState
      });
    });

    return store.dispatch(updateComment(commentData, articleId, commentId)).then(() => {
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

  it('Should get a single comment', () => {
    const expectedResponse = {
      singleComment: {}
    };
    const articleId = 1;
    const commentId = 2;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedResponse
      });
    });

    return store.dispatch(getSingleComment(articleId, commentId)).then(() => {
      expect(store.getActions().length).toBe(1);
    });
  });
  it('Should not get a spicific comment with an empty articleId', () => {
    const expectedResponse = {
      singleComment: {}
    };
    const articleId = '';
    const commentId = 3;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: expectedResponse
      });
    });

    return store.dispatch(getSingleComment(articleId, commentId)).then(() => {
      expect(store.getActions().length).toBe(1);
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
  it('should delete a  comment', () => {
    const expectedState = {
      comments: []
    };
    const articleId = 3;
    const commentId = 2;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedState
      });
    });

    return store.dispatch(deleteComment(commentId, articleId)).then(() => {
      expect(store.getActions().length).toBe(1);
    });
  });
  it('should not let the delete a  comment with a wrong commentId', () => {
    const expectedState = {
      comments: []
    };
    const articleId = 3;
    const commentId = '';

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: expectedState
      });
    });

    return store.dispatch(deleteComment(commentId, articleId)).then(() => {
      expect(store.getActions().length).toBe(1);
    });
  });
});
