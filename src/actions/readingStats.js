import axios from 'axios';
import Hashid from 'hashids';
import * as actionTypes from './types';
import { checkToken } from '../utils/checkToken';

const hashId = new Hashid('', 10);

export const getReadingStatsSuccess = readingStats => ({
  type: actionTypes.GET_READING_STATS_SUCCESS,
  readingStats
});

export const getReadingStatsFail = error => ({
  type: actionTypes.GET_READING_STATS_FAIL,
  error
});

export const setReadingStatsFail = error => ({
  type: actionTypes.SET_READING_STATS_FAIL,
  error
});

export const getReadingStats = () => (dispatch) => {
  checkToken();
  return axios.get('/api/users/reading-stats')
    .then((response) => {
      dispatch(getReadingStatsSuccess(response.data.totalReading));
    })
    .catch(() => {
      dispatch(getReadingStatsFail('Retrieving failed.'));
    });
};

export const setReadingStats = articleId => (dispatch) => {
  checkToken();
  return axios.post(`/api/articles/${hashId.decode(articleId)}/record-reading`)
    .then(() => {
      dispatch(setReadingStatsFail(null));
    })
    .catch(() => {
      dispatch(setReadingStatsFail('Set reading stats fails'));
    });
};
