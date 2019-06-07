import * as actionTypes from '../actions/types';
import { updateObject } from './helpers/utility';

const initialState = {
  rating: null,
  error: null,
  isRating: false,
  averageRating: null,
  totalRatings: null
};

const rateStart = (state, action) => updateObject(state, {
  isRating: action.isRating,
  error: null
});

const rateSuccess = (state, action) => updateObject(state, {
  rating: action.rating,
  isRating: false,
  error: null
});

const rateFail = (state, action) => updateObject(state, {
  error: action.error,
  isRating: false,
  rating: null
});

const getUserRating = (state, action) => updateObject(state, {
  rating: action.rating,
  error: null
});

const getAverageRating = (state, action) => updateObject(state, {
  averageRating: action.averageRating,
  totalRatings: action.totalRatings
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RATE_START: return rateStart(state, action);
    case actionTypes.RATE_SUCCESS: return rateSuccess(state, action);
    case actionTypes.RATE_FAIL: return rateFail(state, action);
    case actionTypes.GET_USER_RATING: return getUserRating(state, action);
    case actionTypes.GET_AVERAGE_RATING: return getAverageRating(state, action);
    default: return state;
  }
};

export default reducer;
