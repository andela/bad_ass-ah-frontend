// @here we will combine all reducers file
import { combineReducers } from 'redux';
import socialAuth from './socialAuth';
import forgotPassword from './forgotPassword';
import resetPassword from './resetPassword';
import alert from './alert';
import loginReducer from './login';

// @create root reducer

const rootReducer = combineReducers({
  socialAuth,
  alert,
  forgotPassword,
  resetPassword,
  login: loginReducer
});

export default rootReducer;
