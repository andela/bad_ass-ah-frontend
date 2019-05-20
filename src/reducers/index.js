// @here we will combine all reducers file
import { combineReducers } from 'redux';
import socialAuth from './socialAuth';
import getAllArticle from './article';
import forgotPassword from './forgotPassword';
import resetPassword from './resetPassword';
import alert from './alert';

// @create root reducer

const rootReducer = combineReducers({
  socialAuth,
  articles: getAllArticle,
  alert,
  forgotPassword,
  resetPassword
});

export default rootReducer;
