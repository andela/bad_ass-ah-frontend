import * as actionTypes from '../actions/types';
import { updateObject } from './helpers/utility';

const initialState = {
  errorSetReadingStats: null,
  errorGetReadingStats: null,
  readingStats: null
};

const getReadingStatsSuccess = (state, action) => updateObject(state, {
  readingStats: action.readingStats,
  errorGetReadingStats: null
});

const getReadingStatsFail = (state, action) => updateObject(state, {
  errorGetReadingStats: action.error,
  readingStats: null
});

const setReadingStatsFail = (state, action) => updateObject(state, {
  errorSetReadingStats: action.error
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_READING_STATS_SUCCESS: return getReadingStatsSuccess(state, action);
    case actionTypes.GET_READING_STATS_FAIL: return getReadingStatsFail(state, action);
    case actionTypes.SET_READING_STATS_FAIL: return setReadingStatsFail(state, action);
    default: return state;
  }
};

export default reducer;
