import { SEARCH_ITEM } from '../actions/types';

const initialState = {
  search: null
};

const Search = (state = initialState, { type, payload }) => {
  switch (type) {
    case SEARCH_ITEM:
      return {
        ...state,
        search: payload
      };
    default:
      return state;
  }
};

export default Search;
