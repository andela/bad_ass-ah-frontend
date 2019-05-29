import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { loadUser } from '../../actions/socialAuth';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
const username = 'Emabush';

const mockStore = configureStore([thunk]);
const store = mockStore();
describe(' Action loaduser ', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('should load the authenticated user', () => store.dispatch(loadUser(token, username)).then(() => {
    expect(store.getActions().length).toBe(1);
  }));
});
