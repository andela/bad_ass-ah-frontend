// @here we will combine all reducers file
import { combineReducers } from 'redux';
import socialAuth from './socialAuth';

// @create root reducer

const rootReducer = combineReducers({
  socialAuth
});

export default rootReducer;
