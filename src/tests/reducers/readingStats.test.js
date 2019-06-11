import * as actionTypes from '../../actions/types';
import reducer from '../../reducers/readingStats';

describe('Reading Stats reducer', () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      errorSetReadingStats: null,
      errorGetReadingStats: null,
      readingStats: null
    };
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should fail to return reading stats', () => {
    expect(reducer(initialState, {
      type: actionTypes.GET_READING_STATS_FAIL,
      errorGetReadingStats: undefined,
      readingStats: null
    }))
      .toEqual({
        ...initialState,
        errorGetReadingStats: undefined,
        readingStats: null
      });
  });

  it('should fail to set reading stats', () => {
    expect(reducer(initialState, {
      type: actionTypes.SET_READING_STATS_FAIL,
      errorSetReadingStats: undefined
    }))
      .toEqual({
        ...initialState,
        errorSetReadingStats: undefined
      });
  });

  it('should return reading stats', () => {
    expect(reducer(initialState, {
      type: actionTypes.GET_READING_STATS_SUCCESS,
      readingStats: 2,
      errorGetReadingStats: null
    }))
      .toEqual({
        ...initialState,
        readingStats: 2,
        errorGetReadingStats: null
      });
  });
});
