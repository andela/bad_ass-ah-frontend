import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { registerUser, closeSucessPopUp } from '../../actions/userActions';
import {
  REGISTER_USER_SUCCESS, LOADING_ON_SUBMIT, REGISTER_USER_FAILURE, CLOSE_POPUP_ON_SUCCESS
} from '../../actions/types';

const mockStore = configureStore([thunk]);


describe('userAction', () => {
  moxios.install();
  it('should dispatch REGISTER_USER_SUCCESS', () => {
    const store = mockStore({});
    const data = {
      email: 'it@it.com',
      password: '123456',
      username: 'usernameit'
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: data
      });
    });

    return registerUser(data)(store.dispatch).then(() => {
      const action = store.getActions();
      expect(action[0].type).toEqual(LOADING_ON_SUBMIT);
      expect(action[1].type).toEqual(REGISTER_USER_SUCCESS);
      expect(action[1].payload).toEqual(data);
    });
  });


  it('should dispatch REGISTER_USER_FAILURE', () => {
    const store = mockStore({});
    const data = {
      email: 'it@it.com',
      password: '123456',
      username: 'usernameit'
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: data
      });
    });

    return registerUser(data)(store.dispatch).then(() => {
      const action = store.getActions();
      expect(action[0].type).toEqual(LOADING_ON_SUBMIT);
      expect(action[1].type).toEqual(REGISTER_USER_FAILURE);
    });
  });
  it('should dispatch CLOSE_POPUP_ON_SUCCESS', () => {
    const store = mockStore({});
    closeSucessPopUp()(store.dispatch);
    const action = store.getActions();
    expect(action[0].type).toEqual(CLOSE_POPUP_ON_SUCCESS);
  });
});
