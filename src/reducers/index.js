// @here we will combine all reducers file
import { combineReducers } from 'redux';
import socialAuth from './socialAuth';
import forgotPassword from './forgotPassword';
import resetPassword from './resetPassword';
import alert from './alert';
import loginReducer from './login';
import getAllArticle from './article';
import profile from './profile';
import comment from './comment/comments';
import errors from './errors/errors';
import ratingReducer from './rateArticle';

// @create root reducer

const rootReducer = combineReducers({
  socialAuth,
  alert,
  forgotPassword,
  resetPassword,
  login: loginReducer,
  articles: getAllArticle,
  profile,
  comment,
  errors,
  rating: ratingReducer
});

export default rootReducer;
