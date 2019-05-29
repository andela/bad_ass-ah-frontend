import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { setAlert } from '../../actions/alert';
import { SET_ALERT } from '../../actions/types';

const mockStore = configureStore([thunk]);
const store = mockStore();

describe('alert actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('should set the alert', () => {
    store.dispatch(setAlert('Success', 'success'));
    const expectedAction = {
      type: SET_ALERT,
      payload: {
        id: store.getActions()[0].payload.id,
        msg: 'Success',
        alertType: 'success'
      }
    };
    expect(store.getActions()).toEqual([expectedAction]);
  });
});
