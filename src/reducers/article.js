// @call type going to be used..
import {
  GET_ALL_ARTICLE, CREATE_ARTICLE, LOADING, ADD_TAG, REMOVE_TAG,
  GET_SINGLE_ARTICLE, ARTICLE_FAILURE,
  VOTE_ARTICLES, UPDATE_ARTICLE, DELETE_ARTICLE, BOOKMARK_ARTICLE_SUCCESS
} from '../actions/types';

const initialState = {
  allArticles: [],
  newArticle: null,
  loading: true,
  error: {},
  newTag: [],
  article: null,
  likes: null,
  dislikes: null,
  hasLiked: false,
  hasDisLiked: false,
  voteMessage: null,
  message: ''
};

const getAllArticle = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_ARTICLE:
      return {
        ...state,
        allArticles: [...state.allArticles, payload]
      };
    case CREATE_ARTICLE:
      return {
        ...state,
        newArticle: payload,
        loading: false
      };
    case ARTICLE_FAILURE:
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
    case GET_SINGLE_ARTICLE:
      return {
        ...state,
        article: payload
      };
    case VOTE_ARTICLES:
      return {
        ...state,
        voteMessage: payload.message
      };
    case UPDATE_ARTICLE:
      return {
        ...state,
        message: payload.message
      };
    case DELETE_ARTICLE:
      return {
        ...state,
        message: payload
      };
    case BOOKMARK_ARTICLE_SUCCESS:
      return {
        ...state,
        payload: payload.bookmark
      };

    default:
      return state;
  }
};

export {
  getAllArticle as default
};
