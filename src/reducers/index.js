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
import editedComments from './comment/editedComments';
import errors from './errors/errors';
import ratingReducer from './rateArticle';
import readingStatsReducer from './readingStats';
import highlight from './highlight';
import registration from './registration';
import activate from './activate';
import notification from './notification';
import reportArticleReducer from './reportArticle';
import subscribtion from './subscribtion';
import getBookmarks from './fetchBookmark';
import search from './search';
import follow from './users/followUser';

// @create root reducer

const rootReducer = combineReducers({
  socialAuth,
  alert,
  forgotPassword,
  resetPassword,
  login: loginReducer,
  register: registration,
  articles: getAllArticle,
  profile,
  comment,
  editedComments,
  errors,
  rating: ratingReducer,
  readingStats: readingStatsReducer,
  highlight,
  activate,
  notification,
  reportArticle: reportArticleReducer,
  subscribtion,
  getBookmarks,
  search,
  follow
});

export default rootReducer;
