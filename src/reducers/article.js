// @call type going to be used..
import { GET_ALL_ARTICLE } from '../actions/types';

const initialState = [];

const getAllArticle = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_ARTICLE:
      return {
        ...state,
        articles: payload
      };
    default:
      return state;
  }
};

export {
  getAllArticle as default
};
