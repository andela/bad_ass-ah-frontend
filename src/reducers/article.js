// @call type going to be used..
import {
  GET_ALL_ARTICLE, CREATE_ARTICLE, ARTICLE_ERROR, LOADING, ADD_TAG, REMOVE_TAG
} from '../actions/type';

const initialState = {
  articles: null,
  newArticle: null,
  loading: true,
  error: {},
  newTag: []
};

const getAllArticle = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_ARTICLE:
      return {
        ...state,
        articles: payload
      };
    case CREATE_ARTICLE:
      return {
        ...state,
        newArticle: payload,
        loading: false
      };
    case ARTICLE_ERROR:
      return {
        ...state,
        error: payload === 'Unauthorized' ? { unauthorized: 'Unauthorized' } : payload
      };
    case LOADING:
      return {
        ...state,
        loading: false
      };
    case ADD_TAG:
      return {
        ...state,
        newTag: [...state.newTag, payload]
      };
    case REMOVE_TAG:
      return {
        ...state,
        newTag: [...state.newTag.filter(tag => tag !== payload)]
      };
    default:
      return state;
  }
};

export {
  getAllArticle as default
};
