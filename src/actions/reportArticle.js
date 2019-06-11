import axios from 'axios';
import Hashid from 'hashids';
import * as actionTypes from './types';
import { checkToken } from '../utils/checkToken';

const hashId = new Hashid('', 10);

export const reportArticleFail = error => ({
  type: actionTypes.REPORT_ARTICLE_FAIL,
  error
});

export const reportArticleSuccess = message => ({
  type: actionTypes.REPORT_ARTICLE_SUCCESS,
  message
});

export const reportArticleStart = () => ({
  type: actionTypes.REPORT_ARTICLE_START,
  isReporting: true
});

export const getReportTypesSuccess = data => ({
  type: actionTypes.GET_REPORT_TYPES_SUCCESS,
  data
});

export const getReportTypesFail = error => ({
  type: actionTypes.GET_REPORT_TYPES_FAIL,
  error
});

export const getReportTypesStart = () => ({
  type: actionTypes.GET_REPORT_TYPES_START,
  isFetchingTypes: true
});

export const setReportTypeSuccess = message => ({
  type: actionTypes.SET_REPORT_TYPE_SUCCESS,
  message
});

export const setReportTypeFail = error => ({
  type: actionTypes.SET_REPORT_TYPE_FAIL,
  error
});

export const setReportTypeStart = () => ({
  type: actionTypes.SET_REPORT_TYPE_START,
  isSetting: true
});

export const getReportedArticlesStart = () => ({
  type: actionTypes.GET_REPORTED_ARTICLES_START,
  isGettingReportedArticle: true
});

export const getReportedArticlesSuccess = data => ({
  type: actionTypes.GET_REPORTED_ARTICLES_SUCCESS,
  reportedArticles: data
});

export const getReportedArticlesFail = error => ({
  type: actionTypes.GET_REPORTED_ARTICLES_FAIL,
  error
});

export const getReportedArticles = () => (dispatch) => {
  dispatch(getReportedArticlesStart());
  checkToken();
  return axios.get('/api/report/articles')
    .then((response) => {
      dispatch(getReportedArticlesSuccess(response.data));
    })
    // eslint-disable-next-line consistent-return
    .catch((error) => {
      if (error.response.status === 403) {
        return dispatch(getReportedArticlesFail(error.response.data.message));
      }
      if (error.response) {
        return dispatch(getReportedArticlesFail(error.response.data.errors.body[0]));
      }
    });
};

export const reportArticle = (articleId, reportTypeId, comment) => (dispatch) => {
  dispatch(reportArticleStart());
  const data = {
    comment
  };
  checkToken();
  return axios.post(`/api/articles/${hashId.decode(articleId)}/report/type/${reportTypeId}`, data)
    .then((response) => {
      dispatch(reportArticleSuccess(response.data.message));
    })
    .catch(() => {
      dispatch(reportArticleFail('Reporting Fails. Try again later!'));
    });
};

export const getReportTypes = () => (dispatch) => {
  dispatch(getReportTypesStart());
  return axios.get('/api/report/types')
    .then((response) => {
      dispatch(getReportTypesSuccess(response.data));
    })
    .catch(() => {
      dispatch(getReportTypesFail('Retrieving report types Fails'));
    });
};

export const setReportType = type => (dispatch) => {
  dispatch(setReportTypeStart());
  const data = {
    type
  };
  checkToken();
  return axios.post('/api/report/types/', data)
    .then((response) => {
      dispatch(setReportTypeSuccess(response.data.message));
    })
    // eslint-disable-next-line consistent-return
    .catch((error) => {
      if (error.response.status === 403) {
        return dispatch(setReportTypeFail(error.response.data.message));
      }
      if (error.response) {
        return dispatch(setReportTypeFail(error.response.data.errors.body[0]));
      }
    });
};
