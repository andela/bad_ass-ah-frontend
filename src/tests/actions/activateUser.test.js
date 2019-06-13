import moxios from 'moxios';
import configuration from 'redux-mock-store';
import ReduxThunk from 'redux-thunk';
import { activateUser } from '../../actions/activateUser';

const middleware = [ReduxThunk];
const mockStore = configuration(middleware);
const Store = mockStore();
// test begin
describe('Article', () => {
  beforeEach(() => {
    moxios.install();
    Store.clearActions();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('Should activate a user using ACTIVATE_USER action', () => {
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
    return Store.dispatch(activateUser('helloWorled')).then(() => {
      expect(Store.getActions().length).toBe(1);
    });
  });
  it('Should activate a user using ACTIVATE_USER action', () => {
    const expectedResult = {
      status: 200,
      articles: []
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        resposne: expectedResult
      });
    });
    return Store.dispatch(activateUser('')).then(() => {
      expect(Store.getActions().length).toBe(1);
    });
  });
});
