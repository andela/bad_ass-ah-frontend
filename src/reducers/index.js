// @here we will combine all reducers file
import { combineReducers } from 'redux';
import getAllArticle from './article';

// @create root reducer

const rootReducer = combineReducers({
  articles: getAllArticle
});

export default rootReducer;
