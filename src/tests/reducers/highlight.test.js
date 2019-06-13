import {
  HIGHLIGHT_TEXT_SUCCESS,
  HIGHLIGHT_TEXT_FAIL,
  GET_USER_HIGHLIGHTS_SUCCESS,
  GET_USER_HIGHLIGHTS_FAIL
} from '../../actions/types';
import highlight from '../../reducers/highlight';

describe('Highlight reducer', () => {
  it('should return default state', () => {
    const newSate = highlight([], {});
    expect(newSate).toEqual([]);
  });

  it('should return new state if action type is HIGHLIGHT_TEXT_SUCCESS', () => {
    const payload = {
      message: 'Success',
      highlightedText: {},
      errors: {},
      highlights: []
    };
    const newSate = highlight([], {
      type: HIGHLIGHT_TEXT_SUCCESS,
      payload
    });
    expect(newSate).toEqual(payload);
  });

  it('should return new state if action type is HIGHLIGHT_TEXT_FAIL', () => {
    const payload = {
      message: '',
      highlightedText: {},
      errors: {},
      highlights: []
    };
    const newSate = highlight([], {
      type: HIGHLIGHT_TEXT_FAIL,
      payload
    });
    expect(newSate).toEqual(payload);
  });

  it('should return new state if action type is GET_USER_HIGHLIGHTS_SUCCESS', () => {
    const payload = {
      message: '',
      highlightedText: {},
      errors: {},
      highlights: []
    };
    const newSate = highlight([], {
      type: GET_USER_HIGHLIGHTS_SUCCESS,
      payload: payload.highlights
    });
    expect(newSate).toEqual(payload);
  });

  it('should return new state if action type is GET_USER_HIGHLIGHTS_FAIL', () => {
    const payload = {
      message: '',
      highlightedText: {},
      errors: {},
      highlights: []
    };
    const newSate = highlight([], {
      type: GET_USER_HIGHLIGHTS_FAIL,
      payload: payload.errors
    });
    expect(newSate).toEqual(payload);
  });
});
