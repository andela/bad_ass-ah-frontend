import * as actionTypes from '../actions/types';
import { updateObject } from './helpers/utility';

const initialState = {
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

const getReportTypesStart = (state, action) => updateObject(state, {
  isFetchingTypes: action.isFetchingTypes,
  errorGettingTypes: null
});

const getReportTypesSuccess = (state, action) => updateObject(state, {
  reportTypes: action.data,
  isFetchingTypes: false,
  errorGettingTypes: null
});

const getReportTypesFail = (state, action) => updateObject(state, {
  errorGettingTypes: action.error,
  reportTypes: null,
  isFetchingTypes: false
});

const reportArticleSuccess = (state, action) => updateObject(state, {
  reportSuccessMessage: action.message,
  errorReporting: null,
  isReporting: false
});

const reportArticleStart = (state, action) => updateObject(state, {
  isReporting: action.isReporting,
  reportSuccessMessage: null,
  errorReporting: null
});

const reportArticleFail = (state, action) => updateObject(state, {
  errorReporting: action.error,
  reportSuccessMessage: null,
  isReporting: false,
});

const setReportTypeSuccess = (state, action) => updateObject(state, {
  setTypeSuccessMessage: action.message,
  errorSettingType: null,
  isSetting: false
});

const setReportTypeFail = (state, action) => updateObject(state, {
  errorSettingType: action.error,
  setTypeSuccessMessage: null,
  isSetting: false
});

const setReportTypeStart = (state, action) => updateObject(state, {
  isSetting: action.isSetting,
  errorSettingType: null,
  setTypeSuccessMessage: null,
});

const getReportedArticlesStart = (state, action) => updateObject(state, {
  isGettingReportedArticle: action.isGettingReportedArticle,
  reportedArticles: null,
  errorGettingReportedArticles: null
});

const getReportedArticlesSuccess = (state, action) => updateObject(state, {
  isGettingReportedArticle: false,
  reportedArticles: action.reportedArticles,
  errorGettingReportedArticles: null
});

const getReportedArticlesFail = (state, action) => updateObject(state, {
  isGettingReportedArticle: false,
  reportedArticles: null,
  errorGettingReportedArticles: action.error
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_REPORT_TYPES_START: return getReportTypesStart(state, action);
    case actionTypes.GET_REPORT_TYPES_SUCCESS: return getReportTypesSuccess(state, action);
    case actionTypes.GET_REPORT_TYPES_FAIL: return getReportTypesFail(state, action);
    case actionTypes.REPORT_ARTICLE_START: return reportArticleStart(state, action);
    case actionTypes.REPORT_ARTICLE_SUCCESS: return reportArticleSuccess(state, action);
    case actionTypes.REPORT_ARTICLE_FAIL: return reportArticleFail(state, action);
    case actionTypes.SET_REPORT_TYPE_START: return setReportTypeStart(state, action);
    case actionTypes.SET_REPORT_TYPE_SUCCESS: return setReportTypeSuccess(state, action);
    case actionTypes.SET_REPORT_TYPE_FAIL: return setReportTypeFail(state, action);
    case actionTypes.GET_REPORTED_ARTICLES_START: return getReportedArticlesStart(state, action);
    case actionTypes.GET_REPORTED_ARTICLES_SUCCESS:
      return getReportedArticlesSuccess(state, action);
    case actionTypes.GET_REPORTED_ARTICLES_FAIL: return getReportedArticlesFail(state, action);
    default: return state;
  }
};

export default reducer;
