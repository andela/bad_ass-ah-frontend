import moxios from 'moxios';
import ConfigureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Searching from '../../actions/search';

const mockStore = ConfigureStore([thunk]);
const Store = mockStore();
describe('search actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('Should test  search action ', () => {
    const expectedResponse = {
      status: 200,
      message: 'success'
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: expectedResponse.status,
        response: expectedResponse.message
      });
    });
    return Store.dispatch(Searching(12)).then(() => {
      expect(Store.getActions()).toBeDefined();
    }).catch(() => {
      expect(Store.getActions()).toMatchSnapshot();
    });
  });
});
