import moxios from 'moxios';
import configuration from 'redux-mock-store';
import ReduxThunk from 'redux-thunk';
import Hashid from 'hashids';
// @load action
import getAllArticle, {
  createArticle,
  addTag,
  removeTag,
  singleArticle,
  updateArticle,
  deleteArticle
} from '../../actions/article';
// getAllArticle,
const middleware = [ReduxThunk];
const mockStore = configuration(middleware);
const Store = mockStore();
const hashids = new Hashid();
// test begin
describe('Article', () => {
  beforeEach(() => {
    moxios.install();
    Store.clearActions();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('Should get all article using GET_ALL_ARTICLE action', () => {
    const expectedResult = {
      status: 200,
      articles: []
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        resposne: expectedResult
      });
    });
    return Store.dispatch(getAllArticle()).then(() => {
      expect(Store.getActions().length).toBe(1);
    });
  });

  it('Should not get all article using GET_ALL_ARTICLE action', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        resposne: 'Internal server error'
      });
    });
    return Store.dispatch(getAllArticle()).then(() => {
      expect(Store.getActions().length).toBe(1);
    });
  });

  it('should create article', async () => {
    const tag = ['laravel', 'igihe'].join(',');
    const form = new FormData();
    form.append('title', 'title');
    form.append('body', 'body');
    form.append('tag', tag);
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          error: '',
          response: 'success'
        }
      });
    });
    return Store.dispatch(createArticle(form)).then(() => {
      expect(Store.getActions().length).toBe(2);
    });
  });

  it('should not create article', async () => {
    const tag = ['laravel', 'igihe'].join(',');
    const form = new FormData();
    form.append('title', 'title');
    form.append('body', 'body');
    form.append('tag', tag);
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: 'Bad request'
      });
    });
    return Store.dispatch(createArticle(form)).then(() => {
      expect(Store.getActions().length).toBe(2);
    });
  });

  it('should add tags using ADD_TAG action', () => {
    const data = 'programing';
    Store.dispatch(addTag(data));
    expect(Store.getActions()).toMatchSnapshot();
    expect(addTag(data).length).toBe(1);
  });
  it('Dispatches the correct action and payload', () => {
    Store.dispatch(removeTag('fish'));
    expect(Store.getActions()).toMatchSnapshot();
  });
  it('should test single article with action SINGLE_ARTICLE and paylod', () => {
    const id = hashids.encode(1);
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          error: '',
          response: 'success'
        }
      });
    });
    return Store.dispatch(singleArticle(id)).then(() => {
      expect(Store.getActions().length).toBe(2);
    });
  });
  it('should not test single article with action SINGLE_ARTICLE and paylod', () => {
    const id = hashids.encode(1);
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: 'Error'
      });
    });
    return Store.dispatch(singleArticle(id)).then(() => {
      expect(Store.getActions().length).toBe(1);
    });
  });
  it('should allows to update article', () => {
    const id = hashids.encode(1);
    localStorage.setItem('token', 'token');
    const expectedResponse = {
      status: 200,
      message: 'success'
    };
    const formData = {
      title: 'i love javascript',
      body: 'this is java',
      tag: 'tag1, tag2',
      image: 'image.png'
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedResponse
      });
    });
    return Store.dispatch(updateArticle(id, formData)).then(() => {
      expect(Store.getActions().length).toBe(1);
      expect(Store.getActions()).toBeDefined();
    });
  });
  it('should not allow to update article', () => {
    const id = hashids.encode(1);
    const formData = {
      title: 'i love javascript',
      body: 'this is java',
      tag: 'tag1, tag2',
      image: 'image.png'
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: 'Error'
      });
    });
    return Store.dispatch(updateArticle(id, formData)).then(() => {
      expect(Store.getActions().length).toBe(1);
    });
  });
  it('should delete article', () => {
    const id = hashids.encode(1);
    const expectedResponse = {
      status: 200,
      message: 'success'
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedResponse
      });
    });
    return Store.dispatch(deleteArticle(id)).then(() => {
      expect(Store.getActions().length).toBe(1);
      expect(Store.getActions()).toBeDefined();
    });
  });

  it('should delete article', () => {
    const id = hashids.encode(1);
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: 'Error'
      });
    });
    return Store.dispatch(deleteArticle(id)).then(() => {
      expect(Store.getActions().length).toBe(1);
    });
  });
});
