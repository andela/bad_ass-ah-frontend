import reducer from '../../reducers/rateArticle';
import * as actionTypes from '../../actions/types';

describe('Rate Article reducer', () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      rating: null,
      error: null,
      isRating: false,
      averageRating: null,
      totalRatings: null
    };
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should start rating', () => {
    expect(reducer(initialState, {
      type: actionTypes.RATE_START,
      isRating: true,
    })).toEqual({
      ...initialState,
      isRating: true,
      error: null
    });
  });

  it('should rate an article successfully', () => {
    expect(reducer(initialState, {
      type: actionTypes.RATE_SUCCESS,
      rating: 7,
    })).toEqual({
      ...initialState,
      rating: 7,
      isRating: false,
      error: null
    });
  });

  it('should change state for failing to rate', () => {
    expect(reducer(initialState, {
      type: actionTypes.RATE_FAIL,
      error: 'error',
    })).toEqual({
      ...initialState,
      error: 'error',
      isRating: false,
      rating: null
    });
  });

  it('should change state for getting user rating', () => {
    expect(reducer(initialState, {
      type: actionTypes.GET_USER_RATING,
      rating: 9,
    })).toEqual({
      ...initialState,
      rating: 9,
      error: null
    });
  });

  it('should change state for getting average rating', () => {
    expect(reducer(initialState, {
      type: actionTypes.GET_AVERAGE_RATING,
      averageRating: 5,
      totalRatings: 10
    })).toEqual({
      ...initialState,
      averageRating: 5,
      totalRatings: 10
    });
  });
});
