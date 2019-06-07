import Hashid from 'hashids';
import axios from 'axios';
import * as actionTypes from './types';
import { checkToken } from '../utils/checkToken';

const hashId = new Hashid('', 10);

export const rateFail = error => ({
  type: actionTypes.RATE_FAIL,
  error
});

export const rateSuccess = rating => ({
  type: actionTypes.RATE_SUCCESS,
  rating
});

export const getAverageRating = (averageRating, totalRatings) => ({
  type: actionTypes.GET_AVERAGE_RATING,
  averageRating,
  totalRatings
});

export const getUserRating = rating => ({
  type: actionTypes.GET_USER_RATING,
  rating
});

export const rateStart = () => ({
  type: actionTypes.RATE_START,
  isRating: true
});

export const rate = (articleId, rating) => (dispatch) => {
  dispatch(rateStart());
  const data = {
    rating
  };
  checkToken();
  return axios.post(`/api/articles/${hashId.decode(articleId)}/rate`, data)
    .then((response) => {
      dispatch(rateSuccess(response.data.ratings.rating));
    })
    .catch((error) => {
      if (error.response) {
        dispatch(rateFail(error.response.data.errors.body[0]));
      }
    });
};

export const getArticleAverageRating = articleId => (dispatch) => {
  checkToken();
  return axios.get(`/api/articles/${hashId.decode(articleId)}/average-rating`)
    .then((response) => {
      dispatch(getAverageRating(response.data.rating.average, response.data.rating.rates));
    })
    .catch((error) => {
      if (error.response.status === 404) {
        dispatch(getAverageRating(null, null));
      }
    });
};

export const getUserArticleRating = articleId => (dispatch) => {
  checkToken();
  return axios.get(`/api/articles/${hashId.decode(articleId)}/user-article-rating`)
    .then((response) => {
      dispatch(getUserRating(response.data.rating.rating));
    })
    .catch((error) => {
      if (error.response.status === 404) {
        dispatch(dispatch(getUserRating(null)));
      }
    });
};
