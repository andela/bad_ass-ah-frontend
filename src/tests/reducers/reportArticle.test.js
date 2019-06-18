import reducer from '../../reducers/reportArticle';
import * as actionTypes from '../../actions/types';

describe('Report Article reducer', () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      isReporting: false,
      isSetting: false,
      errorReporting: null,
      reportTypes: null,
      isFetchingTypes: false,
      errorGettingTypes: null,
      reportSuccessMessage: null,
      setTypeSuccessMessage: null,
      errorSettingType: null,
      isGettingReportedArticle: false,
      reportedArticles: null,
      errorGettingReportedArticles: null
    };
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should start getting report types', () => {
    expect(reducer(initialState, {
      type: actionTypes.GET_REPORT_TYPES_START,
      isFetchingTypes: true,
      errorGettingTypes: null
    })).toEqual({
      ...initialState,
      isFetchingTypes: true,
      errorGettingTypes: null
    });
  });

  it('should get report types', () => {
    expect(reducer(initialState, {
      type: actionTypes.GET_REPORT_TYPES_SUCCESS,
      reportTypes: undefined,
      isFetchingTypes: false,
      errorGettingTypes: null
    })).toEqual({
      ...initialState,
      reportTypes: undefined,
      isFetchingTypes: false,
      errorGettingTypes: null
    });
  });

  it('should fait to get report types', () => {
    expect(reducer(initialState, {
      type: actionTypes.GET_REPORT_TYPES_FAIL,
      reportTypes: null,
      isFetchingTypes: false,
      errorGettingTypes: undefined
    })).toEqual({
      ...initialState,
      reportTypes: null,
      isFetchingTypes: false,
      errorGettingTypes: undefined
    });
  });

  it('should start reporting article', () => {
    expect(reducer(initialState, {
      type: actionTypes.REPORT_ARTICLE_START,
      isReporting: true,
      reportSuccessMessage: null,
      errorReporting: null
    })).toEqual({
      ...initialState,
      isReporting: true,
      reportSuccessMessage: null,
      errorReporting: null
    });
  });

  it('should report an article', () => {
    expect(reducer(initialState, {
      type: actionTypes.REPORT_ARTICLE_SUCCESS,
      isReporting: false,
      reportSuccessMessage: undefined,
      errorReporting: null
    })).toEqual({
      ...initialState,
      isReporting: false,
      reportSuccessMessage: undefined,
      errorReporting: null
    });
  });

  it('should fait to report an article', () => {
    expect(reducer(initialState, {
      type: actionTypes.REPORT_ARTICLE_FAIL,
      errorReporting: undefined,
      reportSuccessMessage: null,
      isReporting: false
    })).toEqual({
      ...initialState,
      errorReporting: undefined,
      reportSuccessMessage: null,
      isReporting: false
    });
  });

  it('should start to set report type', () => {
    expect(reducer(initialState, {
      type: actionTypes.SET_REPORT_TYPE_START,
      setTypeSuccessMessage: null,
      errorSettingType: null,
      isSetting: true
    })).toEqual({
      ...initialState,
      setTypeSuccessMessage: null,
      errorSettingType: null,
      isSetting: true
    });
  });

  it('should set a report type', () => {
    expect(reducer(initialState, {
      type: actionTypes.SET_REPORT_TYPE_SUCCESS,
      setTypeSuccessMessage: undefined,
      errorSettingType: null,
      isSetting: false
    })).toEqual({
      ...initialState,
      setTypeSuccessMessage: undefined,
      errorSettingType: null,
      isSetting: false
    });
  });

  it('should fail to set a report type', () => {
    expect(reducer(initialState, {
      type: actionTypes.SET_REPORT_TYPE_FAIL,
      setTypeSuccessMessage: null,
      errorSettingType: undefined,
      isSetting: false
    })).toEqual({
      ...initialState,
      setTypeSuccessMessage: null,
      errorSettingType: undefined,
      isSetting: false
    });
  });

  it('should start to get reported articles', () => {
    expect(reducer(initialState, {
      type: actionTypes.GET_REPORTED_ARTICLES_START,
      isGettingReportedArticle: true,
      reportedArticles: null,
      errorGettingReportedArticles: null
    })).toEqual({
      ...initialState,
      isGettingReportedArticle: true,
      reportedArticles: null,
      errorGettingReportedArticles: null
    });
  });

  it('should get reported articles', () => {
    expect(reducer(initialState, {
      type: actionTypes.GET_REPORTED_ARTICLES_SUCCESS,
      isGettingReportedArticle: false,
      reportedArticles: undefined,
      errorGettingReportedArticles: null
    })).toEqual({
      ...initialState,
      isGettingReportedArticle: false,
      reportedArticles: undefined,
      errorGettingReportedArticles: null
    });
  });

  it('should fail to get reported articles', () => {
    expect(reducer(initialState, {
      type: actionTypes.GET_REPORTED_ARTICLES_FAIL,
      isGettingReportedArticle: false,
      reportedArticles: null,
      errorGettingReportedArticles: undefined
    })).toEqual({
      ...initialState,
      isGettingReportedArticle: false,
      reportedArticles: null,
      errorGettingReportedArticles: undefined
    });
  });
});
